import {BalancesResponse} from "../BalancesResponse";
import {CryptoInsights} from "./CryptoInsights";

export interface PlatformInsightsResponse {
  platformName: string,
  balances: BalancesResponse,
  cryptos: Array<CryptoInsights>
}