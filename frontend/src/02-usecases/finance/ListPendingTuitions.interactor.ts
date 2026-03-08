import { Result } from '@/01-entities/shared/base/result';
import { type ListPendingTuitionsInput } from './ports/input/ListPendingTuitions.input';
import { type ListPendingTuitionsOutput } from './ports/output/ListPendingTuitions.output';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';

export class ListPendingTuitionsInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: ListPendingTuitionsInput): Promise<Result<ListPendingTuitionsOutput>> {
    try {
      // Lấy danh sách học viên có nợ từ Repository
      // Note: Cần đảm bảo method getStudentsWithPendingTuition đã được thêm vào interface IStudentRepository
      const students = await (this.studentRepo as any).getStudentsWithPendingTuition(input.branchId);
      
      const output: ListPendingTuitionsOutput = [];

      // Flatten dữ liệu: Một học viên có thể nợ nhiều lớp
      students.forEach((student: any) => {
        if (student.enrollments) {
          student.enrollments.forEach((e: any) => {
            if ((e.paymentStatus === 'unpaid' || e.paymentStatus === 'partial') && (e.tuitionAmount || 0) > 0 && e.status === 'active') {
              // Lọc thêm branchId ở đây nếu cần thiết (trường hợp học viên học nhiều chi nhánh)
              if (!input.branchId || e.branchId === input.branchId) {
                output.push({
                  studentId: student.id.toString(),
                  studentName: student.name,
                  studentPhone: student.phone,
                  branchId: e.branchId,
                  classId: e.classId,
                  tuitionAmount: e.tuitionAmount,
                  paidAmount: e.paidAmount || 0,
                  paymentStatus: e.paymentStatus
                });
              }
            }
          });
        }
      });

      return Result.ok(output);
    } catch (error: any) {
      return Result.fail(`Failed to list pending tuitions: ${error.message}`);
    }
  }
}