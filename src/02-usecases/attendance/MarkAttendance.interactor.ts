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

      // 2. Create/Update Attendance Record
      // Note: In a real app, we might check if attendance already exists for this date/student/class
      const attendance = Attendance.create({
        courseId: input.classId, // Mapping classId to courseId as per Attendance Entity definition usually
        studentId: input.studentId,
        date: input.date, // Entity expects string (ISO format)
        session: 'default', // Default session if not provided
        attendanceStatus: input.status,
        metadata: input.note ? AttendanceMetadata.empty().withAbsentReason(input.note) : undefined
      });

      await this.attendanceRepo.save(attendance);

      // 3. Handle Tuition Deduction (Consume Session)
      // Chỉ trừ buổi nếu học viên có đi học (present/late) và lớp thu tiền theo buổi
      const isPresent = input.status === ATTENDANCE_STATUS.PRESENT || input.status === ATTENDANCE_STATUS.LATE;
      const isPerSessionClass = !!classEntity.tuition?.sessionFee;

      if (isPresent && isPerSessionClass) {
        // Tìm enrollment active của học viên trong lớp này
        const enrollmentIndex = studentEntity.enrollments.findIndex(
          e => e.classId === input.classId && e.status === 'active'
        );

        if (enrollmentIndex !== -1) {
          const currentEnrollment = studentEntity.enrollments[enrollmentIndex];
          
          // Trừ buổi học
          const updatedEnrollmentResult = currentEnrollment.consumeSession();
          
          if (updatedEnrollmentResult.isSuccess) {
            studentEntity.updateEnrollment(enrollmentIndex, updatedEnrollmentResult.getValue());
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