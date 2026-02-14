import { Result } from '@/01-entities/shared/base/result';
import { Class } from '@/01-entities/classes/Class.entity';
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type CreateClassInput } from './ports/input/CreateClass.input';

export class CreateClassInteractor {
  private readonly classRepo: IClassRepository;
  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }
  async execute(input: CreateClassInput): Promise<Result<void>> {
    // Generate ID & Code if not provided
    const id = new Date().getTime().toString(); // Simple ID gen
    const code = input.code || `CLS-${id.slice(-4)}`;

    const classOrError = Class.create({
      id: ClassId.create(id),
      branchId: BranchId.create(input.branchId),
      name: input.name,
      code: code,
      status: ClassStatus.PLANNED,
      maxStudents: input.maxStudents,
      currentStudents: 0,
      startDate: new Date(),
      sessions: input.sessions || [],
      teacherName: input.teacherName
    });

    if (classOrError.isFailure) return Result.fail(classOrError.getErrorValue());

    await this.classRepo.save(classOrError.getValue());
    return Result.ok();
  }
}