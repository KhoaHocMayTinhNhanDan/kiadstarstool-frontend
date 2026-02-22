import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
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

    let updatedBranch = branch;

    // 2. Cập nhật thông tin cơ bản
    if (input.name && input.code) {
      const updateResult = updatedBranch.updateInfo(input.name, input.code);
      if (updateResult.isFailure) {
        return Result.fail(updateResult.getErrorValue());
      }
      updatedBranch = updateResult.getValue();
    }

    // 3. Cập nhật địa chỉ (nếu có)
    if (input.address) {
      const newAddress = BranchAddress.create(input.address);
      const relocateResult = updatedBranch.relocate(newAddress);
      if (relocateResult.isFailure) return Result.fail(relocateResult.getErrorValue());
      updatedBranch = relocateResult.getValue();
    }

    // 4. Cập nhật sức chứa (nếu có)
    if (input.maxStudents !== undefined || input.totalRooms !== undefined) {
      const newCapacity = BranchCapacity.create({ 
        ...updatedBranch.capacity.props, // Keep existing values
        maxStudents: input.maxStudents ?? updatedBranch.capacity.maxStudents, 
        totalRooms: input.totalRooms ?? updatedBranch.capacity.props.totalRooms
      });
      const capacityResult = updatedBranch.updateCapacity(newCapacity);
      if (capacityResult.isFailure) return Result.fail(capacityResult.getErrorValue());
      updatedBranch = capacityResult.getValue();
    }

    // 5. Cập nhật thông tin tài chính (nếu có)
    if (input.financial) {
      const newFinancial = BranchFinancial.create({
        ...updatedBranch.financial.props, // Keep existing values
        ...input.financial
      });
      const financialResult = updatedBranch.updateFinancial(newFinancial);
      if (financialResult.isFailure) return Result.fail(financialResult.getErrorValue());
      updatedBranch = financialResult.getValue();
    }

    // 6. Cập nhật giờ hoạt động (nếu có)
    if (input.operatingHours) {
      const newHours = BranchOperatingHours.create(input.operatingHours);
      const hoursResult = updatedBranch.updateOperatingHours(newHours);
      if (hoursResult.isFailure) return Result.fail(hoursResult.getErrorValue());
      updatedBranch = hoursResult.getValue();
    }

    // 7. Lưu lại thay đổi
    await this.branchRepo.save(updatedBranch);

    return Result.ok();
  }
}