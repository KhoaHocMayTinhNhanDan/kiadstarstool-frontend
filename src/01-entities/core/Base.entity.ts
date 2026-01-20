// src/01-entities/core/Base.entity.ts

export interface BaseEntityProps {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  createdBy?: string
  updatedBy?: string
}

export interface BaseEntityJSON {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export abstract class BaseEntity<
  TJSON extends BaseEntityJSON = BaseEntityJSON
> {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdBy: string
  readonly updatedBy: string

  constructor(data: BaseEntityProps = {}) {
    this.id = data.id ?? ''
    this.createdAt = this.parseDate(data.createdAt) ?? new Date()
    this.updatedAt = this.parseDate(data.updatedAt) ?? this.createdAt
    this.createdBy = data.createdBy ?? ''
    this.updatedBy = data.updatedBy ?? ''
  }

  protected baseToJSON(): BaseEntityJSON {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    }
  }

  abstract toJSON(): TJSON
  abstract clone(): this

  protected parseDate(value?: Date | string): Date | null {
    if (!value) return null
    const d = value instanceof Date ? value : new Date(value)
    return isNaN(d.getTime()) ? null : d
  }

  equals(other: BaseEntity<any>): boolean {
    return this.id === other.id && this.constructor === other.constructor
  }
}
