import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type IAttendanceRepository } from '@/02-usecases/attendance/ports/gateways_interface/IAttendanceRepository';
import { type DeleteClassInput } from './ports/input/DeleteClass.input';
import { type DeleteClassOutput } from './ports/output/DeleteClass.output';

export class DeleteClassInteractor {
  private readonly classRepo: IClassRepository;
  private readonly attendanceRepo: IAttendanceRepository;

  constructor(classRepo: IClassRepository, attendanceRepo: IAttendanceRepository) {
    this.classRepo = classRepo;
    this.attendanceRepo = attendanceRepo;
  }

  async execute(input: DeleteClassInput): Promise<Result<DeleteClassOutput>> {
    try {
      if (!input.classId) {
        return Result.fail('Class ID is required.');
      }

      const classItem = await this.classRepo.getById(input.classId);
      if (!classItem) {
        return Result.fail('Class not found.');
      }

      // Kiểm tra ràng buộc dữ liệu: Không xóa lớp đã có điểm danh
      // Giả định repository có phương thức getByClassId (thường dùng cho tính năng xem lịch sử điểm danh)
      const attendanceRecords = await this.attendanceRepo.getByClassId(input.classId);
      if (attendanceRecords && attendanceRecords.length > 0) {
        return Result.fail('Cannot delete class that has existing attendance records.');
      }

      await this.classRepo.delete(input.classId);

      return Result.ok({ success: true });
    } catch (error: any) {
      console.error('Error in DeleteClassInteractor:', error);
      return Result.fail(`Failed to delete class: ${error.message}`);
    }
  }
}