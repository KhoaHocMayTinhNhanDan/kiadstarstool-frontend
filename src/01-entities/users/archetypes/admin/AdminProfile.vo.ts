// src/01-entities/users/archetypes/admin/AdminProfile.vo.ts
import { type IUserProfile } from '../../base/IUserProfile.vo'
import { UserRole } from '../../base/UserRole.vo'
import { Permission } from '../../permissions/Permission.vo'
import { PhoneNumber } from '../../../shared/base/PhoneNumber.vo'

interface AdminProfileProps {
  displayName: string
  photoURL?: string
  phoneNumbers?: readonly PhoneNumber[]

  adminLevel: number
  managedBranches?: readonly string[]
}

export class AdminProfile implements IUserProfile {
  readonly kind = 'admin'
  readonly displayName: string
  readonly photoURL?: string
  readonly phoneNumbers: readonly PhoneNumber[]

  // admin-specific
  readonly adminLevel: number
  readonly managedBranches: readonly string[]

  constructor(props: AdminProfileProps) {
    AdminProfile.assertValid(props)

    this.displayName = props.displayName.trim()
    this.photoURL = props.photoURL
    this.phoneNumbers = Object.freeze(props.phoneNumbers ?? [])

    this.adminLevel = props.adminLevel
    this.managedBranches = Object.freeze(props.managedBranches ?? [])
  }

  // ========= IUserProfile =========

  supportsRole(role: UserRole): boolean {
    return role.isAdmin()
  }

  supportsPermission(permission: Permission): boolean {
    return true // admin full quyền
  }

  equals(other: IUserProfile): boolean {
    if (other.kind !== this.kind) return false
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
      kind: this.kind,
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
