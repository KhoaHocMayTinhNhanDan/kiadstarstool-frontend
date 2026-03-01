// src/01-entities/auth/AuthIdentity.entity.ts

import { Result } from '../shared/base/result';
import { UserRole } from '../users/base/UserRole.vo';
import { Permission } from '../users/base/Permission.vo';

export interface AuthIdentityProps {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles: UserRole[];
  permissions: Permission[];
  lastLoginAt: string | null;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
}

export interface AuthIdentityPrimitives {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles: string[];
  permissions: string[];
  lastLoginAt: string | null;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
}

export class AuthIdentity {
  readonly id: string;
  readonly email: string;
  
  // Snapshot từ Auth Provider (Firebase) để hiển thị UI nhanh (Header/Avatar) mà không cần query DB.
  // Lưu ý: Dữ liệu gốc (Source of Truth) đầy đủ nằm ở User Profile trong Database.
  readonly displayName?: string;
  readonly photoURL?: string;
  
  readonly roles: readonly UserRole[];
  readonly permissions: readonly Permission[];
  readonly lastLoginAt: string | null;
  readonly emailVerified: boolean;
  readonly customClaims: Readonly<Record<string, unknown>>;

  private constructor(props: AuthIdentityProps) {
    this.id = props.id;
    this.email = props.email.toLowerCase().trim();
    this.displayName = props.displayName;
    this.photoURL = props.photoURL;
    this.roles = Object.freeze([...props.roles]);
    this.permissions = Object.freeze([...props.permissions]);
    this.lastLoginAt = props.lastLoginAt;
    this.emailVerified = props.emailVerified;
    this.customClaims = Object.freeze({ ...props.customClaims });
  }

  /* ========= FACTORY ========= */

  static create(props: AuthIdentityProps): Result<AuthIdentity> {
    if (!props.id || props.id.trim().length === 0) {
      return Result.fail<AuthIdentity>('AuthIdentity.id is required');
    }

    if (!props.email || !props.email.includes('@')) {
      return Result.fail<AuthIdentity>('Invalid email for AuthIdentity');
    }

    if (!props.roles || props.roles.length === 0) {
      return Result.fail<AuthIdentity>('User must have at least one role');
    }

    return Result.ok<AuthIdentity>(new AuthIdentity(props));
  }

  static fromPrimitives(p: AuthIdentityPrimitives): Result<AuthIdentity> {
    const mappedRoles: UserRole[] = [];
    for (const roleStr of p.roles) {
      const roleResult = UserRole.create(roleStr);
      if (roleResult.isFailure) return Result.fail(roleResult.getErrorValue());
      mappedRoles.push(roleResult.getValue());
    }

    const mappedPermissions: Permission[] = [];
    for (const permStr of p.permissions) {
      const permResult = Permission.create(permStr);
      if (permResult.isFailure) return Result.fail(permResult.getErrorValue());
      mappedPermissions.push(permResult.getValue());
    }

    return AuthIdentity.create({
      id: p.id,
      email: p.email,
      displayName: p.displayName,
      photoURL: p.photoURL,
      roles: mappedRoles,
      permissions: mappedPermissions,
      lastLoginAt: p.lastLoginAt,
      emailVerified: p.emailVerified,
      customClaims: p.customClaims,
    });
  }

  /* ========= BUSINESS ========= */

  hasPermission(permission: Permission): boolean {
    return (
      this.permissions.some(p => p.isWildcard()) ||
      this.permissions.some(p => p.equals(permission))
    );
  }

  hasRole(role: UserRole): boolean {
    return this.roles.some(r => r.equals(role));
  }

  /* ========= SERIALIZATION ========= */

  toPrimitives(): AuthIdentityPrimitives {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      roles: this.roles.map(r => r.value),
      permissions: this.permissions.map(p => p.value),
      lastLoginAt: this.lastLoginAt,
      emailVerified: this.emailVerified,
      customClaims: { ...this.customClaims },
    };
  }
}
