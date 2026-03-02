import { Result } from '@/01-entities/shared/base/result';
import { Attendance } from '@/01-entities/attendance/Attendance.entity';
import { Identifier } from '@/01-entities/shared/value-objects/Identifier.vo';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type MarkBatchAttendanceInput } from './ports/input/MarkBatchAttendance.input';
import { type MarkBatchAttendanceOutput } from './ports/output/MarkBatchAttendance.output';

export class MarkBatchAttendanceInteractor {
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

  async execute(input: MarkBatchAttendanceInput): Promise<Result<MarkBatchAttendanceOutput>> {
    try {
      let count = 0;

      // 1. Tối ưu: Lấy tất cả điểm danh hiện có của lớp trong ngày này (1 Query thay vì N Query)
      const [existingAttendances, classEntity] = await Promise.all([
        this.attendanceRepo.getByClassAndDate(input.classId, input.date),
        this.classRepo.getById(input.classId)
      ]);

      if (!classEntity) {
        return Result.fail('Class not found');
      }
      
      // Tạo Set các studentId đã có điểm danh để tra cứu nhanh O(1)
      const existingStudentIds = new Set(existingAttendances.map(a => a.studentId));

      // UPDATE: Trừ buổi cho cả lớp đóng theo tháng/khóa nếu có cấu hình học phí
      const isTuitionClass = !!classEntity.tuition && (
        !!classEntity.tuition.sessionFee || 
        !!classEntity.tuition.monthlyFee || 
        !!classEntity.tuition.courseFee
      );
      const isPresent = input.status === ATTENDANCE_STATUS.PRESENT || input.status === ATTENDANCE_STATUS.LATE;

      // Xử lý song song các tác vụ cho mỗi học viên
      const processingTasks = input.studentIds.map(async (studentId) => {
        if (existingStudentIds.has(studentId)) return; // Bỏ qua nếu đã điểm danh

        // 2. Tạo bản ghi điểm danh mới
        const attendance = Attendance.create({
          courseId: input.classId,
          studentId: studentId,
          date: input.date, // Entity expects string
          session: 'default',
          attendanceStatus: input.status,
          // Ghi nhận người thực hiện
          createdBy: Identifier.create(input.performedBy),
          updatedBy: Identifier.create(input.performedBy)
        });
        
        attendance.checkIn(); // Set giờ check-in mặc định
        await this.attendanceRepo.save(attendance);
        count++;

        // 3. Xử lý trừ buổi học nếu cần
        if (isPresent && isTuitionClass) {
          const studentEntity = await this.studentRepo.getById(studentId);
          if (studentEntity) {
            const enrollmentIndex = studentEntity.enrollments.findIndex(
              e => e.classId === input.classId && e.status === 'active'
            );
            if (enrollmentIndex !== -1) {
              const updatedEnrollmentResult = studentEntity.enrollments[enrollmentIndex].consumeSession();
              if (updatedEnrollmentResult.isSuccess) {
                studentEntity.enrollments[enrollmentIndex] = updatedEnrollmentResult.getValue();
                await this.studentRepo.save(studentEntity);
              }
            }
          }
        }
      });

      await Promise.all(processingTasks);

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
      classEntity.updateInfo({ currentStudents: presentCount });
      await this.classRepo.update(classEntity);
    }
  }
}