import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type TransferStudentInput } from './ports/input/TransferStudent.input';

export class TransferStudentInteractor {
  constructor(
    private readonly studentRepo: IStudentRepository,
    private readonly classRepo: IClassRepository
  ) {}

  async execute(input: TransferStudentInput): Promise<Result<void>> {
    // 1. Lấy thông tin học viên
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) {
      return Result.fail('Student not found');
    }

    // 2. Kiểm tra lớp đích có tồn tại không
    const targetClass = await this.classRepo.getById(input.toClassId);
    if (!targetClass) {
      return Result.fail('Target class not found');
    }

    // 3. Thực hiện chuyển lớp (Domain Logic)
    const transferResult = student.transfer(
      input.fromClassId,
      input.toBranchId,
      input.toClassId,
      input.transferDate || new Date()
    );

    if (transferResult.isFailure) return transferResult;

    // 4. Lưu thay đổi
    await this.studentRepo.save(student);
    return Result.ok();
  }
}