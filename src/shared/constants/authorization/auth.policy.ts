/* ==============================
 * 2. POLICY / APPLICATION LAYER
 * Định nghĩa "Luật chơi": Role nào có quyền gì?
 * ============================== */

import { PERMISSIONS, type PermissionCode, type RoleCode } from './auth.domain';

export const ROLE_PRESETS: Record<RoleCode, PermissionCode[]> = {
  admin: [
    PERMISSIONS.ALL, // Admin toàn quyền
  ],

  manager: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCE_EDIT,
    PERMISSIONS.STUDENT_VIEW,
    PERMISSIONS.STUDENT_EDIT,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.BRANCH_MANAGE,
    PERMISSIONS.COURSE_MANAGE,
    PERMISSIONS.COURSE_VIEW,
  ],

  teacher: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCE_EDIT,
    PERMISSIONS.STUDENT_VIEW,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.COURSE_VIEW,
  ],

  staff: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.STUDENT_VIEW,
    PERMISSIONS.COURSE_VIEW,
  ],
};

/**
 * Helper để lấy danh sách quyền mặc định cho một Role
 */
export const getPermissionsForRole = (role: RoleCode): PermissionCode[] => ROLE_PRESETS[role] ?? [];