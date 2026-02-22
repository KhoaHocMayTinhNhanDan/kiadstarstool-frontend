import { Transaction } from '@/01-entities/finance/Transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  getAll(): Promise<Transaction[]>;
  getByBranchId(branchId: string): Promise<Transaction[]>;
}