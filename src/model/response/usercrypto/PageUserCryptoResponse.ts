import {UserCryptoResponse} from "./UserCryptoResponse";

export interface PageUserCryptoResponse {
  page: number,
  totalPages: number,
  hasNextPage: boolean,
  cryptos: Array<UserCryptoResponse>
}