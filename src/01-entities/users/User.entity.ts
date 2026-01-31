import { UserId } from './base/UserId.vo'
import { UserRole } from './base/UserRole.vo'
import { Permission } from './base/Permission.vo'
import { type IUserProfile } from './base/IUserProfile.vo'
import { AggregateRoot } from '../shared/base/AggregateRoot'

interface UserProps {
  readonly id: UserId
  readonly role: UserRole
  readonly profile: IUserProfile
  readonly permissions: readonly Permission[]
  readonly isActive: boolean
}

export class User extends AggregateRoot<UserId> {
  public readonly role: UserRole
  public readonly profile: IUserProfile
  public readonly permissions: readonly Permission[]
  public readonly isActive: boolean

  private constructor(props: UserProps) {
    super({ id: props.id })
    this.role = props.role
    this.profile = props.profile
    this.permissions = props.permissions
    this.isActive = props.isActive
  }

  static create(props: {
    id?: UserId
    role: UserRole
    profile: IUserProfile
    defaultPermissions: readonly Permission[]
    isActive?: boolean
  }): User {
    if (!props.profile.supportsRole(props.role)) {
      throw new Error('PROFILE_ROLE_MISMATCH')
    }

    return new User({
      id: props.id ?? UserId.create(),
      role: props.role,
      profile: props.profile,
      permissions: User.uniquePermissions(props.defaultPermissions),
      isActive: props.isActive ?? true,
    })
  }
    hasPermission(permission: Permission): boolean {
        return this.permissions.some(p => p.equals(permission))
    }

  grant(permission: Permission): User {
    if (this.hasPermission(permission)) return this
    this.assertPermissionAllowed(permission)

    return this.clone({
      permissions: [...this.permissions, permission],
    })
  }

  // ===== internal =====

  private clone(overrides: Partial<UserProps>): User {
    return new User({
      id: this.id,
      role: this.role,
      profile: this.profile,
      permissions: this.permissions,
      isActive: this.isActive,
      ...overrides,
    })
  }

  private assertPermissionAllowed(permission: Permission) {
    if (!this.profile.supportsPermission(permission)) {
      throw new Error('PERMISSION_NOT_ALLOWED_FOR_ROLE')
    }
  }

  private static uniquePermissions(
    permissions: readonly Permission[],
  ): Permission[] {
    return permissions.filter(
      (p, i, arr) => arr.findIndex(x => x.equals(p)) === i,
    )
  }
}
