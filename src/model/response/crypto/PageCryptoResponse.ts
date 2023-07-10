import {Crypto} from "./Crypto";

export interface PageCryptoResponse {
  page: number,
  totalPages: number,
  hasNextPage: boolean,
  cryptos: Array<Crypto>
}