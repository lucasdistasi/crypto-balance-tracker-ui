import React, {Fragment, useEffect, useState} from "react";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {HEADERS} from "../../model/Headers";
import {HEADERS_VALUE} from "../../model/HeadersValue";
import {Chart} from "react-google-charts";
import {PlatformCryptosDistributionResponse} from "../../response/PlatformCryptosDistributionResponse";
import {DASHBOARDS_PLATFORMS_CRYPTOS_DISTRIBUTION_ENDPOINT} from "../../constants/Constants";

const PlatformsCryptosDistributionChart = () => {

  const [loading, setLoading] = useState(true);
  const [cryptoPlatformBalanceResponse, setCryptoPlatformBalanceResponses] = useState<PlatformCryptosDistributionResponse[]>([]);

  useEffect(() => {
    fetch(DASHBOARDS_PLATFORMS_CRYPTOS_DISTRIBUTION_ENDPOINT, {
      method: HTTP_METHOD.GET,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON
      }
    }).then(response => {
      if (response.status === 200) {
        response.json()
          .then(apiResponse => {
            setCryptoPlatformBalanceResponses(apiResponse);
            setLoading(false);
          });
      }
    })
  }, []);

  return (
    <Fragment>
      {
        !loading &&

        <Fragment>
          <h1 className="text-4xl">
            Platform Distribution
          </h1>
          {
            cryptoPlatformBalanceResponse.map(platformCryptos => {
              return (
                <Chart
                  key={platformCryptos.platform}
                  chartType="PieChart"
                  data={[
                    ["Cryptos", "Balances"],
                    ...platformCryptos?.coins?.map(coin => [coin.coin_info.name, coin.balance])
                  ]}
                  options={{
                    title: `${platformCryptos.platform}`,
                    titleTextStyle: {fontSize: 32, textAlign: "center"},
                  }}
                  width={"100%"}
                  height={"650px"}
                />
              );
            })
          }
        </Fragment>
      }
    </Fragment>
  );
}

export default PlatformsCryptosDistributionChart