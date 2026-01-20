// src/01-entities/users/UserAuth.entity.ts

import {
  ROLES,
  PERMISSIONS,
  type RoleCode,
  type PermissionCode,
  isValidRole,
  getPermissionsForRole,
} from '../../../shared/constants/roles.constant'

export interface UserAuthProps {
  email?: string
  roles?: RoleCode[]
  permissions?: PermissionCode[]
  lastLoginAt?: string | null
  emailVerified?: boolean
  customClaims?: Record<string, unknown>
}

export interface UserAuthJSON {
  email: string
  roles: RoleCode[]
  permissions: PermissionCode[]
  lastLoginAt: string | null
  emailVerified: boolean
  customClaims: Record<string, unknown>
}

export class UserAuth {
  readonly email: string
  readonly roles: RoleCode[]
  readonly permissions: PermissionCode[]
  readonly lastLoginAt: string | null
  readonly emailVerified: boolean
  readonly customClaims: Record<string, unknown>

  constructor(data: UserAuthProps = {}) {
    this.email = (data.email ?? '').toLowerCase().trim()
    this.roles = this.normalizeRoles(data.roles)
    this.permissions = data.permissions
      ? this.normalizePermissions(data.permissions)
      : this.calculatePermissionsFromRoles(this.roles)

    this.lastLoginAt = data.lastLoginAt ?? null
    this.emailVerified = Boolean(data.emailVerified)
    this.customClaims = data.customClaims ?? {}
  }

  /* =====================
   *  BEHAVIOR
   * ===================== */

  hasPermission(permission: PermissionCode): boolean {
    return (
      this.permissions.includes(PERMISSIONS.ALL) ||
      this.permissions.includes(permission)
    )
  }

  hasRole(role: RoleCode): boolean {
    return this.roles.includes(role)
  }

  hasAnyRole(...roles: RoleCode[]): boolean {
    return roles.some(r => this.roles.includes(r))
  }

  addRole(role: RoleCode): UserAuth {
    if (this.roles.includes(role)) return this
    return new UserAuth({ ...this.toJSON(), roles: [...this.roles, role] })
  }

  removeRole(role: RoleCode): UserAuth {
    if (this.roles.length <= 1) return this
    return new UserAuth({
      ...this.toJSON(),
      roles: this.roles.filter(r => r !== role),
    })
  }

  updateEmail(email: string): UserAuth {
    return new UserAuth({ ...this.toJSON(), email })
  }

  verifyEmail(): UserAuth {
    return new UserAuth({ ...this.toJSON(), emailVerified: true })
  }

  recordLogin(): UserAuth {
    return new UserAuth({
      ...this.toJSON(),
      lastLoginAt: new Date().toISOString(),
    })
  }

  /* =====================
   *  SERIALIZATION
   * ===================== */

  toJSON(): UserAuthJSON {
    return {
      email: this.email,
      roles: [...this.roles],
      permissions: [...this.permissions],
      lastLoginAt: this.lastLoginAt,
      emailVerified: this.emailVerified,
      customClaims: { ...this.customClaims },
    }
  }

  validate(): string[] {
    const errors: string[] = []

    if (!this.email) errors.push('Email is required')
    if (this.roles.length === 0) errors.push('At least one role is required')

    return errors
  }

  /* =====================
   *  INTERNALS
   * ===================== */

  private normalizeRoles(roles?: RoleCode[]): RoleCode[] {
    const valid = (roles ?? []).filter(isValidRole)
    return valid.length > 0 ? valid : [ROLES.TEACHER]
  }

  private normalizePermissions(perms: PermissionCode[]): PermissionCode[] {
    return perms.includes(PERMISSIONS.ALL)
      ? [PERMISSIONS.ALL]
      : Array.from(new Set(perms))
  }

  private calculatePermissionsFromRoles(roles: RoleCode[]): PermissionCode[] {
    const set = new Set<PermissionCode>()
    for (const r of roles) {
      for (const p of getPermissionsForRole(r)) {
        if (p === PERMISSIONS.ALL) return [PERMISSIONS.ALL]
        set.add(p)
      }
    }
    return Array.from(set)
  }

  get isAdmin(): boolean {
    return this.roles.includes(ROLES.ADMIN)
  }

  get isTeacher(): boolean {
    return this.roles.includes(ROLES.TEACHER)
  }
}
