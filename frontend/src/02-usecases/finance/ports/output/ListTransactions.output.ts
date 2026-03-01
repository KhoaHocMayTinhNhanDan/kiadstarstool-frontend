import { type TransactionType, type PaymentMethod, type TransactionStatus } from '@/01-entities/finance/Transaction.entity';

export interface TransactionListItem {
  id: string;
  code: string;
  branchId: string;
  type: TransactionType;
  amount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  date: string;
  description?: string;
  performedBy: string;
}

export type ListTransactionsOutput = TransactionListItem[];