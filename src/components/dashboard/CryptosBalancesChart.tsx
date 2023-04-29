import React, {Fragment} from "react";
import {Chart} from "react-google-charts";
import {useCryptosPlatformsBalances} from "../../hooks/useCryptosPlatformsBalances";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptosBalancesChart = () => {

  const {response} = useCryptosPlatformsBalances();
  const {coinInfoResponse} = response;
  const data = [
    ["Cryptos", "Balances"],
    ...coinInfoResponse?.map(crypto => [crypto.name, crypto.balance || 0])
  ];

  return (
    <Fragment>
      <h1 className="text-4xl">
        All Cryptos Distribution
      </h1>

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"650px"}
      />
    </Fragment>
  );
}

export default CryptosBalancesChart