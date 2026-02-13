import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type ListClassesByBranchInput } from './ports/input/ListClassesByBranch.input';
import { type ListClassesByBranchOutput } from './ports/output/ListClassesByBranch.output';

export class ListClassesByBranchInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: ListClassesByBranchInput): Promise<Result<ListClassesByBranchOutput>> {
    const classes = await this.classRepo.getByBranchId(BranchId.create(input.branchId));

    const output: ListClassesByBranchOutput = classes.map(cls => ({
      id: cls.id.toString(),
      name: cls.name,
      code: cls.code,
      status: cls.status,
      currentStudents: cls.currentStudents,
      maxStudents: cls.maxStudents,
      startDate: cls.startDate,
      endDate: cls.endDate
    }));

    return Result.ok(output);
  }
}