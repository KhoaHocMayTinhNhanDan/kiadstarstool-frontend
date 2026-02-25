import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type EnrollStudentInput } from './ports/input/EnrollStudent.input';
import { type EnrollStudentOutput } from './ports/output/EnrollStudent.output';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';

export class EnrollStudentInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly classRepo: IClassRepository;

  constructor(studentRepo: IStudentRepository, classRepo: IClassRepository) {
    this.studentRepo = studentRepo;
    this.classRepo = classRepo;
  }

  async execute(input: EnrollStudentInput): Promise<Result<EnrollStudentOutput>> {
    console.log('[EnrollStudentInteractor] START - Input:', JSON.stringify(input, null, 2));

    // 1. Lấy thông tin học viên
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) return Result.fail('Student not found');

    // **[FIX]** Check for duplicate active enrollment
    const isAlreadyEnrolled = student.enrollments.some(
      e => e.classId === input.classId && e.status === 'active'
    );
    if (isAlreadyEnrolled) {
      return Result.fail('Học viên đã được ghi danh vào lớp này rồi.');
    }

    // 2. Lấy thông tin lớp học để biết giá tiền
    const classEntity = await this.classRepo.getById(input.classId);
    if (!classEntity) return Result.fail('Class not found');

    console.log('[EnrollStudentInteractor] Class Tuition Config:', JSON.stringify(classEntity.tuition, null, 2));

    // 3. Tính toán học phí (Logic tự động)
    let calculatedTuition = 0;
    const tuitionConfig = classEntity.tuition;
    let prepaidSessions = 0;
    
    const quantity = input.quantity && input.quantity > 0 ? input.quantity : 1;

    if (tuitionConfig) {
      let scheme = input.paymentScheme;
      if (!scheme) {
        if (tuitionConfig.courseFee !== undefined) scheme = 'course';
        else if (tuitionConfig.monthlyFee !== undefined) scheme = 'monthly';
        else if (tuitionConfig.sessionFee !== undefined) scheme = 'session';
      }
      
      console.log('[EnrollStudentInteractor] Selected Scheme:', scheme);

      switch (scheme) {
        case 'session':
          if (tuitionConfig.sessionFee !== undefined) {
            calculatedTuition = tuitionConfig.sessionFee * quantity;
            prepaidSessions = quantity;
          }
          break;
        case 'monthly':
          if (tuitionConfig.monthlyFee !== undefined) {
            calculatedTuition = tuitionConfig.monthlyFee * quantity;
          }
          break;
        case 'course':
          if (tuitionConfig.courseFee !== undefined) {
            calculatedTuition = tuitionConfig.courseFee;
          }
          break;
      }
    } else {
      console.warn('[EnrollStudentInteractor] No tuition config found for class!');
    }

    if (input.discountAmount) {
      calculatedTuition = Math.max(0, calculatedTuition - input.discountAmount);
    }

    console.log('[EnrollStudentInteractor] Final Calculated Tuition:', calculatedTuition);

    const enrollmentResult = Enrollment.create({
      branchId: input.branchId,
      classId: input.classId,
      status: 'active',
      joinedDate: input.joinedDate || new Date(),
      tuitionAmount: calculatedTuition,
      paidAmount: 0,
      paymentStatus: calculatedTuition > 0 ? 'unpaid' : 'paid',
      prepaidSessions: prepaidSessions,
      usedSessions: 0
    });

    if (enrollmentResult.isFailure) return Result.fail(enrollmentResult.getErrorValue() as string);

    student.enrollments.push(enrollmentResult.getValue());

    await this.studentRepo.save(student);

    return Result.ok({
      tuitionAmount: calculatedTuition,
      paymentStatus: calculatedTuition > 0 ? 'unpaid' : 'paid'
    });
  }
}