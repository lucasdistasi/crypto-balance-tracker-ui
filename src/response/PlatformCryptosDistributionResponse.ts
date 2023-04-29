import {CryptoResponse} from "./CryptoResponse";

export interface PlatformCryptosDistributionResponse {
  platform: string,
  coins: CryptoResponse[],
}