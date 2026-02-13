import { Class } from '@/01-entities/classes/Class.entity';

export interface IClassDataSource {
  getByBranchId(branchId: string): Promise<Class[]>;
  save(classEntity: Class): Promise<void>;
}