import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import axios from "axios";
import {SortParams} from "../model/request/SortParams";

const CRYPTOS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/balances");
const DAYS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/dates-balances");
const PLATFORMS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms/balances");
const CRYPTOS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");
const CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/platforms");
const PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms");
const TOTAL_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/balances");
const CRYPTO_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");

export const retrieveCryptosBalancesInsights = async () => {
  return await axios.get(CRYPTOS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveDaysBalancesInsights = async (balancesPeriodValue: string) => {
  return await axios.get(DAYS_BALANCES_INSIGHTS_ENDPOINT.concat(`?dateRange=${balancesPeriodValue}`));
}

export const retrievePlatformsBalancesInsights = async () => {
  return await axios.get(PLATFORMS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveCryptosInsightsByPage = async (page: number, sortParams: SortParams) => {
  const {sortBy, sortType} = sortParams;
  const url = CRYPTOS_INSIGHTS_ENDPOINT.concat(`?page=${page}&sortBy=${sortBy}&sortType=${sortType}`);

  return await axios.get(url)
    .then(response => response.data);
}

export const retrieveCryptosPlatformsInsightsByPage = async (page: number, sortParams: SortParams) => {
  const {sortBy, sortType} = sortParams;
  const url = CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT.concat(`?page=${page}&sortBy=${sortBy}&sortType=${sortType}`);

  return await axios.get(url)
    .then(response => response.data);
}

export const retrievePlatformInsights = async (platformId: string) => {
  return await axios.get(PLATFORMS_INSIGHTS_ENDPOINT.concat(`/${platformId}`))
    .then(response => response.data);
}

export const retrieveTotalBalancesInsights = async () => {
  return await axios.get(TOTAL_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveCryptoInsights = async (coingeckoCryptoId: string) => {
  return await axios.get(CRYPTO_INSIGHTS_ENDPOINT.concat(`/${coingeckoCryptoId}`))
    .then(response => response.data);
}