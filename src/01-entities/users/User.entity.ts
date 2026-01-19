// src/01-entities/users/User.entity.ts

import {
  BaseEntity,
  ENTITY_STATUS,
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
 *  TYPES
 * ===================== */

export interface UserProps
  extends BaseEntityProps,
    UserAuthProps,
    UserProfileProps {}

export interface UserJSON
  extends BaseEntityJSON,
    UserAuthJSON,
    UserProfileJSON {
  [key: string]: unknown
}

/* =====================
 *  AGGREGATE ROOT
 * ===================== */

export class User extends BaseEntity {
  readonly auth: UserAuth
  readonly profile: UserProfile

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
      ...baseProps
    } = data

    super(baseProps)

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
   *  SERIALIZATION
   * ===================== */

  override toJSON(): UserJSON {
    return {
      ...this.baseToJSON(),
      ...this.auth.toJSON(),
      ...this.profile.toJSON(),
    }
  }

  override clone(): this {
    return new User(this.toJSON()) as this
  }

  /* =====================
   *  VALIDATION
   * ===================== */

  override validate(): string[] {
    return [
      ...super.validate(),
      ...this.auth.validate(),
      ...this.profile.validate(),
    ]
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

  /* =====================
   *  STATE OVERRIDES
   * ===================== */

  get isBlocked(): boolean {
    return this.status === ENTITY_STATUS.BLOCKED
  }
}
