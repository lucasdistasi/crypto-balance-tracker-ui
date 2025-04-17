export interface TotalBalancesResponse {
  fiat: FiatBalance,
  btc: string,
  stablecoins: string
}

export interface Balances {
  fiat: FiatBalance,
  btc: string
}

interface FiatBalance {
  usd: string,
  eur: string
}