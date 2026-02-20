import { Result } from '@/01-entities/shared/base/result';
import { Class } from '@/01-entities/classes/Class.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type CreateClassInput } from './ports/input/CreateClass.input';
import { type CreateClassOutput } from './ports/output/CreateClass.output';

export class CreateClassInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: CreateClassInput): Promise<Result<CreateClassOutput>> {
    try {
      // Validation cơ bản
      if (!input.branchId || !input.name || !input.code) {
        return Result.fail('Branch ID, Name, and Code are required.');
      }

      // 1. Tạo Value Object cho BranchId
      const branchIdVO = BranchId.create(input.branchId);

      // 2. Sử dụng Factory Method của Entity để tạo Class hợp lệ
      const classOrError = Class.create({
        branchId: branchIdVO,
        name: input.name,
        code: input.code,
        maxStudents: input.maxStudents || 20,
        status: input.status,
        sessions: input.sessions,
        teacherName: input.teacherName,
        tuition: input.tuition,
        currentStudents: 0,
        startDate: new Date()
      });

      if (classOrError.isFailure) {
        return Result.fail<CreateClassOutput>(classOrError.getErrorValue() as string);
      }

      const classEntity = classOrError.getValue();

      // 3. Lưu Entity vào Repository
      const createdClass = await this.classRepo.create(classEntity);

      return Result.ok({ id: createdClass.id.toString() });
    } catch (error: any) {
      console.error('Error in CreateClassInteractor:', error);
      return Result.fail(`Failed to create class: ${error.message}`);
    }
  }
}