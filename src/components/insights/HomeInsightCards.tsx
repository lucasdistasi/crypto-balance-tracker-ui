import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import TotalBalancesCardsSkeleton from "../skeletons/TotalBalancesCardsSkeleton";
import InsightCard from "./InsightCard";
import {HomeInsightsResponse} from "../../model/response/insight/HomeInsightsResponse";
import {retrieveHomeInsights} from "../../services/insightsService";

const HomeInsightCards = () => {

  const [homeInsightsResponse, setHomeInsightsResponse] = useState<HomeInsightsResponse>({
    balances: {
      fiat: {
        usd: "0",
        eur: "0"
      },
      btc: "0"
    },
    stablecoins: "0",
    top24hGainer: {
      cryptoId: "",
      symbol: "",
      image: ""
    }
  });
  const [error, setError] = useState(false);
  const [isLoadingHomeInsights, setIsLoadingHomeInsights] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const homeInsightsResponse = await retrieveHomeInsights();
        setHomeInsightsResponse(homeInsightsResponse);
      } catch (error: unknown) {
        setError(true);
      } finally {
        setIsLoadingHomeInsights(false);
      }
    })()
  }, []);

  return (
    <Fragment>
      {
        isLoadingHomeInsights && !error &&
        <TotalBalancesCardsSkeleton/>
      }

      {
        error && !isLoadingHomeInsights &&
        <ErrorAlert message="Error retrieving total balances"/>
      }

      {
        !error && !isLoadingHomeInsights &&
        <div className="container mt-16 flex flex-col w-full mx-auto justify-between xl:flex-row">
          <InsightCard title={"Holdings"}
                       value={Number(homeInsightsResponse.balances.fiat.usd)}
                       decimals={2}
                       symbol="$"/>
          <InsightCard title={"Total value in BTC"}
                       value={Number(homeInsightsResponse.balances.btc)}
                       decimals={8}
                       symbol="₿"/>
          <InsightCard title={"Liquidity"}
                       value={Number(homeInsightsResponse.stablecoins)}
                       decimals={2}
                       symbol="$"/>
          <div className="mb-8 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow text-left md:w-full xl:w-1/6 dark:bg-dark-1 dark:border-gray-500">
            <h5 className="w-full mb-4 font-bold tracking-tight text-gray-900 dark:text-white">
              Top Gainer (24h)
            </h5>

            <div className="flex items-center space-x-2 font-semibold text-lg text-gray-700 dark:text-gray-300">
              <img
                className="w-8 h-8 border rounded-full dark:border-gray-500"
                src={homeInsightsResponse.top24hGainer.image}
                alt={`${homeInsightsResponse.top24hGainer.symbol} logo`}
              />
              <span className="uppercase">{homeInsightsResponse.top24hGainer.symbol}</span>
              <span className="text-green-500 dark:text-green-400">
                {`+${homeInsightsResponse.top24hGainer.priceChange!.changePercentageIn24h}%`}
              </span>
            </div>
          </div>

        </div>
      }
    </Fragment>
  )
}

export default HomeInsightCards