import {CryptoResponse} from "./CryptoResponse";

export interface CryptoPlatformsDistributionResponse {
  cryptoId: string,
  cryptos: CryptoResponse[],
}