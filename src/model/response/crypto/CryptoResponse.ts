import {CoingeckoCryptoInfo} from "./CoingeckoCryptoInfo";

export interface CryptoResponse {
  id: string,
  crypto_info: CoingeckoCryptoInfo,
  quantity: number,
  balance: number,
  percentage: number,
  platform: string,
}