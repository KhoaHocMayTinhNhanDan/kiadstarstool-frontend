// src/shared/constants/authorization/auth.policy.ts
/* ==============================
 * 2. POLICY / APPLICATION LAYER
 * Định nghĩa "Luật chơi": Role nào có quyền gì?
 * ============================== */

import { PERMISSIONS, type PermissionCode, type RoleCode } from './auth.domain';
import { Permission } from '../../../01-entities/users/base/Permission.vo';

export const ROLE_PRESETS: Record<RoleCode, PermissionCode[]> = {
  admin: [
    PERMISSIONS.ALL, // Admin toàn quyền
  ],

  manager: [
    // Cải tiến: Quyền của Manager được định nghĩa chi tiết hơn
    PERMISSIONS.USERS_READ,
    PERMISSIONS.BRANCHES_READ,
    PERMISSIONS.BRANCHES_UPDATE,
    PERMISSIONS.COURSES_READ,
    PERMISSIONS.COURSES_CREATE,
    PERMISSIONS.COURSES_UPDATE,
    PERMISSIONS.STUDENTS_READ,
    PERMISSIONS.STUDENTS_CREATE,
    PERMISSIONS.STUDENTS_UPDATE,
    PERMISSIONS.ATTENDANCE_READ,
    PERMISSIONS.ATTENDANCE_CREATE,
    PERMISSIONS.FINANCE_READ,
    PERMISSIONS.FINANCE_CREATE,
    PERMISSIONS.REPORTS_READ,
  ],

  teacher: [
    PERMISSIONS.COURSES_READ,
    PERMISSIONS.STUDENTS_READ,
    PERMISSIONS.ATTENDANCE_READ,
    PERMISSIONS.ATTENDANCE_CREATE,
    PERMISSIONS.REPORTS_READ, // Có thể giới hạn chỉ xem báo cáo của lớp mình dạy
  ],

  staff: [
    PERMISSIONS.BRANCHES_READ,
    PERMISSIONS.COURSES_READ,
    PERMISSIONS.STUDENTS_READ,
    PERMISSIONS.ATTENDANCE_READ,
    PERMISSIONS.FINANCE_READ,
    PERMISSIONS.FINANCE_CREATE, // Nhân viên lễ tân có thể thu học phí
  ],
};

/**
 * Helper để lấy danh sách quyền mặc định cho một Role
 */
export const getPermissionsForRole = (role: RoleCode): PermissionCode[] => ROLE_PRESETS[role] ?? [];


export const buildRolePermissions = (role: RoleCode): Permission[] => {
  return (ROLE_PRESETS[role] ?? [])
    .map(code => Permission.create(code))
    .filter(r => r.isSuccess)
    .map(r => r.getValue());
};
