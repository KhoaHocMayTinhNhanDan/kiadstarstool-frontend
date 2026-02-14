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

      // Xử lý tuần tự (hoặc song song tùy DB support)
      for (const studentId of input.studentIds) {
        // 1. Kiểm tra xem đã có chưa để tránh duplicate
        const existing = await this.attendanceRepo.getByStudentAndDate(
          studentId,
          input.classId,
          input.date
        );

        if (!existing) {
          // 2. Tạo mới
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