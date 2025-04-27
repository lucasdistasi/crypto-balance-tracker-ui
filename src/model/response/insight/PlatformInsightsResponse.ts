import {CryptoInfo} from "../CryptoInfo";
import {Balances} from "../Balances";

export interface PlatformInsightsResponse {
  platformName: string,
  balances: Balances,
  cryptos: Array<CryptoInsights>
}

interface CryptoInsights {
  id: string,
  cryptoInfo: CryptoInfo,
  quantity: string,
  percentage: number,
  balances: Balances,
}