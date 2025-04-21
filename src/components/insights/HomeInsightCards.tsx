import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {retrieveTopCrypto24h, retrieveTotalBalancesInsights} from "../../services/insightsService";
import TotalBalancesCardsSkeleton from "../skeletons/TotalBalancesCardsSkeleton";
import {TotalBalancesResponse} from "../../model/response/Balances";
import InsightCard from "./InsightCard";
import {CryptoInfo} from "../../model/response/CryptoInfo";

const HomeInsightCards = () => {

  const [totalBalances, setTotalBalances] = useState<TotalBalancesResponse>({
    fiat: {
      usd: "0",
      eur: "0"
    },
    btc: "0",
    stablecoins: "0"
  });
  const [topCrypto24h, setTopCrypto24h] = useState<CryptoInfo>({
    cryptoId: "",
    image: "",
    priceChange: undefined,
    symbol: ""
  })
  const [error, setError] = useState(false);
  const [isLoadingTotalBalances, setIsLoadingTotalBalances] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const totalBalancesResponse = await retrieveTotalBalancesInsights();
        setTotalBalances(totalBalancesResponse);

        const topCryptoResponse = await retrieveTopCrypto24h();
        setTopCrypto24h(topCryptoResponse);
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
        !error && !isLoadingTotalBalances && topCrypto24h.symbol &&
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
          <div className="mb-8 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow text-left md:w-full xl:w-1/6 dark:bg-dark-1 dark:border-gray-500">
            <h5 className="w-full mb-4 font-bold tracking-tight text-gray-900 dark:text-white">
              Top Gainer (24h)
            </h5>

            <div className="flex items-center space-x-4 font-semibold text-lg text-gray-700 dark:text-gray-300">
              <img
                className="w-8 h-8 border rounded-full dark:border-gray-500"
                src={topCrypto24h.image}
                alt={`${topCrypto24h.symbol} logo`}
              />
              <span className="uppercase">{topCrypto24h.symbol}</span>
              <span className="text-green-500 dark:text-green-400">
                {`+${topCrypto24h.priceChange!.changePercentageIn24h}%`}
              </span>
            </div>
          </div>

        </div>
      }
    </Fragment>
  )
}

export default HomeInsightCards