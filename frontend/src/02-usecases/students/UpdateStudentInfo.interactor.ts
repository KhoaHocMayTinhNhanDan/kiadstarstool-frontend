import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type UpdateStudentInfoInput } from './ports/input/UpdateStudentInfo.input';

export class UpdateStudentInfoInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: UpdateStudentInfoInput): Promise<Result<void>> {
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) {
      return Result.fail('Student not found');
    }

    student.updateInfo({
      name: input.name,
      email: input.email,
      phone: input.phone,
      dateOfBirth: input.dateOfBirth,
      status: input.status
    });

    await this.studentRepo.save(student);
    return Result.ok();
  }
}