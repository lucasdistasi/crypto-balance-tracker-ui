import React, {useEffect, useState} from "react";
import {DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT} from "../../constants/Constants";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {Chart} from "react-google-charts";
import {CryptosBalancesPlatformsResponse} from "../../response/CryptosBalancesPlatformsResponse";

const options = {
  title: `Cryptos Balances`,
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptosBalancesChart = () => {

  const [response, setResponse] = useState<CryptosBalancesPlatformsResponse>({
    coinInfoResponse: [{
      name: "",
      quantity: 0n,
      balance: 0n,
      percentage: 0,
      platforms: [],
    }]
  });

  useEffect(() => {
    fetch(DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT, {
      method: HTTP_METHOD.GET
    }).then(response => {
      if (response.ok) {
        const apiResponse = response.json();
        apiResponse.then(responseBody => {
          setResponse(responseBody);
        });
      }
    });
  }, []);

  const {coinInfoResponse} = response;
  const data = [
    ["Cryptos", "Balances"],
    ...coinInfoResponse?.map(crypto => [crypto.name, crypto.balance])
  ];

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"650px"}
    />
  );
}

export default CryptosBalancesChart