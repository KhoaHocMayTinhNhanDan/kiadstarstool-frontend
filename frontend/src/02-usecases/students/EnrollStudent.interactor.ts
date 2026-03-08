import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type EnrollStudentInput } from './ports/input/EnrollStudent.input';
import { type EnrollStudentOutput } from './ports/output/EnrollStudent.output';
import { db, writeBatch } from '@/shared/config/firebase'; // Import db và writeBatch
import { Enrollment, ENROLLMENT_DEFAULTS } from '@/01-entities/students/value-objects/Enrollment.vo';

export class EnrollStudentInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly classRepo: IClassRepository;
  private readonly branchRepo: IBranchRepository;

  constructor(studentRepo: IStudentRepository, classRepo: IClassRepository, branchRepo: IBranchRepository) {
    this.studentRepo = studentRepo;
    this.classRepo = classRepo;
    this.branchRepo = branchRepo;
  }

  async execute(input: EnrollStudentInput): Promise<Result<EnrollStudentOutput>> {
    // 1. Fetch all necessary entities in parallel
    const [student, classEntity] = await Promise.all([
      this.studentRepo.getById(input.studentId),
      this.classRepo.getById(input.classId),
    ]);

    if (!student) {
      return Result.fail('Không tìm thấy học viên.');
    }
    if (!classEntity) {
      return Result.fail('Không tìm thấy lớp học.');
    }

    // 2. Perform business rule validations
    // This check is now also inside the `addEnrollment` domain method, but checking early here provides a clearer error message.
    const isAlreadyEnrolled = student.enrollments.some(
      e => e.classId === input.classId && e.status === 'active'
    );
    if (isAlreadyEnrolled) {
      return Result.fail('Học viên đã được ghi danh vào lớp này rồi.');
    }
    // Use the new domain method
    if (!classEntity.hasCapacity()) {
      return Result.fail('Lớp học đã đủ sĩ số.');
    }
    
    const branch = await this.branchRepo.getById(classEntity.branchId);
    if (!branch) {
      return Result.fail(`Data integrity error: Branch ${classEntity.branchId.toString()} not found.`);
    }
    if (!branch.capacity.hasStudentCapacity()) {
        return Result.fail('Chi nhánh đã đạt sĩ số học viên tối đa.');
    }

    // 3. Calculate Tuition & Sessions based on Class Config & Input
    let calculatedTuition = 0;
    let prepaidSessions = 0;
    const tuitionConfig = classEntity.tuition;

    if (input.paymentScheme === 'course') {
      calculatedTuition = tuitionConfig?.courseFee || 0;
      prepaidSessions = ENROLLMENT_DEFAULTS.SESSIONS_PER_COURSE;
    } else if (input.paymentScheme === 'monthly') {
      calculatedTuition = (tuitionConfig?.monthlyFee || 0) * (input.quantity || 1);
      prepaidSessions = ENROLLMENT_DEFAULTS.SESSIONS_PER_MONTH * (input.quantity || 1);
    } else if (input.paymentScheme === 'session') {
      calculatedTuition = (tuitionConfig?.sessionFee || 0) * (input.quantity || 1);
      prepaidSessions = (input.quantity || 0);
    }

    if (input.discountAmount) {
      calculatedTuition = Math.max(0, calculatedTuition - input.discountAmount);
    }

    // 4. Create the new enrollment value object
    const enrollmentResult = Enrollment.create({
      branchId: classEntity.branchId.toString(),
      classId: classEntity.id.toString(),
      status: 'active',
      joinedDate: input.joinedDate || new Date(),
      tuitionAmount: calculatedTuition,
      paymentStatus: 'unpaid', // Mặc định là chưa thanh toán khi mới ghi danh
      paidAmount: 0,
      prepaidSessions: prepaidSessions,
      usedSessions: 0
    });

    if (enrollmentResult.isFailure) {
      return Result.fail(enrollmentResult.getErrorValue());
    }

    // 5. Use domain methods to get the updated entities
    const newEnrollment = enrollmentResult.getValue();

    const updatedStudentResult = student.addEnrollment(newEnrollment);
    if (updatedStudentResult.isFailure) {
      return Result.fail(updatedStudentResult.getErrorValue());
    }
    const updatedStudent = updatedStudentResult.getValue();

    const updatedClassResult = classEntity.addStudent();
    if (updatedClassResult.isFailure) {
      return Result.fail(updatedClassResult.getErrorValue());
    }
    const updatedClass = updatedClassResult.getValue();

    const updatedBranchResult = branch.addStudent();
    if (updatedBranchResult.isFailure) {
      return Result.fail(updatedBranchResult.getErrorValue());
    }
    const updatedBranch = updatedBranchResult.getValue();

    // 6. Persist all changes using a Firestore batch write
    const batch = writeBatch(db);

    this.studentRepo.saveInBatch(updatedStudent, batch);
    this.classRepo.updateInBatch(updatedClass, batch);
    this.branchRepo.saveInBatch(updatedBranch, batch);

    await batch.commit(); // Commit the atomic transaction

    return Result.ok({ success: true });
  }
}