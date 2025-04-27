import {CryptoInfo} from "../CryptoInfo";
import {Balances} from "../Balances";

export interface HomeInsightsResponse {
  balances: Balances
  stablecoins: string
  top24hGainer: CryptoInfo
}