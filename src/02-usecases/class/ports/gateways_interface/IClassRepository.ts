import { Class } from '@/01-entities/classes/Class.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';

export interface IClassRepository {
  getByBranchId(branchId: BranchId): Promise<Class[]>;
  save(classEntity: Class): Promise<void>;
}