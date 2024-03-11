export interface DatesBalanceResponse {
  datesBalances: Array<DatesBalances>,
  change: number,
  priceDifference: string
}

export interface DatesBalances {
  date: string,
  balance: string
}