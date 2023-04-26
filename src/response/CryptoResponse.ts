import {CoinInfoResponse} from "./CoinInfoResponse";

export interface CryptoResponse {
  coin_id: string,
  coin_info: CoinInfoResponse,
  quantity: number,
  balance: number,
  percentage: number,
  platform: string,
}