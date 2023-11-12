export interface MarketData {
  circulatingSupply: string,
  maxSupply: string,
  currentPrice: CurrentPrice
}

export interface CurrentPrice {
  usd: string
  eur: string
  btc: string
}