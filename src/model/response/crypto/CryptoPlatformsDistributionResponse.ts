import {CryptoResponse} from "./CryptoResponse";

export interface CryptoPlatformsDistributionResponse {
  crypto_id: string,
  cryptos: CryptoResponse[],
}