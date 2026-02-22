import { type TransactionType, type PaymentMethod, type TransactionStatus } from '@/01-entities/finance/Transaction.entity';

export interface CreateTransactionInput {
  branchId: string;
  code: string;
  type: TransactionType;
  amount: number;
  method: PaymentMethod;
  transactionDate: Date;
  status?: TransactionStatus;
  invoiceId?: string;
  studentId?: string;
  description?: string;
  performedBy: string;
}