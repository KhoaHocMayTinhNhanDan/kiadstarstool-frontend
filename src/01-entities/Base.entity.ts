// src/01-entities/Base.entity.ts

export const ENTITY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const

export type EntityStatus =
  typeof ENTITY_STATUS[keyof typeof ENTITY_STATUS]

export abstract class BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  status: EntityStatus

  constructor(data: Partial<BaseEntity> = {}) {
    this.id = data.id ?? ''
    this.createdAt = data.createdAt ?? new Date().toISOString()
    this.updatedAt = data.updatedAt ?? new Date().toISOString()
    this.createdBy = data.createdBy ?? ''
    this.updatedBy = data.updatedBy ?? ''
    this.status = data.status ?? ENTITY_STATUS.ACTIVE
  }

  /* =====================
   *  STATE GETTERS
   * ===================== */

  get isActive() {
    return this.status === ENTITY_STATUS.ACTIVE
  }

  get isDeleted() {
    return this.status === ENTITY_STATUS.DELETED
  }

  get isBlocked() {
    return this.status === ENTITY_STATUS.BLOCKED
  }

  get isPending() {
    return this.status === ENTITY_STATUS.PENDING
  }

  /* =====================
   *  VALIDATION
   * ===================== */

  validate(): string[] {
    const errors: string[] = []

    if (this.id && typeof this.id !== 'string') {
      errors.push('ID must be a string if provided')
    }

    if (!Object.values(ENTITY_STATUS).includes(this.status)) {
      errors.push(
        `Status "${this.status}" is invalid. Allowed: ${Object.values(
          ENTITY_STATUS
        ).join(', ')}`
      )
    }

    if (this.createdAt && isNaN(Date.parse(this.createdAt))) {
      errors.push('createdAt must be a valid date string')
    }

    if (this.updatedAt && isNaN(Date.parse(this.updatedAt))) {
      errors.push('updatedAt must be a valid date string')
    }

    return errors
  }

  /* =====================
   *  DOMAIN BEHAVIOR
   * ===================== */

  /**
   * Entity con PHẢI tự quyết định cách clone
   * → Tránh unsafe constructor cast trong Base
   */
  abstract clone(): this

  /**
   * Chuẩn hoá serialize cho clone / persistence
   */
  abstract toJSON(): Record<string, unknown>

  touch(updaterId = ''): this {
    this.updatedAt = new Date().toISOString()
    if (updaterId) this.updatedBy = updaterId
    return this
  }
}
