import React, {useEffect, useRef, useState} from "react";
import {PageUserCryptosInsightsResponse} from "../model/response/insight/PageUserCryptosInsightsResponse";
import {UserCryptoInsights} from "../model/response/insight/UserCryptoInsights";

export function usePageUserCryptosInsightsResponse(callback: () => Promise<PageUserCryptosInsightsResponse>) {

  const [pageUserCryptosInsightsResponse, setPageUserCryptosInsightsResponse] = useState<PageUserCryptosInsightsResponse>({
    page: 0,
    totalPages: 0,
    hasNextPage: false,
    balances: {
      fiat: {
        usd: "0",
        eur: "0"
      },
      btc: "0"
    },
    cryptos: []
  });
  const [cryptosFilterValue, setCryptosFilterValue] = useState("");
  const filteredCryptos = useRef<Array<UserCryptoInsights>>([]);
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
      } catch (error: unknown) {
        setError(true);
      } finally {
        setIsLoadingUserCryptosInsights(false);
      }
    })()
  }, []);

  const loadMoreCryptos = async (insightsMethod: Promise<PageUserCryptosInsightsResponse>) => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response: PageUserCryptosInsightsResponse = await insightsMethod;

      filteredCryptos.current = [...filteredCryptos.current,
        ...response.cryptos.filter(crypto =>
          crypto.cryptoInfo.cryptoName!.toLowerCase().startsWith(cryptosFilterValue) || crypto.cryptoInfo.symbol.startsWith(cryptosFilterValue))
      ];
      setPageUserCryptosInsightsResponse({
        page: response.page,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        balances: {
          fiat: {
            usd: response.balances.fiat.usd,
            eur: response.balances.fiat.eur
          },
          btc: response.balances.btc
        },
        cryptos: [...pageUserCryptosInsightsResponse.cryptos, ...response.cryptos]
      });
    } catch (error: unknown) {
      setError(true);
    } finally {
      setIsLoadingMore(false);
    }
  }

  function filterTable(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    filteredCryptos.current = pageUserCryptosInsightsResponse.cryptos.filter(crypto => crypto.cryptoInfo.cryptoName!.toLowerCase().startsWith(value) || crypto.cryptoInfo.symbol.startsWith(value));
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
    filterTable,
    cryptosFilterValue,
    setCryptosFilterValue
  }
}