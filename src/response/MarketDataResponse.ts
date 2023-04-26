import {CurrentPrice} from "./CurrentPrice";

export interface MarketDataResponse {
  current_price: CurrentPrice,
  total_supply: bigint,
  max_supply: bigint
}