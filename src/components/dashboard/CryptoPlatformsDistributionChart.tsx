import React, {Fragment, useEffect, useState} from "react";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {HEADERS} from "../../model/Headers";
import {HEADERS_VALUE} from "../../model/HeadersValue";
import {CryptoPlatformsDistributionResponse} from "../../response/CryptoPlatformsDistributionResponse";
import {Chart} from "react-google-charts";
import {DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT} from "../../constants/Constants";

const CryptoPlatformsDistributionChart = () => {

  const [response, setResponse] = useState<CryptoPlatformsDistributionResponse[]>([]);

  useEffect(() => {
    fetch(DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT, {
      method: HTTP_METHOD.GET,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON,
      },
    }).then(response => {
      if (response.status == 200) {
        response.json()
          .then(apiResponse => {
            setResponse(apiResponse);
          });
      }
    });
  }, []);

  return (
    <Fragment>
      <h1 className="text-4xl">
        Crypto Distribution
      </h1>
      {
        response?.map(crypto => {
          return (
            <Chart
              key={crypto.crypto}
              chartType="PieChart"
              data={[
                ["Cryptos", "Balances"],
                ...crypto?.coins?.map(coin => [coin.platform, coin.balance])
              ]}
              options={{
                title: `${crypto.crypto.toUpperCase()}`,
                titleTextStyle: {fontSize: 32, textAlign: "center"},
              }}
              width={"100%"}
              height={"650px"}
            />
          );
        })
      }
    </Fragment>
  );
}

export default CryptoPlatformsDistributionChart