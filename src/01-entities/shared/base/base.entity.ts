// src/01-entities/shared/base/Base.entity.ts
import { Identifier } from '../Identifier.vo'

export interface EntityProps {
  id?: Identifier
}

/**
 * Base class tối thiểu cho Entity theo DDD.
 * - KHÔNG lifecycle
 * - KHÔNG audit
 * - KHÔNG mutable assumption
 */
export abstract class Entity<TId extends Identifier> {
  public readonly id: TId

  protected constructor(props: EntityProps) {
    this.id = (props.id as TId) ?? Identifier.create()
  }

  public equals(object?: Entity<TId>): boolean {
    if (object == null) return false
    if (this === object) return true
    if (!(object instanceof Entity)) return false
    return this.id.equals(object.id)
  }
}
