import React, {useEffect, useRef, useState} from "react";
import {PageUserCryptosInsightsResponse} from "../model/response/insight/PageUserCryptosInsightsResponse";
import {UserCryptosInsights} from "../model/response/insight/UserCryptosInsights";

export function usePageUserCryptosInsightsResponse(callback: () => Promise<any>) {

  const [pageUserCryptosInsightsResponse, setPageUserCryptosInsightsResponse] = useState<PageUserCryptosInsightsResponse>({
    page: 0,
    totalPages: 0,
    hasNextPage: false,
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    cryptos: []
  });
  const [cryptosFilterValue, setCryptosFilterValue] = useState("");
  const filteredCryptos = useRef<Array<UserCryptosInsights>>([]);
  const [error, setError] = useState(false);
  const [isLoadingUserCryptosInsights, setIsLoadingUserCryptosInsights] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await callback();
        setPageUserCryptosInsightsResponse(response);
        filteredCryptos.current = response.cryptos;
      } catch (err) {
        setError(true);
      } finally {
        setIsLoadingUserCryptosInsights(false);
      }
    })()
  }, []);

  const loadMoreCryptos = async (insightsMethod: Promise<any>) => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response: PageUserCryptosInsightsResponse = await insightsMethod;

      filteredCryptos.current = [...filteredCryptos.current,
        ...response.cryptos.filter(crypto =>
          crypto.cryptoInfo.cryptoName.toLowerCase().startsWith(cryptosFilterValue) || crypto.cryptoInfo.symbol.startsWith(cryptosFilterValue))
      ];
      setPageUserCryptosInsightsResponse({
        page: response.page,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        balances: {
          totalUSDBalance: response.balances.totalUSDBalance,
          totalEURBalance: response.balances.totalEURBalance,
          totalBTCBalance: response.balances.totalBTCBalance
        },
        cryptos: [...pageUserCryptosInsightsResponse.cryptos, ...response.cryptos]
      });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoadingMore(false);
    }
  }

  function filterTable(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    filteredCryptos.current = pageUserCryptosInsightsResponse.cryptos.filter(crypto => crypto.cryptoInfo.cryptoName.toLowerCase().startsWith(value) || crypto.cryptoInfo.symbol.startsWith(value));
    setCryptosFilterValue(value);
  }

  return {
    pageUserCryptosInsightsResponse,
    setPageUserCryptosInsightsResponse,
    filteredCryptos,
    error,
    isLoadingUserCryptosInsights,
    setIsLoadingUserCryptosInsights,
    page,
    setPage,
    isLoadingMore,
    loadMoreCryptos,
    filterTable
  }
}