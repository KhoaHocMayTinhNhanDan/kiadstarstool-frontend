import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type IAttendanceRepository } from '@/02-usecases/attendance/ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type GetStudentDetailsInput } from './ports/input/GetStudentDetails.input';
import { type GetStudentDetailsOutput } from './ports/output/GetStudentDetails.output';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';

export class GetStudentDetailsInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly branchRepo: IBranchRepository;
  private readonly attendanceRepo: IAttendanceRepository;
  private readonly classRepo: IClassRepository;
  constructor(
      studentRepo: IStudentRepository,
    branchRepo: IBranchRepository,
    attendanceRepo: IAttendanceRepository,
    classRepo: IClassRepository
  ) {
    this.studentRepo = studentRepo;
    this.branchRepo = branchRepo;
    this.attendanceRepo = attendanceRepo;
    this.classRepo = classRepo;
  }

  async execute(input: GetStudentDetailsInput): Promise<Result<GetStudentDetailsOutput>> {
    // 1. Get Student Info
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) {
      return Result.fail('Student not found');
    }

    // 2. Get Branch Info
    // FIX: Lấy branchId từ danh sách enrollments (ưu tiên active) thay vì student.branchId
    const activeEnrollment = student.enrollments.find((e: any) => e.status === 'active') || student.enrollments[0];
    let branchName = 'N/A';

    if (activeEnrollment) {
      const branch = await this.branchRepo.getById(BranchId.create(activeEnrollment.branchId.toString()));
      if (branch) branchName = branch.name;
    }

    // 3. Get Attendance History
    const attendanceRecords = await this.attendanceRepo.getByStudentId(input.studentId);

    // 4. Get Class names for history
    const classIds = [...new Set(attendanceRecords.map(a => a.courseId))];
    const classes = await Promise.all(classIds.map(id => this.classRepo.getById(id)));
    const classNameMap = new Map(classes.filter(c => c).map(c => [c!.id.toString(), c!.name]));

    // 5. Combine and return DTO
    const output: GetStudentDetailsOutput = {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      phone: student.phone,
      status: student.status,
      joinedDate: activeEnrollment ? activeEnrollment.joinedDate : new Date(),
      branchName: branchName,
      attendanceHistory: attendanceRecords.map(att => ({
        classId: att.courseId,
        className: classNameMap.get(att.courseId) || 'Unknown Class',
        date: att.date,
        status: att.attendanceStatus,
        score: att.getScore(),
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), // Sort by most recent
    };

    return Result.ok(output);
  }
}