import { type PaymentMethod } from '@/01-entities/finance/Transaction.entity';

export interface CollectTuitionInput {
  studentId: string;
  branchId: string;
  classId: string;
  amount: number;
  method: PaymentMethod;
  transactionDate: Date;
  note?: string;
  performedBy: string;
  description?: string; 
}
