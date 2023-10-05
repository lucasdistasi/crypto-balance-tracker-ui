import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import axios from "axios";

const CRYPTOS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/balances");
const PLATFORMS_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms/balances");
const CRYPTOS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos");
const CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos/platforms");
const PLATFORMS_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/platforms");
const TOTAL_BALANCES_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/balances")
const CRYPTO_INSIGHTS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/insights/cryptos")

export const retrieveCryptosBalancesInsights = async () => {
  return await axios.get(CRYPTOS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrievePlatformsBalancesInsights = async () => {
  return await axios.get(PLATFORMS_BALANCES_INSIGHTS_ENDPOINT)
    .then(response => response.data);
}

export const retrieveCryptosInsightsByPage = async (page: number) => {
  return await axios.get(CRYPTOS_INSIGHTS_ENDPOINT.concat(`?page=${page}`))
    .then(response => response.data);
}

export const retrieveCryptosPlatformsInsightsByPage = async (page: number) => {
  return await axios.get(CRYPTOS_PLATFORMS_INSIGHTS_ENDPOINT.concat(`?page=${page}`))
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