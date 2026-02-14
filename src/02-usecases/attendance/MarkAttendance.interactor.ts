import { Result } from '@/01-entities/shared/base/result';
import { Attendance } from '@/01-entities/attendance/Attendance.entity';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type MarkAttendanceInput } from './ports/input/MarkAttendance.input';
import { type MarkAttendanceOutput } from './ports/output/MarkAttendance.output';

export class MarkAttendanceInteractor {

  private readonly attendanceRepo: IAttendanceRepository;

  constructor(attendanceRepo: IAttendanceRepository) {
    this.attendanceRepo = attendanceRepo;
  }

  async execute(input: MarkAttendanceInput): Promise<Result<MarkAttendanceOutput>> {
    try {
      // 1. Tìm bản ghi điểm danh hiện có
      let attendance = await this.attendanceRepo.getByStudentAndDate(
        input.studentId,
        input.classId,
        input.date
      );

      // 2. Nếu chưa có, tạo mới
      if (!attendance) {
        attendance = Attendance.create({
          courseId: input.classId,
          studentId: input.studentId,
          date: input.date,
          session: 'default', // Có thể mở rộng input để nhận session
          attendanceStatus: input.status
        });
      }

      // 3. Cập nhật trạng thái
      // Sử dụng các phương thức domain của Entity để đảm bảo tính toàn vẹn
      if (input.status === ATTENDANCE_STATUS.ABSENT || input.status === ATTENDANCE_STATUS.EXCUSED) {
        attendance.markAbsent(input.note, input.status === ATTENDANCE_STATUS.EXCUSED);
      } else if (input.status === ATTENDANCE_STATUS.LATE) {
        // Nếu đánh dấu trễ thủ công, ta vẫn check-in nhưng set status là Late
        attendance.checkIn(); 
        attendance.withStatus(ATTENDANCE_STATUS.LATE);
      } else {
        // Present
        attendance.checkIn();
        attendance.withStatus(ATTENDANCE_STATUS.PRESENT);
      }

      // 4. Lưu
      await this.attendanceRepo.save(attendance);

      return Result.ok({ success: true, attendanceId: attendance.id.toString() });
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to mark attendance');
    }
  }
}