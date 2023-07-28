export interface DashboardCryptoInfoResponse {
  name: string,
  quantity: bigint,
  balance: bigint,
  percentage: number,
  platforms: Array<string>
}