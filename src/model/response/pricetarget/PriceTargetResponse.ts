import {CryptoInfo} from "../CryptoInfo";

export interface PriceTargetResponse {
  priceTargetId: string,
  cryptoInfo: CryptoInfo,
  currentPrice: string,
  priceTarget: string,
  change: number,
}