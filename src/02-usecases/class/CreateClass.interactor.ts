import { Result } from '@/01-entities/shared/base/result';
import { Class } from '@/01-entities/classes/Class.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type CreateClassInput } from './ports/input/CreateClass.input';

export class CreateClassInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: CreateClassInput): Promise<Result<void>> {
    // 1. Tạo Entity Class
    const classOrError = Class.create({
      branchId: BranchId.create(input.branchId),
      name: input.name,
      code: input.code,
      maxStudents: input.maxStudents,
      status: input.status,
      currentStudents: 0
    });

    if (classOrError.isFailure) {
      return Result.fail(classOrError.getErrorValue());
    }

    // 2. Lưu vào Repository
    await this.classRepo.save(classOrError.getValue());

    return Result.ok();
  }
}