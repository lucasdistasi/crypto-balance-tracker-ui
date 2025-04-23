import {Balances} from "../Balances";
import {CryptoInfo} from "../CryptoInfo";

export interface CryptoInsightResponse {
  cryptoInfo: CryptoInfo,
  balances: Balances,
  platforms: Array<PlatformInsight>
}

interface PlatformInsight {
  quantity: string,
  balances: Balances,
  percentage: number,
  platformName: string
}