// src/01-entities/shared/base/audited.entity.ts
import { Identifier } from '../Identifier.vo'
import { Entity, type EntityProps } from './base.entity'

export interface AuditedProps extends EntityProps {
  createdAt?: Date
  updatedAt?: Date
  createdBy?: Identifier
  updatedBy?: Identifier
}

export interface AuditJSON {
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

/**
 * Dành cho entity có lifecycle (CRUD, persistence-driven)
 * KHÔNG nên dùng cho core aggregate như User
 */
// audited.entity.ts
export abstract class AuditedEntity<TId extends Identifier>
  extends Entity<TId> {

  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly createdBy?: Identifier
  public readonly updatedBy?: Identifier

  protected constructor(props: AuditedProps) {
    super(props)

    // ⚠️ OK vì đây là persistence-driven entity
    if (!props.createdAt || !props.updatedAt) {
      throw new Error('AUDIT_FIELDS_REQUIRED')
    }

    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }
}
