import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import TotalBalanceCards from "./TotalBalanceCards";
import {retrieveTotalBalancesInsights} from "../../services/insightsService";
import TotalBalancesCardsSkeleton from "../skeletons/TotalBalancesCardsSkeleton";
import {TotalBalancesResponse} from "../../model/response/Balances";

const TotalBalancesCards = () => {

  const [totalBalances, setTotalBalances] = useState<TotalBalancesResponse>({
    fiat: {
      usd: "0",
      eur: "0"
    },
    btc: "0",
    stablecoins: "0"
  });
  const [error, setError] = useState(false);
  const [isLoadingTotalBalances, setIsLoadingTotalBalances] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await retrieveTotalBalancesInsights();
        setTotalBalances(response);
      } catch (error: unknown) {
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
        <TotalBalanceCards totalUsdValue={Number(totalBalances.fiat.usd)}
                           totalEurValue={Number(totalBalances.fiat.eur)}
                           totalBtcValue={Number(totalBalances.btc)}/>
      }
    </Fragment>
  )
}

export default TotalBalancesCards