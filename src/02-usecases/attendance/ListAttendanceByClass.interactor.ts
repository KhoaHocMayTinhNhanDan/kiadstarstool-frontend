import { Result } from '@/01-entities/shared/base/result';
import { type IAttendanceRepository } from './ports/gateways_interface/IAttendanceRepository';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type ListAttendanceByClassInput } from './ports/input/ListAttendanceByClass.input';
import { type ListAttendanceByClassOutput } from './ports/output/ListAttendanceByClass.output';

export class ListAttendanceByClassInteractor {
  private readonly attendanceRepo: IAttendanceRepository;
  private readonly studentRepo: IStudentRepository;
  private readonly classRepo: IClassRepository;

  constructor(
    attendanceRepo: IAttendanceRepository,
    studentRepo: IStudentRepository,
    classRepo: IClassRepository
  ) {
    this.attendanceRepo = attendanceRepo;
    this.studentRepo = studentRepo;
    this.classRepo = classRepo;
  }


  async execute(input: ListAttendanceByClassInput): Promise<Result<ListAttendanceByClassOutput>> {
    try {
      // 1. Lấy thông tin lớp học để biết BranchId
      const classEntity = await this.classRepo.getById(input.classId);
      if (!classEntity) {
        return Result.fail('Class not found');
      }

      // 2. Lấy danh sách học viên của chi nhánh (Source of Truth)
      const allStudents = await this.studentRepo.getByBranchId(classEntity.branchId.toString());

      // Filter: Chỉ lấy học viên có enrollment active trong lớp này
      const students = allStudents.filter(student => 
        student.enrollments.some(e => e.classId === input.classId && e.status === 'active')
      );
      
      // 3. Lấy danh sách điểm danh đã có
      const attendances = await this.attendanceRepo.getByClassAndDate(input.classId, input.date);
      const attendanceMap = new Map(attendances.map(att => [att.studentId, att]));

      // 4. Map dữ liệu: Left Join (Students + Attendance)
      const output: ListAttendanceByClassOutput = students.map(student => {
        const att = attendanceMap.get(student.id.toString());
        
        if (att) {
          return {
            id: att.id.toString(),
            studentId: att.studentId,
            studentName: student.name,
            status: att.attendanceStatus,
            checkInTime: (att.time as any).checkInTime,
            checkOutTime: (att.time as any).checkOutTime,
            score: att.getScore(),
            notes: att.metadata.absentReason
          };
        } else {
          // Chưa có bản ghi điểm danh -> Trả về trạng thái mặc định
          return {
            id: `temp-${student.id.toString()}`,
            studentId: student.id.toString(),
            studentName: student.name,
            status: 'not_marked',
            checkInTime: undefined,
            checkOutTime: undefined,
            score: 0,
            notes: undefined
          };
        }
      });

      return Result.ok(output);
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to list attendance');
    }
  }
}