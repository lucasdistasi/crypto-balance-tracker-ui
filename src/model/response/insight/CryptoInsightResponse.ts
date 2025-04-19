import {Balances} from "../Balances";

export interface CryptoInsightResponse {
  cryptoName: string,
  balances: Balances,
  platforms: Array<PlatformInsight>
}

interface PlatformInsight {
  quantity: string,
  balances: Balances,
  percentage: number,
  platformName: string
}