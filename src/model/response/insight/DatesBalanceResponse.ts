import {BalancesResponse} from "../BalancesResponse";

export interface DatesBalanceResponse {
  datesBalances: Array<DatesBalances>,
  change: BalanceChanges,
  priceDifference: DifferencesChanges
}

export interface DatesBalances {
  date: string,
  balances: BalancesResponse
}

export interface BalanceChanges {
  usdChange: number,
  eurChange: number,
  btcChange: number,
}

export interface DifferencesChanges {
  usdDifference: string,
  eurDifference: string,
  btcDifference: string,
}