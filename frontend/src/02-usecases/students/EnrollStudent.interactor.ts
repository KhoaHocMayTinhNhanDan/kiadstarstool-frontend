import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type EnrollStudentInput } from './ports/input/EnrollStudent.input';
import { type EnrollStudentOutput } from './ports/output/EnrollStudent.output';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';

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

    // 3. Create the new enrollment value object
    const enrollmentResult = Enrollment.create({
      branchId: classEntity.branchId.toString(),
      classId: classEntity.id.toString(),
      status: 'active',
      joinedDate: new Date(),
      tuitionAmount: input.tuitionDetails?.amount,
      paymentStatus: input.tuitionDetails?.paymentStatus,
      paidAmount: input.tuitionDetails?.paidAmount,
    });

    if (enrollmentResult.isFailure) {
      return Result.fail(enrollmentResult.getErrorValue());
    }

    // 4. Use domain methods to get the updated entities
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

    // 5. Persist all changes
    await Promise.all([
      this.studentRepo.save(updatedStudent),
      this.classRepo.update(updatedClass),
      this.branchRepo.save(updatedBranch),
    ]);

    return Result.ok({ success: true });
  }
}