import {BalancesResponse} from "../BalancesResponse";
import {UserCryptosInsights} from "./UserCryptosInsights";

export interface PageUserCryptosInsightsResponse {
  page: number
  totalPages: number
  hasNextPage: boolean
  balances: BalancesResponse,
  cryptos: Array<UserCryptosInsights>
}