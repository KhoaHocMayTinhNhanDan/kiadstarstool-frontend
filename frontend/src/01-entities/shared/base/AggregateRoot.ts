// src/01-entities/shared/base/AggregateRoot.ts
import { Entity, type EntityProps } from './base.entity'
import { Identifier } from '../Identifier.vo'

/**
 * Marker class cho Aggregate Root.
 * Không thêm behavior, chỉ để phân biệt về mặt kiến trúc.
 */
export abstract class AggregateRoot<TId extends Identifier> extends Entity<TId> {
  protected constructor(props: EntityProps) {
    super(props)
  }
}
