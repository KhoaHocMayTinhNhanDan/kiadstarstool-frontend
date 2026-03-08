import { Branch } from '@/01-entities/branch/Branch.entity';

/**
 * Interface cho nguồn dữ liệu Branch (Database, API, etc.)
 */
export interface IBranchDataSource {
  save(branch: Branch): Promise<void>;
  getById(id: string): Promise<Branch | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Branch[]>;
  exists(code: string): Promise<boolean>;
  saveInBatch(branch: Branch, batch: any): void;
  findLastSequenceForPrefix(prefix: string): Promise<number>;
}