import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type GetClassDetailsInput } from './ports/input/GetClassDetails.input';
import { type GetClassDetailsOutput } from './ports/output/GetClassDetails.output';

export class GetClassDetailsInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: GetClassDetailsInput): Promise<Result<GetClassDetailsOutput>> {
    try {
      if (!input.classId) {
        return Result.fail('Class ID is required.');
      }

      const classItem = await this.classRepo.getById(input.classId);

      if (!classItem) {
        return Result.fail('Class not found.');
      }

      // Map Entity sang Output DTO
      return Result.ok({
        id: classItem.id.toString(),
        name: classItem.name,
        code: classItem.code,
        branchId: classItem.branchId.toString(),
        maxStudents: classItem.maxStudents,
        currentStudents: classItem.currentStudents,
        status: classItem.status,
        schedule: classItem.schedule,
        teacherName: classItem.teacherName,
        sessions: classItem.sessions,
        tuition: classItem.tuition,
        startDate: classItem.startDate.toISOString(),
        endDate: classItem.endDate?.toISOString()
      });
    } catch (error: any) {
      console.error('Error in GetClassDetailsInteractor:', error);
      return Result.fail(`Failed to get class details: ${error.message}`);
    }
  }
}