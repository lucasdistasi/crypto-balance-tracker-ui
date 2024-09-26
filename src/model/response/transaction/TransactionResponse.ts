import {TransactionType} from "../../TransactionType";

export interface TransactionResponse {
  id: string;
  ticker: string;
  quantity: string;
  price: string;
  total: string;
  transactionType: TransactionType;
  platform: string;
  date: string;
}