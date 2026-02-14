import { Result } from '@/01-entities/shared/base/result';
import { Student } from '@/01-entities/students/Student.entity';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type CreateStudentInput } from './ports/input/CreateStudent.input';

export class CreateStudentInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: CreateStudentInput): Promise<Result<void>> {
    const studentOrError = Student.create({
      branchId: input.branchId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      status: 'active',
      joinedDate: new Date()
    });

    if (studentOrError.isFailure) {
      return Result.fail(studentOrError.getErrorValue());
    }

    await this.studentRepo.save(studentOrError.getValue());
    return Result.ok();
  }
}