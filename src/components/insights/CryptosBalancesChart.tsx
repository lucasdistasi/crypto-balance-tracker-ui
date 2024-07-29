import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {CryptosBalancesInsightsResponse} from "../../model/response/insight/CryptosBalancesInsightsResponse";
import {retrieveCryptosBalancesInsights} from "../../services/insightsService";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";
import NoCryptosFoundAlert from "../crypto/NoCryptosFoundAlert";
import BalancesPieChart from "./BalancesPieChart";

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
          const response: CryptosBalancesInsightsResponse = await retrieveCryptosBalancesInsights();
          setCryptosBalances(response);
        } catch (error: unknown) {
          setError(true);
        } finally {
          setIsLoadingCryptosBalancesInsights(false);
        }
      }
    )()
  }, []);

  return (
    <Fragment>
      {
        !isLoadingCryptosBalancesInsights && (cryptosBalances.cryptos?.length === 0) &&
        <NoCryptosFoundAlert/>
      }

      {
        !error && !isLoadingCryptosBalancesInsights && cryptosBalances.cryptos?.length > 0 &&
        <BalancesPieChart chartId="cryptos-distribution-pie-chart"
                          chartTitle="Cryptos Distribution"
                          series={cryptosBalances.cryptos.map(crypto => Number(crypto.balances.totalUSDBalance))}
                          labels={cryptosBalances.cryptos.map(crypto => `${crypto.cryptoName} (${crypto.percentage}%)`)}/>
      }

      {
        isLoadingCryptosBalancesInsights && !error &&
        <RadialChartSkeleton/>
      }

      {
        error && !isLoadingCryptosBalancesInsights &&
        <ErrorAlert message="Error retrieving cryptos insights"/>
      }
    </Fragment>
  );
}

export default CryptosBalancesChart