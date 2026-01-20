// src/shared/authorization/constants/scopes.constant.ts

import type { PermissionCode } from "../../roles.constant";

/**
 * Scopes cho multi-tenancy
 */
export const SCOPES = {
  SYSTEM: 'system',           // Toàn hệ thống
  BRANCH: 'branch',          // Theo chi nhánh
  COURSE: 'course',          // Theo khóa học
  USER: 'user',              // Theo user
  SELF: 'self'               // Chỉ bản thân
} as const;

export type ScopeCode = typeof SCOPES[keyof typeof SCOPES];

/**
 * Scope contexts - định danh đối tượng
 */
export interface ScopeContext {
  scope: ScopeCode;
  resourceId?: string;       // ID của resource (branchId, courseId, userId)
  branchId?: string;         // ID chi nhánh (nếu có)
  userId?: string;           // ID user (cho scope SELF)
}

/**
 * Permission với scope
 */
export interface ScopedPermission {
  code: PermissionCode;
  scope: ScopeCode;
  context?: Partial<ScopeContext>;
}