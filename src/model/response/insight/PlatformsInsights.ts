import {BalancesResponse} from "../BalancesResponse";

export interface PlatformsInsights {
  platformName: string,
  balances: BalancesResponse,
  percentage: number
}