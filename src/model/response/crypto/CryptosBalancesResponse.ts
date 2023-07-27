import {CryptoResponse} from "./CryptoResponse";

export interface CryptosBalancesResponse {
  totalBalance: bigint,
  totalEURBalance: bigint,
  totalBTCBalance: bigint,
  cryptos: CryptoResponse[],
}