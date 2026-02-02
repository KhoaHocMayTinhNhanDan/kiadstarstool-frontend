// src/01-entities/users/services/EffectivePermission.service.ts

import { Permission } from '../base/Permission.vo';
import { UserPermissions } from '../base/UserPermissions.vo';
import { PERMISSIONS, type PermissionCode } from '../../../shared/constants/authorization/auth.domain';

export class EffectivePermissionService {
  /**
   * Tính danh sách quyền cuối cùng của user
   *
   * Quy tắc:
   * 1. Role có wildcard (*) → toàn quyền
   * 2. Merge role preset + user override
   * 3. Normalize (unique, wildcard override all)
   */
  static resolve(
    rolePermissions: Permission[],
    userOverrides: UserPermissions,
  ): PermissionCode[] {
    // 1. Wildcard ở role
    if (rolePermissions.some(p => p.isWildcard())) {
      return [PERMISSIONS.ALL];
    }

    const codes = new Set<PermissionCode>();

    // 2. Role preset
    for (const p of rolePermissions) {
      codes.add(p.value);
    }

    // 3. User override
    for (const code of userOverrides.getCodes()) {
      codes.add(code);
    }

    // 4. Wildcard override everything
    if (codes.has(PERMISSIONS.ALL)) {
      return [PERMISSIONS.ALL];
    }

    return Array.from(codes);
  }

  /**
   * Helper check permission
   * (dùng cho Guard / Interactor)
   */
  static can(
    permission: PermissionCode,
    rolePermissions: Permission[],
    userOverrides: UserPermissions,
  ): boolean {
    const effective = this.resolve(rolePermissions, userOverrides);

    return (
      effective.includes(PERMISSIONS.ALL) ||
      effective.includes(permission)
    );
  }
}
