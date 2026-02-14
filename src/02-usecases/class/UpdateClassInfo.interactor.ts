import { Result } from '@/01-entities/shared/base/result';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type UpdateClassInfoInput } from './ports/input/UpdateClassInfo.input';

export class UpdateClassInfoInteractor {
  private readonly classRepo: IClassRepository;
  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: UpdateClassInfoInput): Promise<Result<void>> {
    const classEntity = await this.classRepo.getById(input.id);
    if (!classEntity) {
      return Result.fail('Class not found');
    }

    const updateResult = classEntity.updateInfo({
      name: input.name,
      maxStudents: input.maxStudents,
      status: input.status as ClassStatus,
      sessions: input.sessions,
      teacherName: input.teacherName
    });

    if (updateResult.isFailure) return Result.fail(updateResult.getErrorValue());

    await this.classRepo.save(classEntity);
    return Result.ok();
  }
}