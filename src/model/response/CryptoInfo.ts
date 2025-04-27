export interface CryptoInfo {
  cryptoName?: string,
  cryptoId: string,
  symbol: string,
  image: string,
  price?: CurrentPrice,
  priceChange?: PriceChange,
}

interface CurrentPrice {
  usd: string
  eur: string
  btc?: string
}

interface PriceChange {
  changePercentageIn24h?: string
  changePercentageIn7d?: string
  changePercentageIn30d?: string
}