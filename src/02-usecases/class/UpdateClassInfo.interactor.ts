import { Result } from '@/01-entities/shared/base/result';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type UpdateClassInfoInput } from './ports/input/UpdateClassInfo.input';
import { type UpdateClassInfoOutput } from './ports/output/UpdateClassInfo.output';

export class UpdateClassInfoInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: UpdateClassInfoInput): Promise<Result<UpdateClassInfoOutput>> {
    try {
      if (!input.classId) {
        return Result.fail('Class ID is required.');
      }

      const classItem = await this.classRepo.getById(input.classId);
      if (!classItem) {
        return Result.fail('Class not found.');
      }

      // Cập nhật thông qua method của Entity
      classItem.updateInfo({
        name: input.name,
        code: input.code,
        maxStudents: input.maxStudents,
        status: input.status,
        teacherName: input.teacherName,
        sessions: input.sessions,
        tuition: input.tuition
      });

      await this.classRepo.update(classItem);

      return Result.ok({ success: true, id: input.classId });
    } catch (error: any) {
      console.error('Error in UpdateClassInfoInteractor:', error);
      return Result.fail(`Failed to update class info: ${error.message}`);
    }
  }
}