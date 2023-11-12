import {CryptoInsights} from "./CryptoInsights";
import {BalancesResponse} from "../BalancesResponse";

export interface CryptosBalancesInsightsResponse {
  balances: BalancesResponse,
  cryptos: Array<CryptoInsights>
}