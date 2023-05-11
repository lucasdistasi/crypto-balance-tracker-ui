export interface DashboardCoinInfoResponse {
  name: string,
  quantity: bigint,
  balance: bigint,
  percentage: number,
  platforms: Array<string>
}