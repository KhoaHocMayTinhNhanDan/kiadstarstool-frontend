import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type ListStudentsByBranchInput } from './ports/input/ListStudentsByBranch.input';
import { type ListStudentsByBranchOutput } from './ports/output/ListStudentsByBranch.output';

export class ListStudentsByBranchInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: ListStudentsByBranchInput): Promise<Result<ListStudentsByBranchOutput>> {
    const students = await this.studentRepo.getByBranchId(input.branchId);
    return Result.ok(students);
  }
}