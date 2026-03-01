import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type DeleteBranchInput } from './ports/input/DeleteBranch.input';

export class DeleteBranchInteractor {
  private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  async execute(input: DeleteBranchInput): Promise<Result<void>> {
    const branchId = BranchId.create(input.branchId);
    const branch = await this.branchRepo.getById(branchId);

    if (!branch) {
      return Result.fail('Branch not found');
    }

    await this.branchRepo.delete(branchId);
    return Result.ok();
  }
}