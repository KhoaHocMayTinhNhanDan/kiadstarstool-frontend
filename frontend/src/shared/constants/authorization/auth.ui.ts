// src/shared/constants/authorization/auth.ui.ts
/* ==============================
 * 3. UI / PRESENTATION LAYER
 * Định nghĩa cách hiển thị: Label, Emoji, Grouping
 * ============================== */

import { PERMISSIONS, type PermissionCode, type RoleCode } from './auth.domain';

export const ROLE_LABELS: Record<RoleCode, string> = {
  admin: 'Quản trị viên',
  manager: 'Quản lý',
  teacher: 'Giáo viên',
  staff: 'Nhân viên',
};

export const PERMISSION_LABELS: Record<PermissionCode, string> = {
  '*': 'Toàn quyền hệ thống',

  attendance_view: 'Xem dữ liệu điểm danh',
  attendance_edit: 'Chỉnh sửa điểm danh',

  students_view: 'Xem danh sách học sinh',
  students_edit: 'Thêm / Sửa / Xóa học sinh',

  view_reports: 'Xem báo cáo hệ thống',

  manage_users: 'Quản lý người dùng',
  manage_branches: 'Quản lý chi nhánh',

  manage_courses: 'Quản lý khóa học',
  view_courses: 'Xem danh sách khóa học',
};

export const PERMISSION_GROUPS: Array<{
  name: string;
  description: string;
  codes: PermissionCode[];
}> = [
  {
    name: '⭐ Điểm danh',
    description: 'Quản lý việc điểm danh hàng ngày',
    codes: [
      PERMISSIONS.ATTENDANCE_VIEW,
      PERMISSIONS.ATTENDANCE_EDIT,
    ],
  },
  {
    name: '👨‍🎓 Học sinh',
    description: 'Quản lý thông tin học sinh',
    codes: [
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.STUDENT_EDIT,
    ],
  },
  {
    name: '🏢 Cơ sở & Lớp học',
    description: 'Quản lý chi nhánh và lớp học',
    codes: [
      PERMISSIONS.BRANCH_MANAGE,
      PERMISSIONS.COURSE_MANAGE,
      PERMISSIONS.COURSE_VIEW,
    ],
  },
  {
    name: '⚙️ Quản trị & Báo cáo',
    description: 'Quản lý hệ thống và xem báo cáo',
    codes: [
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.USER_MANAGE,
      PERMISSIONS.ALL,
    ],
  },
];

export const getRoleLabel = (role: RoleCode): string => ROLE_LABELS[role] ?? role;
export const getPermissionLabel = (p: PermissionCode): string => PERMISSION_LABELS[p] ?? p;