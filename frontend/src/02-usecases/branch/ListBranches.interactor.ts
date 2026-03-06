import { Result } from '@/01-entities/shared/base/result';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type ListBranchesOutput } from './ports/output/ListBranches.output';
import type { WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

export class ListBranchesInteractor {
  private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  async execute(input: any): Promise<Result<ListBranchesOutput>> {
    // 1. Lấy tất cả chi nhánh
    const branches = await this.branchRepo.findAll();

    // 2. Map sang DTO (Sử dụng dữ liệu có sẵn trong Branch Entity, không query thêm)
    const output = branches.map((branch) => {
      const branchId = branch.id.toString();
      const activeStudentCount = branch.capacity.currentStudents;

      return {
        id: branchId,
        name: branch.name,
        code: branch.code,
        address: branch.address.fullAddress,
        isActive: branch.isActive,
        studentCount: activeStudentCount, // Dữ liệu thực tế đã được tính toán
        capacity: {
          current: activeStudentCount,
          max: branch.capacity.maxStudents
        },
        operatingHours: branch.operatingHours.props as WeeklyOperatingHours,
        updatedAt: branch.updatedAt
      };
    });

    return Result.ok(output);
  }
}