import { User, type UserProps, type UserJSON } from '@/01-entities/users/User.entity';
import { UserId } from '@/01-entities/users/base/UserId.vo';
import { UserRole } from '@/01-entities/users/base/UserRole.vo';
import { UserPermissions } from '@/01-entities/users/base/UserPermissions.vo';
import { type IUserProfile } from '@/01-entities/users/base/IUserProfile.vo';
import { AdminProfile } from '@/01-entities/users/archetypes/admin/AdminProfile.vo';
import { StaffProfile } from '@/01-entities/users/archetypes/staff/StaffProfile.vo';
import { PhoneNumber } from '@/01-entities/shared/base/PhoneNumber.vo';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';

export class UserMapper {
  /**
   * Chuyển đổi từ JSON (dữ liệu thô từ DB/API) sang User Entity.
   * Đây là quá trình "Hydration".
   */
  public static toDomain(json: UserJSON): User {
    const profile = this.mapProfileToDomain(json.profile);

    const userProps: UserProps = {
      id: UserId.create(json.id),
      email: json.email,
      role: UserRole.create(json.role).getValue(),
      profile: profile,
      permissions: UserPermissions.fromCodes(json.permissions as PermissionCode[]).getValue(),
      isActive: json.isActive,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    };

    return User.create(userProps);
  }

  /**
   * Chuyển đổi từ User Entity sang JSON để lưu trữ.
   * Đây là quá trình "Dehydration".
   */
  public static toPersistence(user: User): UserJSON {
    return user.toJSON();
  }

  /**
   * Helper để map đúng loại Profile dựa trên 'kind'
   */
  private static mapProfileToDomain(profileJson: any): IUserProfile {
    const phoneNumbers = (profileJson.phoneNumbers || []).map((p: any) =>
      PhoneNumber.create(p.value, p.label)
    );

    switch (profileJson.kind) {
      case 'admin':
        return new AdminProfile({
          displayName: profileJson.displayName,
          photoURL: profileJson.photoURL,
          phoneNumbers: phoneNumbers,
          adminLevel: profileJson.adminLevel,
          managedBranches: profileJson.managedBranches,
        });
      case 'staff':
        return new StaffProfile({
          displayName: profileJson.displayName,
          photoURL: profileJson.photoURL,
          phoneNumbers: phoneNumbers,
          department: profileJson.department,
        });
      // Thêm các case khác cho Teacher, Manager... ở đây
      default:
        // PRODUCT-READY FIX:
        // Không nên fallback âm thầm về StaffProfile vì có thể gây lỗi logic nghiệp vụ hoặc bảo mật.
        // Nên throw error để phát hiện dữ liệu không nhất quán.
        throw new Error(`[UserMapper] Critical Data Error: Unknown profile kind "${profileJson.kind}" for user.`);
    }
  }
}
