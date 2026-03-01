import { Result } from '@/01-entities/shared/base/result';
import { Student } from '@/01-entities/students/Student.entity';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type CreateStudentInput } from './ports/input/CreateStudent.input';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';

export class CreateStudentInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: CreateStudentInput): Promise<Result<void>> {
    // Tạo một enrollment ban đầu chỉ với thông tin chi nhánh
    const initialEnrollmentResult = Enrollment.create({
      branchId: input.branchId,
      status: 'active',
      joinedDate: new Date(),
      paymentStatus: 'waived' // Chưa có lớp, chưa có học phí
    });

    if (initialEnrollmentResult.isFailure) {
      return Result.fail(initialEnrollmentResult.getErrorValue());
    }

    const studentOrError = Student.create({
      name: input.name,
      email: input.email,
      phone: input.phone,
      status: 'active',
      enrollments: [initialEnrollmentResult.getValue()]
    });

    if (studentOrError.isFailure) {
      return Result.fail(studentOrError.getErrorValue());
    }

    await this.studentRepo.save(studentOrError.getValue());
    return Result.ok();
  }
}