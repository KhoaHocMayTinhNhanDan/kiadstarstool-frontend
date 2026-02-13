import { v4 as uuidv4 } from 'uuid';
import { Identifier } from '../../shared/Identifier.vo';

export class ClassId extends Identifier {
  private constructor(value: string) {
    super({ value });
  }

  static create(id?: string): ClassId {
    return new ClassId(id ?? uuidv4());
  }
}