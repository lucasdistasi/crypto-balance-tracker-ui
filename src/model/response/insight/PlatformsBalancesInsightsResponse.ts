import {BalancesResponse} from "../BalancesResponse";
import {PlatformsInsights} from "./PlatformsInsights";

export interface PlatformsBalancesInsightsResponse {
  balances: BalancesResponse,
  platforms: Array<PlatformsInsights>
}