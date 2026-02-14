import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type GetClassDetailsOutput } from './ports/output/GetClassDetails.output';

export class GetClassDetailsInteractor {
  private readonly classRepo: IClassRepository;
  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(id: string): Promise<Result<GetClassDetailsOutput>> {
    const classEntity = await this.classRepo.getById(id);
    if (!classEntity) {
      return Result.fail('Class not found');
    }

    return Result.ok({
      id: classEntity.id.toString(),
      name: classEntity.name,
      code: classEntity.code,
      branchId: classEntity.branchId.toString(),
      status: classEntity.status,
      maxStudents: classEntity.maxStudents,
      currentStudents: classEntity.currentStudents,
      startDate: classEntity.startDate,
      // Sử dụng getter từ Entity
      schedule: classEntity.schedule,
      sessions: classEntity.sessions,
      teacherName: classEntity.teacherName
    });
  }
}