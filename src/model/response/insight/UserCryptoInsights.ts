import {BalancesResponse} from "../BalancesResponse";
import {CryptoInfo} from "../CryptoInfo";

export interface UserCryptoInsights {
  cryptoInfo: CryptoInfo
  quantity: string
  percentage: number
  balances: BalancesResponse
}