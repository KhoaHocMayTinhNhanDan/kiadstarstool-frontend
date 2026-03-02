import { Result } from '@/01-entities/shared/base/result';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type ListBranchesOutput } from './ports/output/ListBranches.output';
import type { WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

export class ListBranchesInteractor {
  private readonly branchRepo: IBranchRepository;
  private readonly studentRepo: IStudentRepository;

  constructor(branchRepo: IBranchRepository, studentRepo: IStudentRepository) {
    this.branchRepo = branchRepo;
    this.studentRepo = studentRepo;
  }

  async execute(input: any): Promise<Result<ListBranchesOutput>> {
    // 1. Lấy tất cả chi nhánh
    const branches = await this.branchRepo.findAll();

    // 2. Map sang DTO và tính toán số lượng học viên thực tế
    const output = await Promise.all(branches.map(async (branch) => {
      const branchId = branch.id.toString();
      
      // Lấy danh sách học viên thuộc chi nhánh này từ StudentRepo
      // (Repo này sẽ gọi xuống MockStudentDataSource để lấy dữ liệu thật)
      const students = await this.studentRepo.getByBranchId(branchId);
      
      // Đếm số học viên đang hoạt động (Active)
      const activeStudentCount = students.filter(s => s.status === 'active').length;

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
    }));

    return Result.ok(output);
  }
}