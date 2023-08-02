import {CryptoResponse} from "./CryptoResponse";

export interface CryptosBalancesResponse {
  total_balance: bigint,
  total_EUR_balance: bigint,
  total_BTC_balance: bigint,
  cryptos: CryptoResponse[],
}