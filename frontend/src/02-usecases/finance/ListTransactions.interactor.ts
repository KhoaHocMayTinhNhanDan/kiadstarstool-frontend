import { Result } from '@/01-entities/shared/base/result';
import { type ITransactionRepository } from './ports/gateways_interface/ITransactionRepository';
import { type ListTransactionsInput } from './ports/input/ListTransactions.input';
import { type ListTransactionsOutput } from './ports/output/ListTransactions.output';

export class ListTransactionsInteractor {
  private readonly transactionRepo: ITransactionRepository;

  constructor(transactionRepo: ITransactionRepository) {
    this.transactionRepo = transactionRepo;
  }

  async execute(input: ListTransactionsInput): Promise<Result<ListTransactionsOutput>> {
    try {
      const transactions = input.branchId 
        ? await this.transactionRepo.getByBranchId(input.branchId)
        : await this.transactionRepo.getAll();

      const output: ListTransactionsOutput = transactions.map(t => ({
        id: t.id.toString(),
        code: t.code,
        branchId: t.branchId,
        type: t.type,
        amount: t.amount,
        method: t.method,
        status: t.status,
        date: t.transactionDate.toISOString(),
        description: t.description,
        performedBy: t.performedBy
      }));

      return Result.ok(output);
    } catch (error: any) {
      return Result.fail(`Failed to list transactions: ${error.message}`);
    }
  }
}