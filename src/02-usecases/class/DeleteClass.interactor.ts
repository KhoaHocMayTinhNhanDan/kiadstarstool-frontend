import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type IAttendanceRepository } from '@/02-usecases/attendance/ports/gateways_interface/IAttendanceRepository';
import { type DeleteClassInput } from './ports/input/DeleteClass.input';

export class DeleteClassInteractor {
  constructor(
    private readonly classRepo: IClassRepository,
    private readonly attendanceRepo: IAttendanceRepository
  ) {}

  async execute(input: DeleteClassInput): Promise<Result<void>> {
    const classEntity = await this.classRepo.getById(input.classId);

    if (!classEntity) {
      return Result.fail('Class not found');
    }

    // 1. Xóa dữ liệu điểm danh liên quan
    await this.attendanceRepo.deleteByClassId(input.classId);

    // 2. Xóa lớp học
    await this.classRepo.delete(input.classId);

    return Result.ok();
  }
}