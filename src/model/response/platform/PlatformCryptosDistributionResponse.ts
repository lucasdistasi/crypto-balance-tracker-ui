import {CryptoResponse} from "../crypto/CryptoResponse";

export interface PlatformCryptosDistributionResponse {
  platform: string,
  cryptos: CryptoResponse[],
}