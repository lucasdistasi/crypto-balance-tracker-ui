import {TransactionType} from "../TransactionType";

export interface TransactionFilters {
  dateFrom: string;
  dateTo: string;
  cryptoTicker?: string;
  transactionType?: TransactionType;
  platform?: string;
}