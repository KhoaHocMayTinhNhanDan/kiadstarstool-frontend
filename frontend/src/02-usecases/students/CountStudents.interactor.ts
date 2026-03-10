import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';

export class CountStudentsInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(branchId?: string): Promise<Result<number>> {
    const count = await this.studentRepo.countByBranchId(branchId);
    return Result.ok(count);
  }
}