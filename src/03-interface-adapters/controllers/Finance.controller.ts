import { Result } from '@/01-entities/shared/base/result';
import { CreateTransactionInteractor } from '@/02-usecases/finance/CreateTransaction.interactor';
import { ListTransactionsInteractor } from '@/02-usecases/finance/ListTransactions.interactor';
import { type CreateTransactionInput } from '@/02-usecases/finance/ports/input/CreateTransaction.input';
import { type CreateTransactionOutput } from '@/02-usecases/finance/ports/output/CreateTransaction.output';
import { type ListTransactionsInput } from '@/02-usecases/finance/ports/input/ListTransactions.input';
import { type ListTransactionsOutput } from '@/02-usecases/finance/ports/output/ListTransactions.output';

export class FinanceController {
  private readonly createTransactionInteractor: CreateTransactionInteractor;
  private readonly listTransactionsInteractor: ListTransactionsInteractor;

  constructor(
    createTransactionInteractor: CreateTransactionInteractor,
    listTransactionsInteractor: ListTransactionsInteractor
  ) {
    this.createTransactionInteractor = createTransactionInteractor;
    this.listTransactionsInteractor = listTransactionsInteractor;
  }

  async createTransaction(input: CreateTransactionInput): Promise<Result<CreateTransactionOutput>> {
    try {
      return await this.createTransactionInteractor.execute(input);
    } catch (error: any) {
      console.error('[FinanceController] CreateTransaction unexpected error:', error);
      return Result.fail('An unexpected error occurred');
    }
  }

  async listTransactions(input: ListTransactionsInput): Promise<Result<ListTransactionsOutput>> {
    try {
      return await this.listTransactionsInteractor.execute(input);
    } catch (error: any) {
      return Result.fail('An unexpected error occurred');
    }
  }
}