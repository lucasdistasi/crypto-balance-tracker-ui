import {BalancesResponse} from "../BalancesResponse";
import {UserCryptoInsights} from "./UserCryptoInsights";

export interface PageUserCryptosInsightsResponse {
  page: number
  totalPages: number
  hasNextPage: boolean
  balances: BalancesResponse,
  cryptos: Array<UserCryptoInsights>
}