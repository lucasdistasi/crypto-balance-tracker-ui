const CRYPTO_BALANCE_TRACKER_URL = "http://localhost:8080/api/v1";
const DASHBOARDS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/dashboards");

export const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");
export const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
export const ALL_CRYPTOS_DASHBOARD_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances");
export const DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/platform/balances");
export const DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances/platforms");

export const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`
}

export const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`
}