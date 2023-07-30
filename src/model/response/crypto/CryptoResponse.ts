import {CoingeckoCryptoInfo} from "./CoingeckoCryptoInfo";

export interface CryptoResponse {
  crypto_id: string,
  crypto_info: CoingeckoCryptoInfo,
  quantity: number,
  balance: number,
  percentage: number,
  platform: string,
}