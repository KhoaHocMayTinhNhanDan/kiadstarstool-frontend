import { type IUserProfile } from '../../base/IUserProfile.vo'
import { UserRole } from '../../base/UserRole.vo'
import { Permission } from '../../base/Permission.vo'
import { PhoneNumber } from '../../../shared/value-objects/PhoneNumber.vo'

interface BranchManagerProfileProps {
  displayName: string
  photoURL?: string
  dateOfBirth?: Date;
  phoneNumbers?: readonly PhoneNumber[]

  /**
   * Chi nhánh mà quản lý này phụ trách
   */
  branchId: string
}

export class BranchManagerProfile implements IUserProfile {
  readonly kind: UserRole
  readonly displayName: string
  readonly photoURL?: string
  readonly phoneNumbers: readonly PhoneNumber[]
  readonly dateOfBirth?: Date;

  // Manager-specific
  readonly branchId: string

  constructor(props: BranchManagerProfileProps) {
    const roleResult = UserRole.create('manager')
    if (roleResult.isFailure) {
      throw new Error(roleResult.getErrorValue().toString())
    }

    this.kind = roleResult.getValue()
    this.displayName = props.displayName.trim()
    this.photoURL = props.photoURL
    this.phoneNumbers = Object.freeze(props.phoneNumbers ?? [])
    this.dateOfBirth = props.dateOfBirth;
    this.branchId = props.branchId
  }

  // =====================
  // DOMAIN RULES
  // =====================

  supportsRole(role: UserRole): boolean {
    return role.equals(this.kind)
  }

  supportsPermission(permission: Permission): boolean {
    // Manager không được có quyền wildcard hệ thống
    if (permission.isWildcard()) return false
    return true
  }

  // =====================
  // MUTATION
  // =====================

  update(props: Partial<{ displayName: string; photoURL: string; phoneNumbers: PhoneNumber[], dateOfBirth: Date }>): IUserProfile {
    return new BranchManagerProfile({
      displayName: props.displayName ?? this.displayName,
      photoURL: props.photoURL ?? this.photoURL,
      phoneNumbers: props.phoneNumbers ?? this.phoneNumbers,
      dateOfBirth: props.dateOfBirth ?? this.dateOfBirth,
      branchId: this.branchId // Giữ nguyên chi nhánh quản lý
    })
  }

  equals(other: IUserProfile): boolean {
    if (!other || !other.kind.equals(this.kind)) return false
    const o = other as BranchManagerProfile;
    return this.branchId === o.branchId &&
      this.displayName === o.displayName &&
      this.photoURL === o.photoURL &&
      this.dateOfBirth?.getTime() === o.dateOfBirth?.getTime();
  }

  toJSON() {
    return {
      kind: this.kind.toString(),
      displayName: this.displayName,
      photoURL: this.photoURL,
      dateOfBirth: this.dateOfBirth ? this.dateOfBirth.toISOString().split('T')[0] : undefined,
      branchId: this.branchId,
      phoneNumbers: this.phoneNumbers.map(p => p.toJSON()),
    }
  }
}