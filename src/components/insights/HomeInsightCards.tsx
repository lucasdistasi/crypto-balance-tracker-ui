import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {retrieveTotalBalancesInsights} from "../../services/insightsService";
import TotalBalancesCardsSkeleton from "../skeletons/TotalBalancesCardsSkeleton";
import {TotalBalancesResponse} from "../../model/response/Balances";
import InsightCard from "./InsightCard";

const HomeInsightCards = () => {

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
        <div className="container mt-16 flex flex-col w-full mx-auto justify-between xl:flex-row">
          <InsightCard title={"Holdings"}
                       value={Number(totalBalances.fiat.usd)}
                       decimals={2}
                       symbol="$"/>
          <InsightCard title={"Total value in BTC"}
                       value={Number(totalBalances.btc)}
                       decimals={8}
                       symbol="₿"/>
          <InsightCard title={"Liquidity"}
                       value={Number(totalBalances.stablecoins)}
                       decimals={2}
                       symbol="$"/>
        </div>
      }
    </Fragment>
  )
}

export default HomeInsightCards