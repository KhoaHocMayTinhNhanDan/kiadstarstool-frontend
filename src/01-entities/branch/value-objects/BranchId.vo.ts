// src/01-entities/branch/BranchId.vo.ts
import { Identifier } from '../../shared/Identifier.vo';

export class BranchId extends Identifier {
  private constructor(value: string) {
    super({ value }); // ✅ ĐÚNG
  }

  static create(id?: string): BranchId {
    const value = id ?? crypto.randomUUID(); // ✅ sinh ID mới
    return new BranchId(value);
  }
}
