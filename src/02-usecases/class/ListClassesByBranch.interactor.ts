import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type ListClassesByBranchOutput } from './ports/output/ListClassesByBranch.output';

export class ListClassesByBranchInteractor {
  private readonly classRepo: IClassRepository;
  private readonly studentRepo: IStudentRepository;

  constructor(classRepo: IClassRepository, studentRepo: IStudentRepository) {
    this.classRepo = classRepo;
    this.studentRepo = studentRepo;
  }

  async execute(input: any): Promise<Result<ListClassesByBranchOutput>> {
    // Handle both string and object input (DTO) to be robust against Controller implementation
    const branchId = typeof input === 'object' ? input?.branchId || '' : input || '';

    // 1. Lấy danh sách lớp học
    const classes = await this.classRepo.getByBranchId(branchId);
    
    // 2. Lấy danh sách học viên (để tính toán sĩ số thực tế)
    // Nếu branchId rỗng (lấy tất cả), ta cũng lấy tất cả học viên để đếm
    const students = await this.studentRepo.getByBranchId(branchId);

    // 3. Map sang DTO và tính toán sĩ số
    const output = classes.map(cls => {
      const classId = cls.id.toString();
      
      // Đếm số học viên đang active trong lớp này
      const activeStudentCount = students.filter(s => 
        s.enrollments.some(e => e.classId === classId && e.status === 'active')
      ).length;

      return {
        id: cls.id.toString(),
        name: cls.name,
        code: cls.code,
        branchId: cls.branchId.toString(),
        currentStudents: activeStudentCount, // Dữ liệu thực tế từ StudentRepo
        maxStudents: cls.maxStudents,
        status: cls.status,
        schedule: cls.schedule,
        teacherName: cls.teacherName || 'Chưa phân công',
        startDate: cls.startDate,
        endDate: cls.endDate
      };
    });

    return Result.ok(output);
  }
}