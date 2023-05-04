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
  const {coinInfoResponse} = response;

  return (
    <Fragment>
      <h1 className="text-4xl text-center">
        All Cryptos Distribution
      </h1>

      {
        loading && !error &&
        <ChartSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }

      {
        !error && !loading && coinInfoResponse?.length > 0 &&
        <Fragment>
          <Chart
            chartType="PieChart"
            data={[
              ["Cryptos", "Balances"],
              ...coinInfoResponse?.map(crypto => [crypto.name, crypto.balance || 0])
            ]}
            options={options}
            width={"100%"}
            height={"650px"}
          />
        </Fragment>
      }
    </Fragment>
  );
}

export default CryptosBalancesChart