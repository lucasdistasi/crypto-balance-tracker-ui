import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import axios from "axios";
import {SortParams} from "../model/request/SortParams";
import {BalancesResponse} from "../model/response/BalancesResponse";
import {DatesBalanceResponse} from "../model/response/insight/DatesBalanceResponse";
import {PageUserCryptosInsightsResponse} from "../model/response/insight/PageUserCryptosInsightsResponse";
import {CryptosBalancesInsightsResponse} from "../model/response/insight/CryptosBalancesInsightsResponse";
import {PlatformsBalancesInsightsResponse} from "../model/response/insight/PlatformsBalancesInsightsResponse";
import {CryptoInsightResponse} from "../model/response/insight/CryptoInsightResponse";
import {PlatformInsightsResponse} from "../model/response/insight/PlatformInsightsResponse";

const CRYPTOS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/balances");
const DAYS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/dates-balances");
const PLATFORMS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms/balances");
const CRYPTOS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");
const CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/platforms");
const PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms");
const TOTAL_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/balances");
const CRYPTO_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");

export const retrieveTotalBalancesInsights = async (): Promise<BalancesResponse> => {
  return await axios.get(TOTAL_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveDaysBalancesInsights = async (balancesPeriodValue: string): Promise<DatesBalanceResponse> => {
  const url = DAYS_BALANCES_INSIGHTS_ENDPOINT.concat(`?dateRange=${balancesPeriodValue}`);

  return await axios.get(url)
    .then(response => response.data);
}

export const retrieveCryptosInsightsByPage = async (
  page: number,
  sortParams: SortParams
): Promise<PageUserCryptosInsightsResponse> => {
  const {sortBy, sortType} = sortParams;
  const url = CRYPTOS_INSIGHTS_ENDPOINT.concat(`?page=${page}&sortBy=${sortBy}&sortType=${sortType}`);

  return await axios.get(url)
    .then(response => response.data);
}

export const retrieveCryptosPlatformsInsightsByPage = async (
  page: number,
  sortParams: SortParams
): Promise<PageUserCryptosInsightsResponse> => {
  const {sortBy, sortType} = sortParams;
  const url = CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT.concat(`?page=${page}&sortBy=${sortBy}&sortType=${sortType}`);

  return await axios.get(url)
    .then(response => response.data);
}

export const retrieveCryptosBalancesInsights = async (): Promise<CryptosBalancesInsightsResponse> => {
  return await axios.get(CRYPTOS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrievePlatformsBalancesInsights = async (): Promise<PlatformsBalancesInsightsResponse> => {
  return await axios.get(PLATFORMS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveCryptoInsights = async (coingeckoCryptoId: string): Promise<CryptoInsightResponse> => {
  return await axios.get(CRYPTO_INSIGHTS_ENDPOINT.concat(`/${coingeckoCryptoId}`))
    .then(response => response.data);
}

export const retrievePlatformInsights = async (platformId: string): Promise<PlatformInsightsResponse> => {
  return await axios.get(PLATFORMS_INSIGHTS_ENDPOINT.concat(`/${platformId}`))
    .then(response => response.data);
}
