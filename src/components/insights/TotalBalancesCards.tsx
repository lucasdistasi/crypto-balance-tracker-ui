import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import TotalBalanceCards from "./TotalBalanceCards";
import {BalancesResponse} from "../../model/response/BalancesResponse";
import {retrieveTotalBalancesInsights} from "../../services/insightsService";
import ChartSkeleton from "../skeletons/ChartSkeleton";

const TotalBalancesCards = () => {

  const [totalBalances, setTotalBalances] = useState<BalancesResponse>({
    totalBTCBalance: "0",
    totalEURBalance: "0",
    totalUSDBalance: "0"
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await retrieveTotalBalancesInsights();
        setTotalBalances(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  return (
    <Fragment>
      {
        loading && !error &&
        <ChartSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }

      {
        !error && !loading &&
        <TotalBalanceCards totalUsdValue={Number(totalBalances.totalUSDBalance)}
                           totalEurValue={Number(totalBalances.totalEURBalance)}
                           totalBtcValue={Number(totalBalances.totalBTCBalance)}/>
      }
    </Fragment>
  )
}

export default TotalBalancesCards