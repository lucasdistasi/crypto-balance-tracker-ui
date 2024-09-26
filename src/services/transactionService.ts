import {PageTransactionsResponse} from "../model/response/transaction/PageTransactionsResponse";
import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import {TransactionResponse} from "../model/response/transaction/TransactionResponse";
import {TransactionFilters} from "../model/request/TransactionFIlters";

const TRANSACTIONS_URL = CRYPTO_BALANCE_TRACKER_URL.concat("/transactions");

export const retrievePageTransactions = async (page: number): Promise<PageTransactionsResponse> => {
  const url = `${TRANSACTIONS_URL}/latest?page=${page}`;

  return await axios.get<PageTransactionsResponse>(url)
    .then(response => response.data);
}

export const retrieveFilteredTransaction = async (transactionFilters: TransactionFilters): Promise<Array<TransactionResponse>> => {
  const { transactionType, ...otherFilters } = transactionFilters;

  const params = new URLSearchParams({
    dateFrom: otherFilters.dateFrom,
    dateTo: otherFilters.dateTo,
    ...(otherFilters.cryptoTicker && { cryptoTicker: otherFilters.cryptoTicker }),
    ...(transactionType && (transactionType === 'BUY' || transactionType === 'SELL') && { transactionType }),
    ...(otherFilters.platform && { platform: otherFilters.platform }),
  });

  const baseUrl = `${TRANSACTIONS_URL}?${params.toString()}`;

  return axios.get<Array<TransactionResponse>>(baseUrl)
    .then(response => response.data);
}