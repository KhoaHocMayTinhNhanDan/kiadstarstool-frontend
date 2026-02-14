import { Result } from '@/01-entities/shared/base/result';
import { Attendance } from '@/01-entities/attendance/Attendance.entity';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type MarkBatchAttendanceInput } from './ports/input/MarkBatchAttendance.input';
import { type MarkBatchAttendanceOutput } from './ports/output/MarkBatchAttendance.output';

export class MarkBatchAttendanceInteractor {
  private readonly attendanceRepo: IAttendanceRepository;

  constructor(attendanceRepo: IAttendanceRepository) {
    this.attendanceRepo = attendanceRepo;
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

      return Result.ok({ success: true, updatedCount: count });
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to batch mark attendance');
    }
  }
}