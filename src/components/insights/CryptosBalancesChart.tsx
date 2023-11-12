import React, {Fragment, useEffect, useState} from "react";
import Chart from 'react-google-charts'
import ErrorAlert from "../page/ErrorAlert";
import ChartSkeleton from "../skeletons/ChartSkeleton";
import {CryptosBalancesInsightsResponse} from "../../model/response/insight/CryptosBalancesInsightsResponse";
import {retrieveCryptosBalancesInsights} from "../../services/insightsService";
import {Link} from "react-router-dom";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptosBalancesChart = () => {

  const [cryptosBalances, setCryptosBalances] = useState<CryptosBalancesInsightsResponse>({
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    cryptos: []
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await retrieveCryptosBalancesInsights();
          setCryptosBalances(response);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )()
  }, []);

  const getCryptosDistribution = () => {
    const cryptos = cryptosBalances.cryptos?.map(crypto => [crypto.cryptoName, Number(crypto.balances.totalUSDBalance)]);

    return [["Cryptos", "USD Balance"], ...cryptos];
  }

  return (
    <Fragment>
      {
        (cryptosBalances.cryptos === undefined || cryptosBalances.cryptos?.length === 0) &&
        <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-9/12"
             role="alert">
          <p className="font-bold">No Cryptos found</p>
          <p className="text-sm">
            Looks like you've no cryptos added. Go to <Link to="/crypto"><span className="font-bold italic">this link</span></Link> to
            add a crypto and start viewing insights.
          </p>
        </div>
      }

      {
        !error && !loading && cryptosBalances.cryptos?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl text-center mt-10">
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