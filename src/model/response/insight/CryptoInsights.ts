import {BalancesResponse} from "../BalancesResponse";

export interface CryptoInsights {
  id?: string,
  cryptoName: string,
  cryptoId?: string,
  quantity?: string,
  balances: BalancesResponse,
  percentage: number
}