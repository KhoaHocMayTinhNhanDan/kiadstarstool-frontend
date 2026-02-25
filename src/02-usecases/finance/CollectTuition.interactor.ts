import { Result } from '@/01-entities/shared/base/result';
import { type ITransactionRepository } from './ports/gateways_interface/ITransactionRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type CollectTuitionInput } from './ports/input/CollectTuition.input';
import { type CollectTuitionOutput } from './ports/output/CollectTuition.output';
import { Transaction } from '@/01-entities/finance/Transaction.entity';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';

export class CollectTuitionInteractor {
  private readonly transactionRepo: ITransactionRepository;
  private readonly studentRepo: IStudentRepository;

  constructor(
    transactionRepo: ITransactionRepository,
    studentRepo: IStudentRepository
  ) {
    this.transactionRepo = transactionRepo;
    this.studentRepo = studentRepo;
  }

  async execute(input: CollectTuitionInput): Promise<Result<CollectTuitionOutput>> {
    // 1. Validate: Tìm học viên và Enrollment tương ứng
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) return Result.fail('Student not found');

    const enrollmentIndex = student.enrollments.findIndex(e => 
      e.branchId === input.branchId && e.classId === input.classId
    );
    if (enrollmentIndex === -1) return Result.fail('Enrollment not found');
    
    const enrollment = student.enrollments[enrollmentIndex];

    // 2. Tạo Transaction (Ghi nhận dòng tiền)
    const transactionOrError = Transaction.create({
      branchId: input.branchId,
      code: `TRX-${Date.now()}`, // Trong thực tế nên dùng UUID hoặc sequence
      type: 'income',
      amount: input.amount,
      method: input.method,
      transactionDate: input.transactionDate,
      status: 'completed',
      studentId: input.studentId,
      performedBy: input.performedBy,
      description: input.description || `Thu học phí lớp ${input.classId}`
    });

    if (transactionOrError.isFailure) {
      return Result.fail(transactionOrError.getErrorValue() as string);
    }
    const transaction = transactionOrError.getValue();
    await this.transactionRepo.save(transaction);

    // 3. Cập nhật trạng thái thanh toán trong Enrollment
    const currentPaid = enrollment.paidAmount || 0;
    const newPaid = currentPaid + input.amount;
    const totalTuition = enrollment.tuitionAmount || 0;
    
    let newStatus = enrollment.paymentStatus;
    if (newPaid >= totalTuition && totalTuition > 0) {
      newStatus = 'paid';
    } else if (newPaid > 0) {
      newStatus = 'partial';
    }

    // Tạo Enrollment mới với thông tin đã cập nhật (vì VO là immutable)
    const updatedEnrollmentResult = Enrollment.create({
      ...enrollment.props,
      paidAmount: newPaid,
      paymentStatus: newStatus
    });

    if (updatedEnrollmentResult.isSuccess) {
      // Cập nhật lại danh sách enrollments của student
      student.enrollments[enrollmentIndex] = updatedEnrollmentResult.getValue();
      await this.studentRepo.save(student);
    }

    return Result.ok({
      transactionId: transaction.id.toString(),
      updatedPaymentStatus: newStatus || 'unpaid'
    });
  }
}
