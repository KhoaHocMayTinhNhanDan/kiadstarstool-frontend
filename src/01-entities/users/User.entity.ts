import { AggregateRoot } from '../shared/base/AggregateRoot';
import { UserId } from './base/UserId.vo';
import { UserRole } from './base/UserRole.vo';
import { UserPermissions } from './base/UserPermissions.vo';
import { type IUserProfile } from './base/IUserProfile.vo';
import { type PermissionCode } from '../../shared/constants/authorization/auth.domain';
import { Permission } from './base/Permission.vo';
import { EffectivePermissionService } from './services/EffectivePermission.service';

interface UserProps {
  readonly id: UserId;
  readonly role: UserRole;
  readonly profile: IUserProfile;
  readonly permissions: UserPermissions; // override permissions
  readonly isActive: boolean;
}

export class User extends AggregateRoot<UserId> {
  public readonly role: UserRole;
  public readonly profile: IUserProfile;
  public readonly permissions: UserPermissions;
  public readonly isActive: boolean;

  private constructor(props: UserProps) {
    super({ id: props.id });
    this.role = props.role;
    this.profile = props.profile;
    this.permissions = props.permissions;
    this.isActive = props.isActive;
  }

  /* ==============================
   * FACTORY
   * ============================== */

  static create(props: {
    id?: UserId;
    role: UserRole;
    profile: IUserProfile;
    permissions?: UserPermissions; // override
    isActive?: boolean;
  }): User {
    if (!props.profile.supportsRole(props.role)) {
      throw new Error('PROFILE_ROLE_MISMATCH');
    }

    return new User({
      id: props.id ?? UserId.create(),
      role: props.role,
      profile: props.profile,
      permissions: props.permissions ?? UserPermissions.empty(),
      isActive: props.isActive ?? true,
    });
  }

  /* ==============================
   * QUERY
   * ============================== */

  /**
   * Chỉ check override permission
   * (Role preset sẽ được xử lý ở Usecase)
   */
  hasOverridePermission(code: PermissionCode): boolean {
    return this.permissions.has(code);
  }


  /**
   * Lấy tất cả các quyền của người dùng (bao gồm cả quyền mặc định từ role và quyền override)
   */
  getEffectivePermissions(rolePermissions: Permission[]): string[] {
    return EffectivePermissionService.resolve(rolePermissions, this.permissions);
  }

  /**
   * Kiểm tra quyền thực tế của User (kết hợp Role Preset + Override)
   * @param permission Quyền cần kiểm tra
   * @param rolePermissions Danh sách quyền mặc định của Role (lấy từ Policy)
   */
  can(permission: PermissionCode, rolePermissions: Permission[]): boolean {
    return EffectivePermissionService.can(
      permission,
      rolePermissions,
      this.permissions
    );
  }

  isDisabled(): boolean {
    return !this.isActive;
  }

  /* ==============================
   * STATE CHANGE (IMMUTABLE)
   * ============================== */

  applyPermissions(permissions: UserPermissions): User {
    return this.clone({ permissions });
  }

  deactivate(): User {
    if (!this.isActive) return this;
    return this.clone({ isActive: false });
  }

  activate(): User {
    if (this.isActive) return this;
    return this.clone({ isActive: true });
  }

  /* ==============================
   * INTERNAL
   * ============================== */

  private clone(overrides: Partial<UserProps>): User {
    return new User({
      id: this.id,
      role: this.role,
      profile: this.profile,
      permissions: this.permissions,
      isActive: this.isActive,
      ...overrides,
    });
  }
}
