import { v4 as uuidv4 } from 'uuid';
import { Identifier } from '../../shared/Identifier.vo';

export class BranchId extends Identifier {
  private constructor(value: string) {
    super({ value });
  }

  static create(id?: string): BranchId {
    return new BranchId(id ?? uuidv4());
  }
}