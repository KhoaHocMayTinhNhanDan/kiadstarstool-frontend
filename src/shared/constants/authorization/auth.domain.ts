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

  /* Attendance */
  ATTENDANCE_VIEW: 'attendance_view',
  ATTENDANCE_EDIT: 'attendance_edit',

  /* Students */
  STUDENT_VIEW: 'students_view',
  STUDENT_EDIT: 'students_edit',

  /* Reports */
  REPORT_VIEW: 'view_reports',

  /* Management */
  USER_MANAGE: 'manage_users',
  BRANCH_MANAGE: 'manage_branches',

  /* Courses */
  COURSE_MANAGE: 'manage_courses',
  COURSE_VIEW: 'view_courses',
} as const;

export type PermissionCode = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ALL_ROLE_CODES: RoleCode[] = Object.values(ROLES);
export const ALL_PERMISSION_CODES: PermissionCode[] = Object.values(PERMISSIONS);

export const isValidRole = (role: unknown): role is RoleCode => ALL_ROLE_CODES.includes(role as RoleCode);
export const isValidPermission = (p: unknown): p is PermissionCode => ALL_PERMISSION_CODES.includes(p as PermissionCode);