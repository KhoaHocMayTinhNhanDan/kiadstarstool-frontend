// src/01-entities/users/base/UserId.vo.ts
import { v4 as uuidv4 } from 'uuid'
import { Identifier } from '../../shared/Identifier.vo'

export class UserId extends Identifier {
  private constructor(value: string) {
    super({ value })
  }

  static create(value?: string): UserId {
    return new UserId(value ?? uuidv4())
  }
}
