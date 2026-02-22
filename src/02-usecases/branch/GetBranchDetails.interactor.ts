import { Result } from '@/01-entities/shared/base/result';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type GetBranchDetailsInput } from './ports/input/GetBranchDetails.input';
import { type GetBranchDetailsOutput, type WeeklyOperatingHours } from './ports/output/GetBranchDetails.output';

export class GetBranchDetailsInteractor {
  private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  async execute(input: GetBranchDetailsInput): Promise<Result<GetBranchDetailsOutput>> {
    const branch = await this.branchRepo.getById(BranchId.create(input.branchId));
    
    if (!branch) {
      return Result.fail('Branch not found');
    }

    // Map Entity sang DTO (Data Transfer Object) để trả về cho UI
    // Việc này giúp tách biệt Domain Model khỏi View Model
    const output: GetBranchDetailsOutput = {
      id: branch.id.toString(),
      name: branch.name,
      code: branch.code,
      address: branch.address.fullAddress, // Sử dụng getter để có địa chỉ đầy đủ
      street: branch.address.props.street || '',
      ward: branch.address.props.ward || '',
      district: branch.address.props.district || '',
      city: branch.address.props.city || '',
      isActive: branch.isActive,
      capacity: {
        current: branch.capacity.currentStudents,
        max: branch.capacity.maxStudents,
        totalRooms: branch.capacity.props.totalRooms
      },
      financial: branch.financial.props,
      // Pass the entire operating hours object
      operatingHours: branch.operatingHours.props as WeeklyOperatingHours,
      updatedAt: branch.updatedAt,
    };

    return Result.ok(output);
  }
}