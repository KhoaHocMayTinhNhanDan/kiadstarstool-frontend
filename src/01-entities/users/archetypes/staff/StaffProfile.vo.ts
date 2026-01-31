import { type IUserProfile } from '../../base/IUserProfile.vo'
import { UserRole } from '../../base/UserRole.vo'
import { Permission } from '../../base/Permission.vo'
import { PhoneNumber } from '../../../shared/base/PhoneNumber.vo'

interface StaffProfileProps {
  displayName: string
  photoURL?: string
  phoneNumbers?: readonly PhoneNumber[]

  /**
   * Thuộc tính RIÊNG của Staff (nếu có)
   * Ví dụ: bộ phận, ghi chú nội bộ, ca làm việc...
   */
  department?: string
}

export class StaffProfile implements IUserProfile {
  readonly kind: UserRole
  readonly displayName: string
  readonly photoURL?: string
  readonly phoneNumbers: readonly PhoneNumber[]

  // Staff-specific
  readonly department?: string

  constructor(props: StaffProfileProps) {
    const roleResult = UserRole.create('staff')
    if (roleResult.isFailure) {
      throw new Error(roleResult.getErrorValue().toString())
    }

    this.kind = roleResult.getValue()
    this.displayName = props.displayName.trim()
    this.photoURL = props.photoURL
    this.phoneNumbers = props.phoneNumbers ?? []
    this.department = props.department
  }

  // =====================
  // DOMAIN RULES
  // =====================

  supportsRole(role: UserRole): boolean {
    return role.equals(this.kind)
  }

  supportsPermission(permission: Permission): boolean {
    /**
     * Profile KHÔNG quyết định policy
     * Chỉ chặn những quyền KHÔNG BAO GIỜ được phép
     *
     * Ví dụ:
     * - Staff không bao giờ có wildcard (*)
     */
    if (permission.isWildcard()) return false
    return true
  }

  // =====================
  // EQUALITY
  // =====================

  equals(other: IUserProfile): boolean {
    if (!other) return false
    if (!other.kind.equals(this.kind)) return false

    const o = other as StaffProfile

    return (
      this.displayName === o.displayName &&
      this.photoURL === o.photoURL &&
      this.department === o.department &&
      this.phoneNumbers.length === o.phoneNumbers.length &&
      this.phoneNumbers.every((p, i) => p.equals(o.phoneNumbers[i]))
    )
  }

  // =====================
  // SERIALIZATION
  // =====================

  toJSON() {
    return {
      kind: this.kind.toString(),
      displayName: this.displayName,
      photoURL: this.photoURL,
      department: this.department,
      phoneNumbers: this.phoneNumbers.map(p => p.toJSON()),
    }
  }
}
