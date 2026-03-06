import { Class } from '@/01-entities/classes/Class.entity';

export interface IClassDataSource {
  getByBranchId(branchId: string): Promise<Class[]>;
  getById(id: string): Promise<Class | null>;
  save(classEntity: Class): Promise<void>;
  update(classEntity: Class): Promise<void>;
  delete(id: string): Promise<void>;
  saveInBatch(classEntity: Class, batch: any): void;
}