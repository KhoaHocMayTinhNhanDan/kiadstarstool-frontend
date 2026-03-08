import { Result } from '@/01-entities/shared/base/result';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type ListBranchesOutput } from './ports/output/ListBranches.output';
import type { WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';

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

    // 2. Lấy số lượng học viên thực tế cho mỗi chi nhánh
    // Chạy các promise song song để cải thiện hiệu năng so với vòng lặp tuần tự
    const outputPromises = branches.map(async (branch) => {
      const branchId = branch.id.toString();

      // Lấy danh sách học viên của chi nhánh và đếm số học viên đang hoạt động
      // Lưu ý: Đây là N+1 query, có thể chậm nếu có nhiều chi nhánh.
      // Một giải pháp tối ưu hơn là tạo một method trong repository để đếm hoặc lấy tất cả học viên một lần.
      const students = await this.studentRepo.getByBranchId(branchId);
      const activeStudentCount = students.filter(s => s.status === 'active').length;

      return {
        id: branchId,
        name: branch.name,
        code: branch.code,
        address: branch.address.fullAddress,
        isActive: branch.isActive,
        studentCount: activeStudentCount, // Dữ liệu thực tế
        capacity: {
          current: activeStudentCount,
          max: branch.capacity.maxStudents
        },
        operatingHours: branch.operatingHours.props as WeeklyOperatingHours,
        updatedAt: branch.updatedAt
      };
    });

    const output = await Promise.all(outputPromises);

    return Result.ok(output);
  }
}