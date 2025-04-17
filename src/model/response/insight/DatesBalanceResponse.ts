import {Balances} from "../Balances";

export interface DatesBalanceResponse {
  datesBalances: Array<DatesBalances>,
  change: BalanceChanges,
  priceDifference: DifferencesChanges
}

export interface DatesBalances {
  date: string,
  balances: Balances
}

interface BalanceChanges {
  usdChange: number,
  eurChange: number,
  btcChange: number,
}

interface DifferencesChanges {
  usdDifference: string,
  eurDifference: string,
  btcDifference: string,
}