// src/01-entities/users/base/UserPermissions.vo.ts

import { ValueObject } from '../../shared/base/ValueObject';
import { Result } from '../../shared/base/result';
import { Permission } from './Permission.vo';
import { PERMISSIONS, type PermissionCode } from '../../../shared/constants/authorization/auth.domain';

interface UserPermissionsProps {
  /**
   * Danh sách permission gốc của user
   * - Bao gồm permission từ role preset
   * - Và permission override (grant / revoke)
   */
  permissions: Permission[];
}

export class UserPermissions extends ValueObject<UserPermissionsProps> {
  private constructor(props: UserPermissionsProps) {
    super(props);
  }

  /* ==============================
   * FACTORY METHODS
   * ============================== */

  static empty(): UserPermissions {
    return new UserPermissions({ permissions: [] });
  }

  static create(permissions: Permission[]): Result<UserPermissions> {
    return Result.ok(
      new UserPermissions({
        permissions: UserPermissions.normalize(permissions),
      }),
    );
  }

  /**
   * Build từ permission codes (thường dùng khi hydrate từ DB)
   */
  static fromCodes(codes: PermissionCode[]): Result<UserPermissions> {
    const perms = codes
      .map(code => Permission.create(code))
      .filter(r => r.isSuccess)
      .map(r => r.getValue());

    return UserPermissions.create(perms);
  }

  /* ==============================
   * CORE LOGIC
   * ============================== */

  /**
   * Check user có permission hay không
   * - Wildcard (*) luôn pass
   */
  has(permission: PermissionCode): boolean {
    if (this.hasWildcard()) return true;

    return this.props.permissions.some(p => p.value === permission);
  }

  hasAny(permissions: PermissionCode[]): boolean {
    return permissions.some(p => this.has(p));
  }

  hasAll(permissions: PermissionCode[]): boolean {
    return permissions.every(p => this.has(p));
  }

  /**
   * Kiểm tra có quyền toàn bộ không
   */
  hasWildcard(): boolean {
    return this.props.permissions.some(p => p.value === PERMISSIONS.ALL);
  }

  /* ==============================
   * MUTATION (IMMUTABLE)
   * ============================== */

  grant(permission: PermissionCode): UserPermissions {
    if (this.has(permission)) return this;

    const result = Permission.create(permission);
    if (result.isFailure) return this;

    return new UserPermissions({
      permissions: UserPermissions.normalize([
        ...this.props.permissions,
        result.getValue(),
      ]),
    });
  }

  revoke(permission: PermissionCode): UserPermissions {
    return new UserPermissions({
      permissions: this.props.permissions.filter(p => p.value !== permission),
    });
  }

  merge(other: UserPermissions): UserPermissions {
    return new UserPermissions({
      permissions: UserPermissions.normalize([
        ...this.props.permissions,
        ...other.props.permissions,
      ]),
    });
  }

  /* ==============================
   * EXPORT / QUERY
   * ============================== */

  getAll(): Permission[] {
    return [...this.props.permissions];
  }

  getCodes(): PermissionCode[] {
    return this.props.permissions.map(p => p.value);
  }

  isEmpty(): boolean {
    return this.props.permissions.length === 0;
  }

  /* ==============================
   * INTERNAL HELPERS
   * ============================== */

  private static normalize(perms: Permission[]): Permission[] {
    const map = new Map<PermissionCode, Permission>();

    for (const p of perms) {
      map.set(p.value, p);
    }

    // Nếu có wildcard → chỉ giữ wildcard
    if (map.has(PERMISSIONS.ALL)) {
      return [map.get(PERMISSIONS.ALL)!];
    }

    return Array.from(map.values());
  }
}
