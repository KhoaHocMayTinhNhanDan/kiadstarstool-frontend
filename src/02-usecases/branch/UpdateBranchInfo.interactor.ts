import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
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

    // 2. Cập nhật thông tin cơ bản
    let updateResult = branch.updateInfo(input.name, input.code);
    if (updateResult.isFailure) {
      return Result.fail(updateResult.getErrorValue());
    }
    let updatedBranch = updateResult.getValue();

    // 3. Cập nhật địa chỉ (nếu có)
    if (input.address) {
      const newAddress = BranchAddress.create(input.address);
      const relocateResult = updatedBranch.relocate(newAddress);
      if (relocateResult.isFailure) return Result.fail(relocateResult.getErrorValue());
      updatedBranch = relocateResult.getValue();
    }

    // 4. Cập nhật sức chứa (nếu có)
    if (input.maxStudents !== undefined) {
      const newCapacity = BranchCapacity.create({ 
        maxStudents: input.maxStudents, 
        currentStudents: updatedBranch.capacity.currentStudents 
      });
      const capacityResult = updatedBranch.updateCapacity(newCapacity);
      if (capacityResult.isFailure) return Result.fail(capacityResult.getErrorValue());
      updatedBranch = capacityResult.getValue();
    }

    // 3. Lưu lại thay đổi
    // updateResult.getValue() trả về bản sao mới của branch (immutable)
    await this.branchRepo.save(updatedBranch);

    return Result.ok();
  }
}