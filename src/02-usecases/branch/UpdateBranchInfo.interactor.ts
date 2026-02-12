import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type UpdateBranchInfoInput } from './ports/input/UpdateBranchInfo.input';

export class UpdateBranchInfoInteractor {
  private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  async execute(input: UpdateBranchInfoInput): Promise<Result<void>> {
    // 1. Lấy Entity từ Repository
    const branch = await this.branchRepo.getById(BranchId.create(input.branchId));
    if (!branch) {
      return Result.fail('Branch not found');
    }

    // 2. Gọi phương thức nghiệp vụ của Entity
    // Lưu ý: Entity sẽ tự validate name và code
    const updateResult = branch.updateInfo(input.name, input.code);
    if (updateResult.isFailure) {
      return Result.fail(updateResult.getErrorValue());
    }

    // 3. Lưu lại thay đổi
    // updateResult.getValue() trả về bản sao mới của branch (immutable)
    await this.branchRepo.save(updateResult.getValue());

    return Result.ok();
  }
}