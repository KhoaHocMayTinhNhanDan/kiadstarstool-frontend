import type { ITransactionDataSource } from '../../outbound/device_interfaces/finance/ITransactionDataSource';
import type { ITransactionRepository } from '@/02-usecases/finance/ports/gateways_interface/ITransactionRepository';
import { Transaction, type TransactionProps } from '@/01-entities/finance/Transaction.entity';
import { Identifier } from '@/01-entities/shared/value-objects/Identifier.vo';
import { type Result } from '@/01-entities/shared/base/result';

// NOTE: This is a temporary implementation to bridge the gap between the bootstrap
// layer (which should deal with repositories) and the finance use cases (which
// currently depend on data sources).
export class TransactionRepository implements ITransactionRepository {
  // The dataSource is public to allow a temporary hack in finance.bootstrap.ts.
  // This should be made private once interactors are refactored to depend on
  // the repository interface (ITransactionRepository).
  public readonly dataSource: ITransactionDataSource;

  constructor(dataSource: ITransactionDataSource) {
    this.dataSource = dataSource;
  }

  private hydrate(data: any): Transaction | null {
    if (!data) return null;
    const props: TransactionProps = {
      id: Identifier.create(data.id),
      branchId: data.branchId,
      code: data.code,
      type: data.type,
      amount: data.amount,
      method: data.method,
      status: data.status,
      transactionDate: data.transactionDate?.toDate ? data.transactionDate.toDate() : new Date(data.transactionDate),
      description: data.description,
      performedBy: data.performedBy,
      invoiceId: data.invoiceId,
      studentId: data.studentId,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      createdBy: data.createdBy ? Identifier.create(data.createdBy) : undefined,
      updatedBy: data.updatedBy ? Identifier.create(data.updatedBy) : undefined,
    };

    const result: Result<Transaction> = Transaction.create(props);
    if (result.isFailure) {
      console.error(`[TransactionRepository] Failed to hydrate transaction ${data.id}: ${result.getErrorValue()}`);
      return null;
    }
    return result.getValue();
  }

  async save(transaction: any): Promise<void> {
    const dataToSave = (transaction instanceof Transaction) ? transaction.toJSON() : transaction;
    return this.dataSource.save(dataToSave);
  }

  async getAll(): Promise<Transaction[]> {
    const rawData = await this.dataSource.getAll();
    return rawData.map(d => this.hydrate(d)).filter(Boolean) as Transaction[];
  }

  async getByBranchId(branchId: string): Promise<Transaction[]> {
    const rawData = await this.dataSource.getByBranchId(branchId);
    return rawData.map(d => this.hydrate(d)).filter(Boolean) as Transaction[];
  }
}