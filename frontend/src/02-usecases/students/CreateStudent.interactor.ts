import { Result } from '@/01-entities/shared/base/result';
import { Student } from '@/01-entities/students/Student.entity';
import { Identifier } from '@/01-entities/shared/value-objects/Identifier.vo';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type CreateStudentInput } from './ports/input/CreateStudent.input';
import { type CreateStudentOutput } from './ports/output/CreateStudent.output';

export class CreateStudentInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly branchRepo: IBranchRepository;

  constructor(
    studentRepo: IStudentRepository,
    branchRepo: IBranchRepository
  ) {
    this.studentRepo = studentRepo;
    this.branchRepo = branchRepo;
  }

  async execute(input: CreateStudentInput): Promise<Result<CreateStudentOutput>> {
    // 1. Fetch and validate branch
    const branch = await this.branchRepo.getById(BranchId.create(input.branchId));
    if (!branch) {
      return Result.fail('Không tìm thấy chi nhánh.');
    }
    if (!branch.capacity.hasStudentCapacity()) {
      return Result.fail('Chi nhánh đã đạt sĩ số học viên tối đa.');
    }

    // 2. Create Student entity
    const studentOrError = Student.create({
      id: Identifier.create(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      status: 'active',
      enrollments: [] // Học viên mới chưa có enrollment cụ thể vào lớp nào
    });

    if (studentOrError.isFailure) {
      return Result.fail(studentOrError.getErrorValue());
    }
    const student = studentOrError.getValue();

    // 3. Get updated branch entity by incrementing student count
    const updatedBranchResult = branch.addStudent();
    if (updatedBranchResult.isFailure) {
      return Result.fail(updatedBranchResult.getErrorValue());
    }
    const updatedBranch = updatedBranchResult.getValue();

    // 4. Save both entities in parallel
    await Promise.all([this.studentRepo.save(student), this.branchRepo.save(updatedBranch)]);

    return Result.ok({ studentId: student.id.toString() });
  }
}