import {PriceTargetResponse} from "./PriceTargetResponse";

export interface PagePriceTargetResponse {
  page: number
  totalPages: number
  hasNextPage: boolean,
  targets: Array<PriceTargetResponse>
}