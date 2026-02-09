// src/01-entities/auth/AuthIdentity.entity.ts

import { UserRole } from '../users/base/UserRole.vo';
import { Permission } from '../users/base/Permission.vo';

export interface AuthIdentityProps {
  id: string;
  email: string;
  roles: UserRole[];
  permissions: Permission[];
  lastLoginAt: string | null;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
}

export interface AuthIdentityPrimitives {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
  lastLoginAt: string | null;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
}

export class AuthIdentity {
  readonly id: string;
  readonly email: string;
  readonly roles: readonly UserRole[];
  readonly permissions: readonly Permission[];
  readonly lastLoginAt: string | null;
  readonly emailVerified: boolean;
  readonly customClaims: Readonly<Record<string, unknown>>;

  private constructor(props: AuthIdentityProps) {
    this.id = props.id;
    this.email = props.email.toLowerCase().trim();
    this.roles = Object.freeze([...props.roles]);
    this.permissions = Object.freeze([...props.permissions]);
    this.lastLoginAt = props.lastLoginAt;
    this.emailVerified = props.emailVerified;
    this.customClaims = Object.freeze({ ...props.customClaims });
  }

  /* ========= FACTORY ========= */

  static create(props: AuthIdentityProps): AuthIdentity {
    if (!props.id) {
      throw new Error('AuthIdentity.id is required');
    }

    if (!props.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (props.roles.length === 0) {
      throw new Error('User must have at least one role');
    }

    return new AuthIdentity(props);
  }

  static fromPrimitives(p: AuthIdentityPrimitives): AuthIdentity {
    const roles = p.roles.map(role => {
      const result = UserRole.create(role);
      if (result.isFailure) {
        throw new Error(result.getErrorValue());
      }
      return result.getValue();
    });

    const permissions = p.permissions.map(perm => {
      const result = Permission.create(perm);
      if (result.isFailure) {
        throw new Error(result.getErrorValue());
      }
      return result.getValue();
    });

    return AuthIdentity.create({
      id: p.id,
      email: p.email,
      roles,
      permissions,
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
      roles: this.roles.map(r => r.value),
      permissions: this.permissions.map(p => p.value),
      lastLoginAt: this.lastLoginAt,
      emailVerified: this.emailVerified,
      customClaims: { ...this.customClaims },
    };
  }
}
