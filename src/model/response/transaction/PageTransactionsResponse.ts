import {TransactionResponse} from "./TransactionResponse";

export interface PageTransactionsResponse {
  page: number;
  totalPages: number;
  hasNextPage: Boolean;
  transactions: Array<TransactionResponse>;
}