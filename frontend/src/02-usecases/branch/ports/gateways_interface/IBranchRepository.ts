import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';

export interface IBranchRepository {
  save(branch: Branch): Promise<void>;
  getById(id: BranchId): Promise<Branch | null>;
  delete(id: BranchId): Promise<void>;
  findAll(): Promise<Branch[]>;
  exists(code: string): Promise<boolean>; // Giữ nguyên
  saveInBatch(branch: Branch, batch: any): void; // Thêm dòng này
}