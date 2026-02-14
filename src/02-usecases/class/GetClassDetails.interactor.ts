import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type GetClassDetailsInput } from './ports/input/GetClassDetails.input';
import { type GetClassDetailsOutput } from './ports/output/GetClassDetails.output';

export class GetClassDetailsInteractor {
  constructor(private readonly classRepo: IClassRepository) {}

  async execute(input: GetClassDetailsInput): Promise<Result<GetClassDetailsOutput>> {
    const classEntity = await this.classRepo.getById(input.classId);

    if (!classEntity) {
      return Result.fail('Class not found');
    }

    // Map Entity to Output DTO
    return Result.ok({
      id: classEntity.id.toString(),
      name: classEntity.name,
      branchId: classEntity.branchId.toString(),
      code: classEntity.code,
      schedule: (classEntity as any).schedule, // Giả sử entity có field này
      teacherName: (classEntity as any).teacherName, // Giả sử entity có field này
      maxStudents: classEntity.maxStudents,
      currentStudents: classEntity.currentStudents,
      status: classEntity.status
    });
  }
}