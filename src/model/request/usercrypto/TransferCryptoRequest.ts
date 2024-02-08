interface TransferCryptoRequest {
  userCryptoId: string,
  quantityToTransfer: bigint,
  sendFullQuantity: boolean,
  networkFee: bigint,
  toPlatformId: string
}