export interface MarketData {
  circulatingSupply: CirculatingSupply
  maxSupply: string
  currentPrice: CurrentPrice
  marketCap: string
  priceChange: PriceChange
}

export interface CurrentPrice {
  usd: string
  eur: string
  btc: string
}

export interface PriceChange {
  changePercentageIn24h: string
  changePercentageIn7d: string
  changePercentageIn30d: string
}

interface CirculatingSupply {
  totalCirculatingSupply: string,
  percentage: number
}