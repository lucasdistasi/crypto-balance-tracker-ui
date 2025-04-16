import {BalancesResponse} from "../BalancesResponse";
import {CryptoInfo} from "../CryptoInfo";

export interface PlatformInsightsResponse {
  platformName: string,
  balances: BalancesResponse,
  cryptos: Array<CryptoInsights>
}

interface CryptoInsights {
  id: string,
  cryptoInfo: CryptoInfo,
  quantity: string,
  percentage: number,
  balances: BalancesResponse,
}