// src/01-entities/users/base/Permission.vo.ts
import { Result } from '../../shared/base/result';
import { ValueObject } from '../../shared/base/ValueObject';
import { PERMISSIONS, type PermissionCode, isValidPermission } from '../../../shared/constants/authorization/auth.domain';

interface PermissionProps {
  value: PermissionCode;
}

/**
 * Domain Value Object: Permission
 * - Bọc PermissionCode
 * - Handle wildcard (*)
 * - Centralize permission logic
 */
export class Permission extends ValueObject<PermissionProps> {
  private constructor(props: PermissionProps) {
    super(props);
  }

  get value(): PermissionCode {
    return this.props.value;
  }

  // ===== FACTORY =====

  static create(value: string): Result<Permission> {
    if (!isValidPermission(value)) {
      return Result.fail<Permission>(`Invalid permission: ${value}`);
    }
    return Result.ok<Permission>(new Permission({ value: value as PermissionCode }));
  }

  // ===== DOMAIN QUERIES =====

  isWildcard(): boolean {
    return this.props.value === PERMISSIONS.ALL;
  }

  /**
   * Permission này có cho phép permission khác không?
   * - '*' cho phép tất cả
   * - còn lại phải equals
   */
  allows(required: Permission): boolean {
    if (this.isWildcard()) return true;
    return this.equals(required);
  }

  // ===== SERIALIZATION =====

  toString(): PermissionCode {
    return this.props.value;
  }

  toJSON(): PermissionCode {
    return this.props.value;
  }
}
