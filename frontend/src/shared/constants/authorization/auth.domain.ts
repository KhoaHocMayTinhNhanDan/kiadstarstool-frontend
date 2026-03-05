// src/shared/constants/authorization/auth.domain.ts
/* ==============================
 * 1. DOMAIN LAYER
 * Định nghĩa các hằng số cốt lõi (Core Constants)
 * KHÔNG chứa: Label tiếng Việt, Emoji, Logic phân quyền
 * ============================== */

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TEACHER: 'teacher',
  STAFF: 'staff',
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  /** Wildcard – toàn quyền */
  ALL: '*',

  /* Users */
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete', // Deactivate/soft-delete

  /* Branches */
  BRANCHES_CREATE: 'branches:create',
  BRANCHES_READ: 'branches:read',
  BRANCHES_UPDATE: 'branches:update',
  BRANCHES_DELETE: 'branches:delete',

  /* Courses / Classes */
  COURSES_CREATE: 'courses:create',
  COURSES_READ: 'courses:read',
  COURSES_UPDATE: 'courses:update',
  COURSES_DELETE: 'courses:delete',

  /* Students */
  STUDENTS_CREATE: 'students:create',
  STUDENTS_READ: 'students:read',
  STUDENTS_UPDATE: 'students:update',
  STUDENTS_DELETE: 'students:delete',

  /* Attendance */
  ATTENDANCE_READ: 'attendance:read',
  ATTENDANCE_CREATE: 'attendance:create', // Mark attendance

  /* Finance */
  FINANCE_READ: 'finance:read',
  FINANCE_CREATE: 'finance:create', // Collect tuition, create transactions

  /* Reports */
  REPORTS_READ: 'reports:read',

  /* Roles & Permissions */
  ROLES_READ: 'roles:read',
  ROLES_UPDATE: 'roles:update',
} as const;

export type PermissionCode = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ALL_ROLE_CODES: RoleCode[] = Object.values(ROLES);
export const ALL_PERMISSION_CODES: PermissionCode[] = Object.values(PERMISSIONS);

export const isValidRole = (role: unknown): role is RoleCode => ALL_ROLE_CODES.includes(role as RoleCode);
export const isValidPermission = (p: unknown): p is PermissionCode => ALL_PERMISSION_CODES.includes(p as PermissionCode);