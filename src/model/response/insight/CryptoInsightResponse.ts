import {BalancesResponse} from "../BalancesResponse";

export interface CryptoInsightResponse {
  cryptoName: string,
  balances: BalancesResponse,
  platforms: Array<PlatformInsight>
}

interface PlatformInsight {
  quantity: string,
  balances: BalancesResponse,
  percentage: number,
  platformName: string
}