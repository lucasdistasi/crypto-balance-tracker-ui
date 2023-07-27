import {CoinInfoResponse} from "./CoinInfoResponse";

export interface CryptoResponse {
  crypto_id: string,
  coin_info: CoinInfoResponse,
  quantity: number,
  balance: number,
  percentage: number,
  platform: string,
}