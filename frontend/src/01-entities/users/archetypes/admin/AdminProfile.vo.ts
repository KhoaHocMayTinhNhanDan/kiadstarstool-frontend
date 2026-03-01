// src/01-entities/users/archetypes/admin/AdminProfile.vo.ts
import { type IUserProfile } from '../../base/IUserProfile.vo'
import { UserRole } from '../../base/UserRole.vo'
import { Permission } from '../../base/Permission.vo'
import { PhoneNumber } from '../../../shared/base/PhoneNumber.vo'

interface AdminProfileProps {
  displayName: string
  photoURL?: string
  phoneNumbers?: readonly PhoneNumber[]

  adminLevel: number
  managedBranches?: readonly string[]
}

export class AdminProfile implements IUserProfile {
  readonly kind: UserRole
  readonly displayName: string
  readonly photoURL?: string
  readonly phoneNumbers: readonly PhoneNumber[]

  // admin-specific
  readonly adminLevel: number
  readonly managedBranches: readonly string[]

  constructor(props: AdminProfileProps) {
    const roleResult = UserRole.create('admin')
    if (roleResult.isFailure) {
      throw new Error(roleResult.getErrorValue().toString())
    }

    this.kind = roleResult.getValue()
    AdminProfile.assertValid(props)

    this.displayName = props.displayName.trim()
    this.photoURL = props.photoURL
    this.phoneNumbers = Object.freeze(props.phoneNumbers ?? [])

    this.adminLevel = props.adminLevel
    this.managedBranches = Object.freeze(props.managedBranches ?? [])
  }

  // ========= IUserProfile =========

  supportsRole(role: UserRole): boolean {
    return role.equals(this.kind)
  }

  supportsPermission(permission: Permission): boolean {
    return true // admin full quyền
  }

  // =====================
  // MUTATION
  // =====================

  update(props: Partial<{ displayName: string; photoURL: string; phoneNumbers: PhoneNumber[] }>): IUserProfile {
    return new AdminProfile({
      displayName: props.displayName ?? this.displayName,
      photoURL: props.photoURL ?? this.photoURL,
      phoneNumbers: props.phoneNumbers ?? this.phoneNumbers,
      adminLevel: this.adminLevel, // Giữ nguyên
      managedBranches: this.managedBranches // Giữ nguyên
    })
  }

  equals(other: IUserProfile): boolean {
    if (!other) return false
    if (!other.kind.equals(this.kind)) return false
    const o = other as AdminProfile

    return (
      this.displayName === o.displayName &&
      this.photoURL === o.photoURL &&
      this.adminLevel === o.adminLevel &&
      AdminProfile.sameStringSet(this.managedBranches, o.managedBranches) &&
      AdminProfile.samePhones(this.phoneNumbers, o.phoneNumbers)
    )
  }

  toJSON() {
    return {
      kind: this.kind.toString(),
      displayName: this.displayName,
      photoURL: this.photoURL,
      phoneNumbers: this.phoneNumbers.map(p => p.toJSON()),
      adminLevel: this.adminLevel,
      managedBranches: [...this.managedBranches],
    }
  }

  // ========= INTERNAL =========

  private static assertValid(props: AdminProfileProps) {
    if (!props.displayName || !props.displayName.trim()) {
      throw new Error('DISPLAY_NAME_REQUIRED')
    }

    if (!Number.isInteger(props.adminLevel) || props.adminLevel < 1) {
      throw new Error('ADMIN_LEVEL_INVALID')
    }
  }

  private static sameStringSet(
    a: readonly string[],
    b: readonly string[],
  ): boolean {
    if (a.length !== b.length) return false
    return a.every(x => b.includes(x))
  }

  private static samePhones(
    a: readonly PhoneNumber[],
    b: readonly PhoneNumber[],
  ): boolean {
    if (a.length !== b.length) return false
    return a.every(p => b.some(x => x.equals(p)))
  }
}
