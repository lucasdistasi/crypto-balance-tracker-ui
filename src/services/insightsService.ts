import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import axios from "axios";
import {SortParams} from "../model/request/SortParams";
import {DatesBalanceResponse} from "../model/response/insight/DatesBalanceResponse";
import {PageUserCryptosInsightsResponse} from "../model/response/insight/PageUserCryptosInsightsResponse";
import {CryptoInsightResponse} from "../model/response/insight/CryptoInsightResponse";
import {PlatformInsightsResponse} from "../model/response/insight/PlatformInsightsResponse";
import {BalancesChartResponse} from "../model/response/insight/BalancesChartResponse";
import {HomeInsightsResponse} from "../model/response/insight/HomeInsightsResponse";

const HOME_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights");
const CRYPTOS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/balances");
const DAYS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/dates-balances");
const PLATFORMS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms/balances");
const CRYPTOS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");
const PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms");
const CRYPTO_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");

export const retrieveHomeInsights = async (): Promise<HomeInsightsResponse> => {
  return await axios.get<HomeInsightsResponse>(HOME_INSIGHTS_ENDPOINT)
    .then(response => response.data)
}

export const retrieveDaysBalancesInsights = async (balancesPeriodValue: string): Promise<DatesBalanceResponse> => {
  const url = DAYS_BALANCES_INSIGHTS_ENDPOINT.concat(`?dateRange=${balancesPeriodValue}`);

  return await axios.get<DatesBalanceResponse>(url)
    .then(response => response.data);
}

export const retrieveCryptosInsightsByPage = async (
  page: number,
  sortParams: SortParams
): Promise<PageUserCryptosInsightsResponse> => {
  const {sortBy, sortType} = sortParams;
  const url = CRYPTOS_INSIGHTS_ENDPOINT.concat(`?page=${page}&sortBy=${sortBy}&sortType=${sortType}`);

  return await axios.get<PageUserCryptosInsightsResponse>(url)
    .then(response => response.data);
}

export const retrieveCryptosBalancesInsights = async (): Promise<Array<BalancesChartResponse>> => {
  return await axios.get<Array<BalancesChartResponse>>(CRYPTOS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrievePlatformsBalancesInsights = async (): Promise<Array<BalancesChartResponse>> => {
  return await axios.get<Array<BalancesChartResponse>>(PLATFORMS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveCryptoInsights = async (coingeckoCryptoId: string): Promise<CryptoInsightResponse> => {
  return await axios.get<CryptoInsightResponse>(CRYPTO_INSIGHTS_ENDPOINT.concat(`/${coingeckoCryptoId}`))
    .then(response => response.data);
}

export const retrievePlatformInsights = async (platformId: string): Promise<PlatformInsightsResponse> => {
  return await axios.get<PlatformInsightsResponse>(PLATFORMS_INSIGHTS_ENDPOINT.concat(`/${platformId}`))
    .then(response => response.data);
}
