import {UserCryptoInsights} from "./UserCryptoInsights";
import {Balances} from "../Balances";

export interface PageUserCryptosInsightsResponse {
  page: number
  totalPages: number
  hasNextPage: boolean
  balances: Balances,
  cryptos: Array<UserCryptoInsights>
}