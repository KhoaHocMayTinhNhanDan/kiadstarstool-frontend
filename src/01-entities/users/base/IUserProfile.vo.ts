// src/01-entities/users/base/IUserProfile.vo.ts

import { UserRole } from './UserRole.vo'
import { Permission } from './Permission.vo'
import { PhoneNumber } from '../../shared/base/PhoneNumber.vo'


/**
 * Interface cho các loại Profile khác nhau (Admin, Staff, Teacher...)
 * Đảm bảo tính đa hình (Polymorphism) cho User Entity.
 */
export interface IUserProfile {
  /**
   * Discriminator của Profile
   * Gắn chặt với Domain UserRole
   */
  readonly kind: UserRole

  readonly displayName: string
  readonly photoURL?: string

  /**
   * Danh sách số điện thoại (mỗi số có mô tả riêng)
   */
  readonly phoneNumbers: readonly PhoneNumber[]

  /**
   * Kiểm tra xem profile có thỏa mãn vai trò được giao không.
   * Ví dụ: StaffProfile chỉ thỏa mãn role STAFF.
   */
  supportsRole(role: UserRole): boolean

  /**
   * Kiểm tra xem profile có quyền hạn cụ thể này không.
   */
  supportsPermission(permission: Permission): boolean

  toJSON(): unknown
  equals(other: IUserProfile): boolean
}
