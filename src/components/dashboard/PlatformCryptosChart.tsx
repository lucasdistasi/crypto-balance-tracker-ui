import {usePlatforms} from "../../hooks/usePlatforms";
import React, {Fragment, useEffect, useState} from "react";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {HEADERS} from "../../model/Headers";
import {HEADERS_VALUE} from "../../model/HeadersValue";
import {Chart} from "react-google-charts";
import {PlatformCryptos} from "../../model/PlatformCryptos";

const PlatformCryptosChart = () => {

  const {platforms} = usePlatforms();
  const platformsNames = platforms.map(platform => platform.name);
  const [loading, setLoading] = useState(true);
  const [platformCryptoResponse, setPlatformCryptoResponse] = useState<PlatformCryptos[]>([]);

  useEffect(() => {
    const tempResponse: PlatformCryptos[] = [];

    const fetchInfo = async (platform: string) => {
      // TODO - from backend this could be only one endpoint
      const response = await fetch(`http://localhost:8080/api/v1/dashboards/platform/${platform}/coins`, {
        method: HTTP_METHOD.GET,
        headers: {
          [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON
        }
      });

      if (response.status === 200) {
        const apiResponse = await response.json();
        const platformCrypto: PlatformCryptos = {
          platform,
          platformCryptosResponse: apiResponse,
        };

        tempResponse.push(platformCrypto);
      }
    }

    Promise.all(platformsNames.map(fetchInfo))
      .then(() => {
        setPlatformCryptoResponse(tempResponse)
        setLoading(false);
      });
  }, [platforms]);

  return (
    <Fragment>
      {
        !loading &&

        <Fragment>
          <h1 className="text-4xl">
            Platform Distribution
          </h1>
          {
            platformCryptoResponse.map(platformCryptos => {
              if (platformCryptos.platform) {
                return (
                  <Chart
                    key={platformCryptos.platform}
                    chartType="PieChart"
                    data={[
                      ["Cryptos", "Balances"],
                      ...platformCryptos?.platformCryptosResponse?.coins?.map(coin => [coin.coin_info.name, coin.balance])
                    ]}
                    options={{
                      title: `${platformCryptos.platform}`,
                      titleTextStyle: {fontSize: 32, textAlign: "center"},
                    }}
                    width={"100%"}
                    height={"650px"}
                  />
                );
              }
            })
          }
        </Fragment>
      }
    </Fragment>
  );
}

export default PlatformCryptosChart