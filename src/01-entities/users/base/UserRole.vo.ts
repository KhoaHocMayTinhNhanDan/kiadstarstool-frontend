// src/01-entities/users/base/UserRole.vo.ts
import { Result } from '../../shared/base/result';
import { ValueObject } from '../../shared/base/ValueObject';
import { ROLES, type RoleCode, isValidRole } from '../../../shared/constants/authorization/auth.domain';

interface UserRoleProps {
  value: RoleCode;
}

/**
 * Domain Value Object: UserRole
 * - Bọc RoleCode (string)
 * - Chứa ý nghĩa nghiệp vụ của Role
 * - KHÔNG chứa UI / policy / preset
 */
export class UserRole extends ValueObject<UserRoleProps> {
  private constructor(props: UserRoleProps) {
    super(props);
  }

  get value(): RoleCode {
    return this.props.value;
  }

  // ===== FACTORY =====

  static create(value: string): Result<UserRole> {
    if (!isValidRole(value)) {
      return Result.fail<UserRole>(`Invalid role: ${value}`);
    }
    return Result.ok<UserRole>(new UserRole({ value: value as RoleCode }));
  }

  // ===== DOMAIN QUERIES =====

  isAdmin(): boolean {
    return this.props.value === ROLES.ADMIN;
  }

  isManager(): boolean {
    return this.props.value === ROLES.MANAGER;
  }

  isTeacher(): boolean {
    return this.props.value === ROLES.TEACHER;
  }

  isStaff(): boolean {
    return this.props.value === ROLES.STAFF;
  }

  // ===== SERIALIZATION =====

  toString(): RoleCode {
    return this.props.value;
  }

  toJSON(): RoleCode {
    return this.toString();
  }
}
