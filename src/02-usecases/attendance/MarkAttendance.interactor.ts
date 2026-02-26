import { Result } from '../../01-entities/shared/base/result';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { AttendanceMetadata } from '@/01-entities/attendance/value-objects/AttendanceMetadata.vo';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '../class/ports/gateways_interface/IClassRepository';
import { type IStudentRepository } from '../students/ports/gateways_interface/IStudentRepository';
import { Attendance } from '../../01-entities/attendance/Attendance.entity';
import { type MarkAttendanceInput } from './ports/input/MarkAttendance.input';

export class MarkAttendanceInteractor {
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

  async execute(input: MarkAttendanceInput): Promise<Result<void>> {
    try {
      // 1. Validate Class & Student existence
      const classEntity = await this.classRepo.getById(input.classId);
      if (!classEntity) return Result.fail('Class not found');

      const studentEntity = await this.studentRepo.getById(input.studentId);
      if (!studentEntity) return Result.fail('Student not found');

      // 2. Check existing attendance to decide Update or Create
      const existingAttendance = await this.attendanceRepo.getByStudentAndDate(input.studentId, input.classId, input.date);
      const oldStatus = existingAttendance ? existingAttendance.attendanceStatus : null;

      // Create new entity but preserve ID if it existed (to perform Update instead of Insert)
      const attendance = Attendance.create({
        id: existingAttendance?.id, // Quan trọng: Giữ nguyên ID nếu đã tồn tại để Repository thực hiện Update
        courseId: input.classId,
        studentId: input.studentId,
        date: input.date, // Entity expects string (ISO format)
        session: 'default', // Default session if not provided
        attendanceStatus: input.status,
        metadata: input.note ? AttendanceMetadata.empty().withAbsentReason(input.note) : undefined
      });

      await this.attendanceRepo.save(attendance);

      // 3. Handle Tuition Deduction (Consume or Refund Session)
      // Logic: 
      // - Nếu chuyển từ Vắng/Chưa có -> Có mặt: Trừ 1 buổi
      // - Nếu chuyển từ Có mặt -> Vắng: Cộng lại 1 buổi (Hoàn tác)
      // - Nếu chuyển từ Có mặt -> Muộn (hoặc ngược lại): Không đổi
      
      const isTuitionClass = !!classEntity.tuition && (
        !!classEntity.tuition.sessionFee || 
        !!classEntity.tuition.monthlyFee || 
        !!classEntity.tuition.courseFee
      );

      if (isTuitionClass) {
        const wasPresent = oldStatus === ATTENDANCE_STATUS.PRESENT || oldStatus === ATTENDANCE_STATUS.LATE;
        const isNowPresent = input.status === ATTENDANCE_STATUS.PRESENT || input.status === ATTENDANCE_STATUS.LATE;

        // Tìm enrollment active của học viên trong lớp này
        const enrollmentIndex = studentEntity.enrollments.findIndex(
          e => e.classId === input.classId && e.status === 'active'
        );

        if (enrollmentIndex !== -1) {
          const currentEnrollment = studentEntity.enrollments[enrollmentIndex];
          let updatedEnrollmentResult;
          
          if (!wasPresent && isNowPresent) {
            // Chưa đi -> Đi: Trừ buổi
            updatedEnrollmentResult = currentEnrollment.consumeSession();
          } else if (wasPresent && !isNowPresent) {
            // Đang đi -> Nghỉ: Hoàn lại buổi
            updatedEnrollmentResult = currentEnrollment.refundSession();
          }
          
          if (updatedEnrollmentResult && updatedEnrollmentResult.isSuccess) {
            studentEntity.enrollments[enrollmentIndex] = updatedEnrollmentResult.getValue();
            // Lưu thay đổi của học viên (số buổi đã học tăng lên)
            await this.studentRepo.save(studentEntity);
          }
        }
      }

      return Result.ok();
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to mark attendance');
    }
  }
}