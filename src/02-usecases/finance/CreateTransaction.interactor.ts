import { Result } from '@/01-entities/shared/base/result';
import { Transaction } from '@/01-entities/finance/Transaction.entity';
import { type ITransactionRepository } from './ports/gateways_interface/ITransactionRepository';
import { type CreateTransactionInput } from './ports/input/CreateTransaction.input';
import { type CreateTransactionOutput } from './ports/output/CreateTransaction.output';

export class CreateTransactionInteractor {
  private readonly transactionRepo: ITransactionRepository;

  constructor(transactionRepo: ITransactionRepository) {
    this.transactionRepo = transactionRepo;
  }

  async execute(input: CreateTransactionInput): Promise<Result<CreateTransactionOutput>> {
    try {
      // 1. Tạo Entity từ Input
      const transactionOrError = Transaction.create({
        ...input,
        status: input.status || 'completed' // Mặc định là completed nếu không truyền
      });

      if (transactionOrError.isFailure) {
        return Result.fail<CreateTransactionOutput>(transactionOrError.getErrorValue() as string);
      }

      const transaction = transactionOrError.getValue();

      // 2. Lưu vào Repository
      await this.transactionRepo.save(transaction);

      return Result.ok({ id: transaction.id.toString() });
    } catch (error: any) {
      return Result.fail(`Failed to create transaction: ${error.message}`);
    }
  }
}