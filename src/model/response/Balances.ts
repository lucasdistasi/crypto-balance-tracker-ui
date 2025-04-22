export interface Balances {
  fiat: FiatBalance,
  btc: string
}

interface FiatBalance {
  usd: string,
  eur: string
}