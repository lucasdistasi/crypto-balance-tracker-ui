const CRYPTO_BALANCE_TRACKER_URL = "http://localhost:8080/api/v1";
const DASHBOARDS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/dashboards");

export const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");
export const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
export const GOALS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/goals");
export const ALL_CRYPTOS_DASHBOARD_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances");
export const DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/platform/balances");
export const DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances/platforms");
export const DASHBOARDS_PLATFORMS_CRYPTOS_DISTRIBUTION_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/platforms/coins");
export const DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/cryptos");
export const TRANSFER_CRYPTO_ENDPOINT = CRYPTOS_ENDPOINT.concat("/transfer");

export const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`
}

export const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`
}

export const getGoalURL = (goalId: string) => {
  return `${GOALS_ENDPOINT}/${goalId}`
}

export const getPageCryptosURL = (page: number) => {
  return `${CRYPTO_BALANCE_TRACKER_URL}/cryptos?page=${page}`;
}

export const MONGO_ID_REGEX = /^[a-zA-Z0-9]{24}$/;

export const isValidQuantity = (quantity: string) => {
  const regex = /^(?=.*[1-9])\d{0,16}(\.\d{1,12})?$/;

  return regex.test(quantity);
}