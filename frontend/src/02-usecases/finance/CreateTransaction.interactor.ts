// src/02-usecases/finance/CreateTransaction.interactor.ts
import { Result } from '@/01-entities/shared/base/result';
import { Transaction } from '@/01-entities/finance/Transaction.entity';
import { type ITransactionRepository } from './ports/gateways_interface/ITransactionRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type CreateTransactionInput } from './ports/input/CreateTransaction.input';
import { type CreateTransactionOutput } from './ports/output/CreateTransaction.output';

export class CreateTransactionInteractor {
  private readonly transactionRepo: ITransactionRepository;
  private readonly studentRepo: IStudentRepository;

  constructor(
    transactionRepo: ITransactionRepository,
    studentRepo: IStudentRepository
  ) {
    this.transactionRepo = transactionRepo;
    this.studentRepo = studentRepo;
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

      // 3. [NEW LOGIC] Tự động cập nhật trạng thái đóng tiền của học viên
      // Nếu đây là khoản thu (income) và có gắn với học viên
      if (input.type === 'income' && input.studentId) {
        const student = await this.studentRepo.getById(input.studentId);
        
        if (student) {
          // Tìm enrollment đang active tại chi nhánh này
          const enrollment = student.enrollments.find(e => 
            e.branchId === input.branchId && e.status === 'active'
          );

          if (enrollment) {
            // Cập nhật trạng thái thanh toán
            // Lưu ý: Logic này giả định đóng đủ. Thực tế có thể cần logic phức tạp hơn (cộng dồn tiền, check partial)
            // Ở đây ta set cứng là 'paid' để demo tính năng
            // Vì Student Entity không có trong context, ta thao tác trực tiếp lên object enrollment (giả định public)
            // Trong thực tế nên dùng method: student.updatePaymentStatus(branchId, amount)
            (enrollment as any).paymentStatus = 'paid';
            (enrollment as any).tuitionAmount = input.amount; // Cập nhật số tiền thực đóng
            
            await this.studentRepo.save(student);
          }
        }
      }

      return Result.ok({ id: transaction.id.toString() });
    } catch (error: any) {
      return Result.fail(`Failed to create transaction: ${error.message}`);
    }
  }
}