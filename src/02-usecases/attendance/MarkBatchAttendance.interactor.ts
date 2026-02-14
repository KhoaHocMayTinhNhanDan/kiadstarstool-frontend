import { Result } from '@/01-entities/shared/base/result';
import { Attendance } from '@/01-entities/attendance/Attendance.entity';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type MarkBatchAttendanceInput } from './ports/input/MarkBatchAttendance.input';
import { type MarkBatchAttendanceOutput } from './ports/output/MarkBatchAttendance.output';

export class MarkBatchAttendanceInteractor {
  private readonly attendanceRepo: IAttendanceRepository;
  private readonly classRepo: IClassRepository;

  constructor(attendanceRepo: IAttendanceRepository, classRepo: IClassRepository) {
    this.attendanceRepo = attendanceRepo;
    this.classRepo = classRepo;
  }

  async execute(input: MarkBatchAttendanceInput): Promise<Result<MarkBatchAttendanceOutput>> {
    try {
      let count = 0;

      // 1. Tối ưu: Lấy tất cả điểm danh hiện có của lớp trong ngày này (1 Query thay vì N Query)
      const existingAttendances = await this.attendanceRepo.getByClassAndDate(input.classId, input.date);
      
      // Tạo Set các studentId đã có điểm danh để tra cứu nhanh O(1)
      const existingStudentIds = new Set(existingAttendances.map(a => a.studentId));

      for (const studentId of input.studentIds) {
        // 2. Chỉ tạo mới nếu chưa tồn tại (Logic hiện tại: Không ghi đè)
        // Nếu muốn ghi đè (Update), cần sửa logic ở đây để lấy entity từ existingAttendances và update
        if (!existingStudentIds.has(studentId)) {
          const attendance = Attendance.create({
            courseId: input.classId,
            studentId: studentId,
            date: input.date,
            session: 'default',
            attendanceStatus: input.status
          });
          
          attendance.checkIn(); // Set giờ check-in mặc định

          // 3. Lưu
          await this.attendanceRepo.save(attendance);
          count++;
        }
      }

      // 4. ĐỒNG BỘ: Tính toán lại sĩ số thực tế
      await this.syncClassStudentCount(input.classId, input.date);

      return Result.ok({ success: true, updatedCount: count });
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to batch mark attendance');
    }
  }

  private async syncClassStudentCount(classId: string, date: string): Promise<void> {
    const dailyAttendance = await this.attendanceRepo.getByClassAndDate(classId, date);
    
    const presentCount = dailyAttendance.filter(a => 
      a.attendanceStatus === ATTENDANCE_STATUS.PRESENT || 
      a.attendanceStatus === ATTENDANCE_STATUS.LATE
    ).length;

    const classEntity = await this.classRepo.getById(classId);
    if (classEntity) {
      (classEntity as any).currentStudents = presentCount;
      await this.classRepo.save(classEntity);
    }
  }
}