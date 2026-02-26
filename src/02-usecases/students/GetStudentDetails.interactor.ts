import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IAttendanceRepository } from '@/02-usecases/attendance/ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type IUserRepository } from '@/02-usecases/users/ports/gateways_interface/IUserRepository';
import { type GetStudentDetailsInput } from './ports/input/GetStudentDetails.input';
import { type GetStudentDetailsOutput } from './ports/output/GetStudentDetails.output';

export class GetStudentDetailsInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly attendanceRepo: IAttendanceRepository;
  private readonly classRepo: IClassRepository;
  private readonly branchRepo: IBranchRepository;
  private readonly userRepo: IUserRepository;

  constructor(
    studentRepo: IStudentRepository,
    attendanceRepo: IAttendanceRepository,
    classRepo: IClassRepository,
    branchRepo: IBranchRepository,
    userRepo: IUserRepository
  ) {
    this.studentRepo = studentRepo;
    this.attendanceRepo = attendanceRepo;
    this.classRepo = classRepo;
    this.branchRepo = branchRepo;
    this.userRepo = userRepo;
  }

  async execute(input: GetStudentDetailsInput): Promise<Result<GetStudentDetailsOutput>> {
    try {
      // 1. Lấy dữ liệu chính từ các repository
      const student = await this.studentRepo.getById(input.studentId);
      if (!student) {
        return Result.fail('Student not found');
      }

      const [attendances, allDbClasses, allDbBranches] = await Promise.all([
        this.attendanceRepo.getByStudentId(input.studentId),
        this.classRepo.getAll(),
        this.branchRepo.findAll()
      ]);

      const classMap = new Map(allDbClasses.map(c => [c.id.toString(), c.name]));
      const branchMap = new Map(allDbBranches.map(b => [b.id.toString(), b.name]));

      // 2. Thu thập ID của người dùng từ lịch sử điểm danh
      const userIds = new Set<string>();
      attendances.forEach(att => {
        if (att.updatedBy) userIds.add(att.updatedBy.toString());
        else if (att.createdBy) userIds.add(att.createdBy.toString());
      });

      // 3. Dùng UserRepository để lấy thông tin người dùng
      const users = await this.userRepo.getByIds(Array.from(userIds));
      const userMap = new Map(users.map(u => [u.id.toString(), u]));

      // 4. Xây dựng lịch sử điểm danh với tên người thực hiện
      const attendanceHistory = attendances
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sắp xếp mới nhất lên đầu
        .map(att => {
          const performerId = att.updatedBy?.toString() || att.createdBy?.toString() || '';
          const performer = userMap.get(performerId);
          return {
            classId: att.courseId,
            className: classMap.get(att.courseId) || 'Lớp không xác định',
            date: att.date,
            status: att.attendanceStatus,
            score: att.getScore(),
            markedBy: performer?.profile.displayName || 'Hệ thống', // Gán tên người thực hiện từ Profile
            markedByAvatarUrl: performer?.profile.photoURL
          };
        });

      // 5. Xây dựng thông tin chi tiết các lần ghi danh
      const enrollments = student.enrollments.map(e => ({
        branchId: e.branchId,
        classId: e.classId || '',
        status: e.status,
        joinedDate: e.joinedDate.toISOString(),
        endDate: e.endDate?.toISOString(),
        tuitionAmount: e.tuitionAmount,
        paidAmount: e.paidAmount,
        paymentStatus: e.paymentStatus,
        prepaidSessions: e.prepaidSessions,
        usedSessions: e.usedSessions,
      }));

      // Lấy chi nhánh chính từ enrollment active đầu tiên
      const mainBranchId = student.enrollments.find(e => e.status === 'active')?.branchId;

      // 6. Tổng hợp kết quả cuối cùng
      const output: GetStudentDetailsOutput = {
        id: student.id.toString(),
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: student.status,
        joinedDate: student.enrollments[0]?.joinedDate.toISOString() || new Date().toISOString(),
        branchName: mainBranchId ? branchMap.get(mainBranchId) : 'Nhiều chi nhánh',
        enrollments,
        attendanceHistory
      };

      return Result.ok(output);

    } catch (error: any) {
      console.error('[GetStudentDetailsInteractor]', error);
      return Result.fail(error.message || 'Failed to get student details');
    }
  }
}