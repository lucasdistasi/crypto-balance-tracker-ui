import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {retrieveCryptosBalancesInsights} from "../../services/insightsService";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";
import NoCryptosFoundAlert from "../crypto/NoCryptosFoundAlert";
import BalancesPieChart from "./BalancesPieChart";
import {BalancesChartResponse} from "../../model/response/insight/BalancesChartResponse";

const CryptosBalancesChart = () => {

  const [cryptosBalances, setCryptosBalances] = useState<Array<BalancesChartResponse>>([
    {
      name: "",
      balance: "0",
      percentage: 0
    }
  ]);
  const [error, setError] = useState(false);
  const [isLoadingCryptosBalancesInsights, setIsLoadingCryptosBalancesInsights] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response: Array<BalancesChartResponse> = await retrieveCryptosBalancesInsights();
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
        !isLoadingCryptosBalancesInsights && (cryptosBalances?.length === 0) &&
        <NoCryptosFoundAlert/>
      }

      {
        !error && !isLoadingCryptosBalancesInsights && cryptosBalances?.length > 0 &&
        <BalancesPieChart chartId="cryptos-distribution-pie-chart"
                          chartTitle="Cryptos Distribution"
                          series={cryptosBalances.map(crypto => Number(crypto.balance))}
                          labels={cryptosBalances.map(crypto => `${crypto.name} (${crypto.percentage}%)`)}/>
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