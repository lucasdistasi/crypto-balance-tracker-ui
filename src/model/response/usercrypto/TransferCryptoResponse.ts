export interface TransferCryptoResponse {
  fromPlatform: FromPlatform,
  toPlatform: ToPlatform
}

interface FromPlatform {
  userCryptoId: string,
  networkFee: string,
  quantityToTransfer: string,
  totalToSubtract: string,
  quantityToSendReceive: string,
  remainingCryptoQuantity: string,
  sendFullQuantity: boolean
}

interface ToPlatform {
  platformId: string,
  newQuantity: string
}