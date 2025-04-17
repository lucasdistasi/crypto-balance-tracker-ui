import {CryptoInfo} from "../CryptoInfo";
import {Balances} from "../Balances";

export interface UserCryptoInsights {
  cryptoInfo: CryptoInfo
  quantity: string
  percentage: number
  balances: Balances
}