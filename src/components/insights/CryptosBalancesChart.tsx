import React, {Fragment, useEffect, useState} from "react";
import Chart from 'react-google-charts'
import ErrorAlert from "../page/ErrorAlert";
import {CryptosBalancesInsightsResponse} from "../../model/response/insight/CryptosBalancesInsightsResponse";
import {retrieveCryptosBalancesInsights} from "../../services/insightsService";
import {Link} from "react-router-dom";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";
import NoCryptosFoundAlert from "../crypto/NoCryptosFoundAlert";

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
  const [isLoadingCryptosBalancesInsights, setIsLoadingCryptosBalancesInsights] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrieveCryptosBalancesInsights();
          setCryptosBalances(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingCryptosBalancesInsights(false);
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
        !isLoadingCryptosBalancesInsights && (cryptosBalances.cryptos === undefined || cryptosBalances.cryptos?.length === 0) &&
        <NoCryptosFoundAlert/>
      }

      {
        !error && !isLoadingCryptosBalancesInsights && cryptosBalances.cryptos?.length > 0 &&
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
        isLoadingCryptosBalancesInsights && !error &&
        <RadialChartSkeleton/>
      }

      {
        error && !isLoadingCryptosBalancesInsights &&
        <ErrorAlert/>
      }
    </Fragment>
  );
}

export default CryptosBalancesChart