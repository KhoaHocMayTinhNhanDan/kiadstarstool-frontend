import { type IUserProfile } from '../../base/IUserProfile.vo'
import { UserRole } from '../../base/UserRole.vo'
import { Permission } from '../../base/Permission.vo'
import { PhoneNumber } from '../../../shared/value-objects/PhoneNumber.vo'

interface TeacherProfileProps {
  displayName: string
  photoURL?: string
  phoneNumbers?: readonly PhoneNumber[]

  /**
   * Thuộc tính RIÊNG của Teacher (nếu có)
   * Ví dụ: chuyên môn, chứng chỉ...
   */
  specialization?: string
}

export class TeacherProfile implements IUserProfile {
  readonly kind: UserRole
  readonly displayName: string
  readonly photoURL?: string
  readonly phoneNumbers: readonly PhoneNumber[]

  // Teacher-specific
  readonly specialization?: string

  constructor(props: TeacherProfileProps) {
    const roleResult = UserRole.create('teacher')
    if (roleResult.isFailure) {
      throw new Error(roleResult.getErrorValue().toString())
    }

    this.kind = roleResult.getValue()
    this.displayName = props.displayName.trim()
    this.photoURL = props.photoURL
    this.phoneNumbers = props.phoneNumbers ?? []
    this.specialization = props.specialization
  }

  // =====================
  // DOMAIN RULES
  // =====================

  supportsRole(role: UserRole): boolean {
    return role.equals(this.kind)
  }

  supportsPermission(permission: Permission): boolean {
    if (permission.isWildcard()) return false
    return true
  }

  // =====================
  // MUTATION
  // =====================

  update(props: Partial<{ displayName: string; photoURL: string; phoneNumbers: PhoneNumber[] }>): IUserProfile {
    return new TeacherProfile({
      displayName: props.displayName ?? this.displayName,
      photoURL: props.photoURL ?? this.photoURL,
      phoneNumbers: props.phoneNumbers ?? this.phoneNumbers,
      specialization: this.specialization // Giữ nguyên các trường đặc thù
    })
  }

  // =====================
  // EQUALITY
  // =====================

  equals(other: IUserProfile): boolean {
    if (!other || !other.kind.equals(this.kind)) return false
    const o = other as TeacherProfile
    return (
      this.displayName === o.displayName &&
      this.photoURL === o.photoURL &&
      this.specialization === o.specialization &&
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
      specialization: this.specialization,
      phoneNumbers: this.phoneNumbers.map(p => p.toJSON()),
    }
  }
}