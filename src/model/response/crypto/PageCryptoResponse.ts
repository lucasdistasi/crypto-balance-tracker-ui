import {Crypto} from "./Crypto";

export interface PageCryptoResponse {
  page: number,
  total_pages: number,
  has_next_page: boolean,
  cryptos: Array<Crypto>
}