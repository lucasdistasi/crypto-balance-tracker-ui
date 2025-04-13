import {CryptoInfo} from "../CryptoInfo";

export interface GoalResponse {
  id: string
  cryptoInfo: CryptoInfo
  actualQuantity: string
  progress: number
  remainingQuantity: string
  goalQuantity: string
  moneyNeeded: string
}