import React, {Fragment} from "react";
import {Chart} from "react-google-charts";
import {useCryptosPlatformsBalances} from "../../../hooks/useCryptosPlatformsBalances";
import ErrorAlert from "../../page/ErrorAlert";
import ChartSkeleton from "../../skeletons/ChartSkeleton";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptosBalancesChart = () => {

  const {response, error, loading} = useCryptosPlatformsBalances();
  const {crypto_info_response} = response;

  const getCryptosDistribution = () => {
    const cryptos = crypto_info_response.slice(0, 12)
      .map(crypto => [crypto.name, Number(crypto.balance)]);
    const othersTotalValue = crypto_info_response.slice(12)
      .reduce((total, crypto) => total + Number(crypto.balance), 0);
    cryptos.push(["Others", othersTotalValue]);

    return [
      ["Cryptos", "Balances"],
      ...cryptos
    ];
  }

  return (
    <Fragment>
      {
        !error && !loading && crypto_info_response?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl text-center">
            All Cryptos Distribution
          </h1>

          <Chart
            chartType="PieChart"
            data={getCryptosDistribution()}
            options={options}
            width={"100%"}
            height={"650px"}
          />
        </Fragment>
      }

      {
        loading && !error &&
        <ChartSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }
    </Fragment>
  );
}

export default CryptosBalancesChart