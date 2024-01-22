import {BalancesResponse} from "../BalancesResponse";
import {CryptoInfo} from "../CryptoInfo";
import {MarketData} from "../MarketData";

export interface UserCryptosInsights {
  cryptoInfo: CryptoInfo
  quantity: string
  percentage: number
  balances: BalancesResponse
  marketCapRank: number
  marketData: MarketData
  platforms: Array<string>
}