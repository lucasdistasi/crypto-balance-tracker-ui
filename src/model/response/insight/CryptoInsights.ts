import {BalancesResponse} from "../BalancesResponse";

export interface CryptoInsights {
  cryptoName: string,
  cryptoId?: string,
  quantity?: string,
  balances: BalancesResponse,
  percentage: number
}