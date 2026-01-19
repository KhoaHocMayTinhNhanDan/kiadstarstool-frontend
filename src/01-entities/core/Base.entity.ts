// src/01-entities/core/Base.entity.ts

export const ENTITY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const

export type EntityStatus = typeof ENTITY_STATUS[keyof typeof ENTITY_STATUS]

// =====================
// INTERFACES
// =====================

export interface BaseEntityProps {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  createdBy?: string
  updatedBy?: string
  status?: EntityStatus
}

export interface BaseEntityJSON {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  status: EntityStatus
}

// =====================
// ABSTRACT CLASS
// =====================

export abstract class BaseEntity {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdBy: string
  readonly updatedBy: string
  readonly status: EntityStatus

  constructor(data: BaseEntityProps = {}) {
    this.id = data.id ?? ''
    this.createdAt = this.parseDate(data.createdAt) ?? new Date()
    this.updatedAt = this.parseDate(data.updatedAt) ?? this.createdAt
    this.createdBy = data.createdBy ?? ''
    this.updatedBy = data.updatedBy ?? ''
    this.status = data.status ?? ENTITY_STATUS.ACTIVE
  }

  /* =====================
   *  STATE GETTERS
   * ===================== */

  get isActive(): boolean {
    return this.status === ENTITY_STATUS.ACTIVE
  }

  get isInactive(): boolean {
    return this.status === ENTITY_STATUS.INACTIVE
  }

  get isPending(): boolean {
    return this.status === ENTITY_STATUS.PENDING
  }

  get isBlocked(): boolean {
    return this.status === ENTITY_STATUS.BLOCKED
  }

  get isDeleted(): boolean {
    return this.status === ENTITY_STATUS.DELETED
  }

  /* =====================
   *  VALIDATION
   * ===================== */

  validate(): string[] {
    const errors: string[] = []

    if (!Object.values(ENTITY_STATUS).includes(this.status)) {
      errors.push(`Invalid status: ${this.status}`)
    }

    if (this.updatedAt < this.createdAt) {
      errors.push('updatedAt cannot be earlier than createdAt')
    }

    return errors
  }

  isValid(): boolean {
    return this.validate().length === 0
  }

  /* =====================
   *  DOMAIN BEHAVIOR
   * ===================== */

  delete(deletedBy = ''): this {
    return this.cloneWith({
      status: ENTITY_STATUS.DELETED,
      updatedAt: new Date(),
      updatedBy: deletedBy || this.updatedBy,
    })
  }

  block(blockedBy = ''): this {
    return this.cloneWith({
      status: ENTITY_STATUS.BLOCKED,
      updatedAt: new Date(),
      updatedBy: blockedBy || this.updatedBy,
    })
  }

  activate(activatedBy = ''): this {
    return this.cloneWith({
      status: ENTITY_STATUS.ACTIVE,
      updatedAt: new Date(),
      updatedBy: activatedBy || this.updatedBy,
    })
  }

  touch(updatedBy = ''): this {
    return this.cloneWith({
      updatedAt: new Date(),
      updatedBy: updatedBy || this.updatedBy,
    })
  }

  setAuditInfo(createdBy: string, updatedBy: string): this {
    return this.cloneWith({
      createdBy: createdBy || this.createdBy,
      updatedBy: updatedBy || this.updatedBy,
    })
  }

  /* =====================
   *  SERIALIZATION
   * ===================== */

  protected baseToJSON(): BaseEntityJSON {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      status: this.status,
    }
  }

  abstract toJSON(): Record<string, unknown>
  abstract clone(): this

  /* =====================
   *  CLONE HELPER
   * ===================== */

  protected cloneWith(updates: Partial<BaseEntityProps>): this {
    const Ctor = this.constructor as new (data: any) => this
    return new Ctor({
      ...(this as any).toJSON(),
      ...updates,
    })
  }


  /* =====================
   *  UTILITIES
   * ===================== */

  equals(other: BaseEntity): boolean {
    return this.id === other.id && this.constructor === other.constructor
  }

  private parseDate(value?: Date | string): Date | null {
    if (!value) return null
    const d = value instanceof Date ? value : new Date(value)
    return isNaN(d.getTime()) ? null : d
  }
}
