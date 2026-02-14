import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type UpdateClassInfoInput } from './ports/input/UpdateClassInfo.input';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';

export class UpdateClassInfoInteractor {
  constructor(private readonly classRepo: IClassRepository) {}

  async execute(input: UpdateClassInfoInput): Promise<Result<void>> {
    const classEntity = await this.classRepo.getById(input.id);

    if (!classEntity) {
      return Result.fail('Class not found');
    }

    // Cập nhật thông tin entity
    // Lưu ý: Trong thực tế nên dùng các phương thức domain của Entity (vd: classEntity.updateInfo(...))
    // Ở đây ta gán trực tiếp hoặc dùng Object.assign nếu Entity cho phép
    (classEntity as any).name = input.name;
    (classEntity as any).branchId = BranchId.create(input.branchId);
    (classEntity as any).schedule = input.schedule;
    (classEntity as any).teacherName = input.teacherName;
    (classEntity as any).maxStudents = input.maxStudents;
    (classEntity as any).status = input.status;

    // Validate lại entity nếu cần

    // Lưu
    await this.classRepo.update(classEntity);

    return Result.ok();
  }
}