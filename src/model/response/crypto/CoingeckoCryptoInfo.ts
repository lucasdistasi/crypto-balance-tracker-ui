import {MarketDataResponse} from "./MarketDataResponse";

export interface CoingeckoCryptoInfo {
  symbol: string,
  name: string,
  market_data: MarketDataResponse,
}