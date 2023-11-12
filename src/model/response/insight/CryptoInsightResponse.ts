import {BalancesResponse} from "../BalancesResponse";

export interface CryptoInsightResponse {
  cryptoName: string,
  balances: BalancesResponse,
  platforms: Array<PlatformInsight>
}

export interface PlatformInsight {
  quantity: string,
  balances: BalancesResponse,
  percentage: number,
  platformName: string
}