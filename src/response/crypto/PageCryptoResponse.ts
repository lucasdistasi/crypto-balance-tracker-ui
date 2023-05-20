import {Crypto} from "../../model/Crypto";

export interface PageCryptoResponse {
  page: number,
  totalPages: number,
  hasNextPage: boolean,
  cryptos: Array<Crypto>
}