import { Result } from '@/01-entities/shared/base/result';
import { Attendance } from '@/01-entities/attendance/Attendance.entity';
import { Identifier } from '@/01-entities/shared/Identifier.vo';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type AutoMarkAbsentInput } from './ports/input/AutoMarkAbsent.input';
import { type AutoMarkAbsentOutput } from './ports/output/AutoMarkAbsent.output';

export class AutoMarkAbsentInteractor {
  private readonly attendanceRepo: IAttendanceRepository;
  private readonly classRepo: IClassRepository;
  private readonly studentRepo: IStudentRepository;

  constructor(
    attendanceRepo: IAttendanceRepository,
    classRepo: IClassRepository,
    studentRepo: IStudentRepository
  ) {
    this.attendanceRepo = attendanceRepo;
    this.classRepo = classRepo;
    this.studentRepo = studentRepo;
  }

  async execute(input: AutoMarkAbsentInput): Promise<Result<AutoMarkAbsentOutput>> {
    try {
      // 1. Lấy thông tin lớp học
      const classEntity = await this.classRepo.getById(input.classId);
      if (!classEntity) return Result.fail('Class not found');

      // 2. Lấy tất cả học viên của lớp (Active)
      const allStudents = await this.studentRepo.getByBranchId(classEntity.branchId.toString());
      const classStudents = allStudents.filter(s => 
        s.enrollments.some(e => e.classId === input.classId && e.status === 'active')
      );

      // 3. Lấy danh sách đã điểm danh trong ngày
      const existingAttendances = await this.attendanceRepo.getByClassAndDate(input.classId, input.date);
      const markedStudentIds = new Set(existingAttendances.map(a => a.studentId));

      // 4. Lọc ra những học viên CHƯA được điểm danh
      const unmarkedStudents = classStudents.filter(s => !markedStudentIds.has(s.id.toString()));

      if (unmarkedStudents.length === 0) {
        return Result.ok({ markedCount: 0, studentNames: [] });
      }

      // 5. Tạo bản ghi Vắng mặt cho họ
      const tasks = unmarkedStudents.map(async (student) => {
        const attendance = Attendance.create({
          courseId: input.classId,
          studentId: student.id.toString(),
          date: input.date,
          session: 'default',
          attendanceStatus: ATTENDANCE_STATUS.ABSENT,
          metadata: undefined,
          createdBy: Identifier.create(input.performedBy),
          updatedBy: Identifier.create(input.performedBy)
        });

        // Logic tự động vắng mặt thường không cần checkIn time, hoặc set null
        // attendance.checkIn(); // Không gọi checkIn để time là null

        await this.attendanceRepo.save(attendance);
        
        // Lưu ý: Logic hoàn trả/trừ buổi học (Tuition) thường không áp dụng khi Vắng mặt (trừ khi có quy định phạt)
        // Nếu vắng mặt vẫn trừ tiền thì thêm logic consumeSession ở đây.
      });

      await Promise.all(tasks);

      return Result.ok({
        markedCount: unmarkedStudents.length,
        studentNames: unmarkedStudents.map(s => s.name)
      });

    } catch (error: any) {
      return Result.fail(error.message || 'Failed to auto mark absent');
    }
  }
}