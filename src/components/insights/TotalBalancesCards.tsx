import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import TotalBalanceCards from "./TotalBalanceCards";
import {BalancesResponse} from "../../model/response/BalancesResponse";
import {retrieveTotalBalancesInsights} from "../../services/insightsService";
import TotalBalancesCardsSkeleton from "../skeletons/TotalBalancesCardsSkeleton";

const TotalBalancesCards = () => {

  const [totalBalances, setTotalBalances] = useState<BalancesResponse>({
    totalBTCBalance: "0",
    totalEURBalance: "0",
    totalUSDBalance: "0"
  });
  const [error, setError] = useState(false);
  const [isLoadingTotalBalances, setIsLoadingTotalBalances] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response: BalancesResponse = await retrieveTotalBalancesInsights();
        setTotalBalances(response);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoadingTotalBalances(false);
      }
    })()
  }, []);

  return (
    <Fragment>
      {
        isLoadingTotalBalances && !error &&
        <TotalBalancesCardsSkeleton/>
      }

      {
        error && !isLoadingTotalBalances &&
        <ErrorAlert message="Error retrieving total balances"/>
      }

      {
        !error && !isLoadingTotalBalances &&
        <TotalBalanceCards totalUsdValue={Number(totalBalances.totalUSDBalance)}
                           totalEurValue={Number(totalBalances.totalEURBalance)}
                           totalBtcValue={Number(totalBalances.totalBTCBalance)}/>
      }
    </Fragment>
  )
}

export default TotalBalancesCards