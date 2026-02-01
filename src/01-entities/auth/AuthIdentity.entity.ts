import { UserRole } from '../users/base/UserRole.vo';
import { Permission } from '../users/base/Permission.vo';
import {
  ROLES,
  PERMISSIONS,
  type RoleCode,
  type PermissionCode,
} from '../../shared/constants/authorization/auth.domain';
import { getPermissionsForRole } from '../../shared/constants/authorization/auth.policy';

export interface AuthIdentityProps {
  email?: string;
  roles?: UserRole[];
  permissions?: Permission[];
  lastLoginAt?: string | null;
  emailVerified?: boolean;
  customClaims?: Record<string, unknown>;
}

export interface AuthIdentityJSON {
  email: string;
  roles: RoleCode[];
  permissions: PermissionCode[];
  lastLoginAt: string | null;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
}

export class AuthIdentity {
  readonly email: string;
  readonly roles: UserRole[];
  readonly permissions: Permission[];
  readonly lastLoginAt: string | null;
  readonly emailVerified: boolean;
  readonly customClaims: Record<string, unknown>;

  constructor(data: AuthIdentityProps = {}) {
    this.email = (data.email ?? '').toLowerCase().trim();
    this.roles = this.normalizeRoles(data.roles);
    
    // Nếu có permissions truyền vào thì dùng, không thì tính toán từ Roles
    this.permissions = data.permissions && data.permissions.length > 0
      ? this.normalizePermissions(data.permissions)
      : this.calculatePermissionsFromRoles(this.roles);

    this.lastLoginAt = data.lastLoginAt ?? null;
    this.emailVerified = Boolean(data.emailVerified);
    this.customClaims = data.customClaims ?? {};
  }

  /* =====================
   *  BEHAVIOR
   * ===================== */

  hasPermission(permission: Permission): boolean {
    return (
      this.permissions.some(p => p.isWildcard()) ||
      this.permissions.some(p => p.equals(permission))
    );
  }

  hasRole(role: UserRole): boolean {
    return this.roles.some(r => r.equals(role));
  }

  hasAnyRole(...roles: UserRole[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  /* =====================
   *  SERIALIZATION
   * ===================== */

  toJSON(): AuthIdentityJSON {
    return {
      email: this.email,
      roles: this.roles.map(r => r.value),
      permissions: this.permissions.map(p => p.value),
      lastLoginAt: this.lastLoginAt,
      emailVerified: this.emailVerified,
      customClaims: { ...this.customClaims },
    };
  }

  /* =====================
   *  INTERNALS
   * ===================== */

  private normalizeRoles(roles?: UserRole[]): UserRole[] {
    if (roles && roles.length > 0) {
      return roles;
    }
    // Default role: TEACHER
    const defaultRole = UserRole.create(ROLES.TEACHER);
    return defaultRole.isSuccess ? [defaultRole.getValue()] : [];
  }

  private normalizePermissions(perms: Permission[]): Permission[] {
    // Nếu có quyền ALL (*), chỉ cần trả về nó
    if (perms.some(p => p.isWildcard())) {
      const allPerm = Permission.create(PERMISSIONS.ALL);
      return allPerm.isSuccess ? [allPerm.getValue()] : perms;
    }
    
    // Unique permissions
    const unique = new Map<string, Permission>();
    perms.forEach(p => unique.set(p.value, p));
    return Array.from(unique.values());
  }

  private calculatePermissionsFromRoles(roles: UserRole[]): Permission[] {
    const codes = new Set<PermissionCode>();
    
    for (const r of roles) {
      const rolePerms = getPermissionsForRole(r.value);
      for (const p of rolePerms) {
        codes.add(p);
      }
    }

    // Convert codes to Permission VOs
    return Array.from(codes)
      .map(code => Permission.create(code))
      .filter(res => res.isSuccess)
      .map(res => res.getValue());
  }

  get isAdmin(): boolean {
    return this.roles.some(r => r.isAdmin());
  }

  get isTeacher(): boolean {
    return this.roles.some(r => r.isTeacher());
  }
}
