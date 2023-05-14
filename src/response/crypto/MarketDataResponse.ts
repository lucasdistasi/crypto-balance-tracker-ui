import {CurrentPrice} from "./CurrentPrice";

export interface MarketDataResponse {
  current_price: CurrentPrice,
  circulating_supply: bigint,
  max_supply: bigint
}