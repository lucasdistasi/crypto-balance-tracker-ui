import {MarketDataResponse} from "./MarketDataResponse";

export interface CoinInfoResponse {
  symbol: string,
  name: string,
  market_data: MarketDataResponse,
}