import { Result } from '@/01-entities/shared/base/result'; 
import { type Class } from '@/01-entities/classes/Class.entity';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type ListClassesByBranchInput } from './ports/input/ListClassesByBranch.input';
import { type ListClassesByBranchOutput } from './ports/output/ListClassesByBranch.output';

export class ListClassesByBranchInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: ListClassesByBranchInput): Promise<Result<ListClassesByBranchOutput>> {
    try {
      // 1. Fetch classes (filter by branch if provided, otherwise get all)
      let classes: Class[];
      if (input.branchId) {
        classes = await this.classRepo.getByBranchId(input.branchId);
      } else {
        classes = await this.classRepo.getAll();
      }

      // 3. Map the entities to DTOs (Data Transfer Objects) for the output
      const classDTOs = classes.map((cls: Class) => ({
        id: cls.id.toString(),
        name: cls.name,
        code: cls.code,
        branchId: cls.branchId.toString(),
        teacherName: cls.teacherName,
        maxStudents: cls.maxStudents,
        currentStudents: cls.currentStudents,
        schedule: cls.schedule,
        status: cls.status,
        sessions: cls.sessions
      }));

      return Result.ok(classDTOs);
    } catch (error: any) {
      console.error('Error in ListClassesByBranchInteractor:', error);
      return Result.fail(`Failed to list classes by branch: ${error.message}`);
    }
  }
}