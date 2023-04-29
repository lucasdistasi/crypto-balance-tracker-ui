import {CryptoResponse} from "./CryptoResponse";

export interface CryptoPlatformsDistributionResponse {
  crypto: string,
  coins: CryptoResponse[],
}