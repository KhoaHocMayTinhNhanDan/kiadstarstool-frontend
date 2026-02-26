import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type EnrollStudentInput } from './ports/input/EnrollStudent.input';
import { Enrollment, ENROLLMENT_DEFAULTS } from '@/01-entities/students/value-objects/Enrollment.vo';

export class EnrollStudentInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly classRepo: IClassRepository;

  constructor(studentRepo: IStudentRepository, classRepo: IClassRepository) {
    this.studentRepo = studentRepo;
    this.classRepo = classRepo;
  }

  async execute(input: EnrollStudentInput): Promise<Result<void>> {
    try {
      // 1. Validate Student & Class
      const student = await this.studentRepo.getById(input.studentId);
      if (!student) {
        return Result.fail('Student not found');
      }

      const classEntity = await this.classRepo.getById(input.classId);
      if (!classEntity) {
        return Result.fail('Class not found');
      }

      // 2. Calculate Prepaid Sessions based on Payment Scheme
      // Logic: Monthly -> 10 sessions, Course -> 30 sessions, Session -> Custom quantity
      let prepaidSessions = 0;
      const quantity = input.quantity && input.quantity > 0 ? input.quantity : 1;

      if (input.paymentScheme === 'monthly') {
        prepaidSessions = ENROLLMENT_DEFAULTS.SESSIONS_PER_MONTH * quantity;
      } else if (input.paymentScheme === 'course') {
        prepaidSessions = ENROLLMENT_DEFAULTS.SESSIONS_PER_COURSE * quantity;
      } else if (input.paymentScheme === 'session') {
        prepaidSessions = quantity;
      }

      // 3. Calculate Tuition Amount (Snapshot for this enrollment)
      let tuitionAmount = 0;
      if (classEntity.tuition) {
        if (input.paymentScheme === 'monthly') {
          tuitionAmount = (classEntity.tuition.monthlyFee || 0) * quantity;
        } else if (input.paymentScheme === 'course') {
          tuitionAmount = (classEntity.tuition.courseFee || 0) * quantity;
        } else if (input.paymentScheme === 'session') {
          tuitionAmount = (classEntity.tuition.sessionFee || 0) * quantity;
        }
      }

      // Apply discount if any
      if (input.discountAmount) {
        tuitionAmount = Math.max(0, tuitionAmount - input.discountAmount);
      }

      // 4. Create Enrollment Value Object
      const enrollmentResult = Enrollment.create({
        branchId: input.branchId,
        classId: input.classId,
        status: 'active',
        joinedDate: input.joinedDate || new Date(),
        tuitionAmount: tuitionAmount,
        paidAmount: 0, // Initially unpaid
        paymentStatus: 'unpaid',
        prepaidSessions: prepaidSessions,
        usedSessions: 0
      });

      if (enrollmentResult.isFailure) {
        return Result.fail(enrollmentResult.getErrorValue());
      }

      // 5. Add to Student & Save
      student.enroll(enrollmentResult.getValue());
      await this.studentRepo.save(student);

      return Result.ok();
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to enroll student');
    }
  }
}