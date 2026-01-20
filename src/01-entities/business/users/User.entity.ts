// src/01-entities/users/User.entity.ts

import {
  BaseEntity,
  type BaseEntityProps,
  type BaseEntityJSON,
} from '../core/Base.entity'

import {
  UserAuth,
  type UserAuthProps,
  type UserAuthJSON,
} from './UserAuth.entity'

import {
  UserProfile,
  type UserProfileProps,
  type UserProfileJSON,
} from './UserProfile.entity'

import type { RoleCode, PermissionCode } from '../../shared/constants/roles.constant'

/* =====================
 *  ENTITY STATUS (USER-SPECIFIC)
 * ===================== */

export const ENTITY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const

export type EntityStatus = typeof ENTITY_STATUS[keyof typeof ENTITY_STATUS]

/* =====================
 *  TYPES
 * ===================== */

export interface UserProps
  extends BaseEntityProps,
    UserAuthProps,
    UserProfileProps {
  entityStatus?: EntityStatus
}

export interface UserJSON
  extends BaseEntityJSON,
    UserAuthJSON,
    UserProfileJSON {
  entityStatus: EntityStatus
}

/* =====================
 *  AGGREGATE ROOT
 * ===================== */

export class User extends BaseEntity<UserJSON> {
  readonly auth: UserAuth
  readonly profile: UserProfile
  readonly entityStatus: EntityStatus

  constructor(data: UserProps = {}) {
    const {
      email,
      roles,
      permissions,
      lastLoginAt,
      emailVerified,
      customClaims,
      displayName,
      photoURL,
      phoneNumbers,
      branchIds,
      entityStatus,
      ...baseProps
    } = data

    super(baseProps)

    this.entityStatus = entityStatus ?? ENTITY_STATUS.ACTIVE

    this.auth = new UserAuth({
      email,
      roles,
      permissions,
      lastLoginAt,
      emailVerified,
      customClaims,
    })

    this.profile = new UserProfile({
      displayName,
      photoURL,
      phoneNumbers,
      branchIds,
    })
  }

  /* =====================
   *  STATE
   * ===================== */

  get isActive(): boolean {
    return this.entityStatus === ENTITY_STATUS.ACTIVE
  }

  get isBlocked(): boolean {
    return this.entityStatus === ENTITY_STATUS.BLOCKED
  }

  /* =====================
   *  AUTH
   * ===================== */

  hasPermission(permission: PermissionCode): boolean {
    return this.isActive && this.auth.hasPermission(permission)
  }

  hasRole(role: RoleCode): boolean {
    return this.auth.hasRole(role)
  }

  addRole(role: RoleCode): User {
    return this.cloneWithUser({ auth: this.auth.addRole(role) })
  }

  /* =====================
   *  PROFILE
   * ===================== */

  updateProfile(data: Partial<UserProfileProps>): User {
    return this.cloneWithUser({
      profile: this.profile.updateProfile(data),
    })
  }

  isInBranch(branchId: string): boolean {
    return this.profile.isInBranch(branchId)
  }

  /* =====================
   *  DOMAIN RULES
   * ===================== */

  isEligibleForLogin(): boolean {
    return this.isActive && this.auth.emailVerified && !this.isBlocked
  }

  canManageUser(target: User): boolean {
    if (this.auth.isAdmin) return true

    return (
      this.auth.isTeacher &&
      this.profile.branchIds.some(branchId =>
        target.profile.isInBranch(branchId),
      )
    )
  }

  /* =====================
   *  SERIALIZATION
   * ===================== */

  override toJSON(): UserJSON {
    return {
      ...this.baseToJSON(),
      entityStatus: this.entityStatus,
      ...this.auth.toJSON(),
      ...this.profile.toJSON(),
    }
  }

  override clone(): this {
    return new User(this.toJSON()) as this
  }

  /* =====================
   *  INTERNAL CLONE
   * ===================== */

  private cloneWithUser(updates: {
    auth?: UserAuth
    profile?: UserProfile
  }): this {
    return new User({
      ...this.toJSON(),
      ...(updates.auth && updates.auth.toJSON()),
      ...(updates.profile && updates.profile.toJSON()),
    }) as this
  }
}
