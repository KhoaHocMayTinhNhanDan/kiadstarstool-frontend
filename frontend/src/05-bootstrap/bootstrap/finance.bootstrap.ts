import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import type { TransactionRepository } from '@/03-interface-adapters/gateways/inbound/repositories/TransactionRepository';
import { CreateTransactionInteractor } from '@/02-usecases/finance/CreateTransaction.interactor';
import { ListTransactionsInteractor } from '@/02-usecases/finance/ListTransactions.interactor';
import { CollectTuitionInteractor } from '@/02-usecases/finance/CollectTuition.interactor';
import { FinanceController } from '@/03-interface-adapters/controllers/Finance.controller';

export function bootstrapFinance(
  transactionRepository: TransactionRepository,
  studentRepository: StudentRepository
) {
  const createTransactionInteractor = new CreateTransactionInteractor(transactionRepository, studentRepository);
  const listTransactionsInteractor = new ListTransactionsInteractor(transactionRepository);
  const collectTuitionInteractor = new CollectTuitionInteractor(transactionRepository, studentRepository);

  const financeController = new FinanceController(
    createTransactionInteractor,
    listTransactionsInteractor,
    collectTuitionInteractor
  );

  return {
    financeController,
  };
}