export const CRYPTO_BALANCE_TRACKER_URL = "http://localhost:8080/api/v1";
export const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");
export const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
export const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`
}

export const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`
}