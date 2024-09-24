export interface TransferCryptoRequest {
  userCryptoId: string,
  quantityToTransfer: string,
  sendFullQuantity: boolean,
  networkFee: string,
  toPlatformId: string
}