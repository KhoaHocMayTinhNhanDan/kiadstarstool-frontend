import { Class } from '@/01-entities/classes/Class.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';

export interface IClassRepository {
  getByBranchId(branchId: BranchId): Promise<Class[]>;
  getById(id: string): Promise<Class | null>;
  save(classEntity: Class): Promise<void>;
  update(classEntity: Class): Promise<void>;
  delete(id: string): Promise<void>;
}