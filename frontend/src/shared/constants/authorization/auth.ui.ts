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
  [PERMISSIONS.ALL]: 'Toàn quyền hệ thống (Super Admin)',

  // Users
  [PERMISSIONS.USERS_CREATE]: 'Tạo người dùng mới',
  [PERMISSIONS.USERS_READ]: 'Xem danh sách và chi tiết người dùng',
  [PERMISSIONS.USERS_UPDATE]: 'Cập nhật thông tin và phân quyền người dùng',
  [PERMISSIONS.USERS_DELETE]: 'Vô hiệu hóa tài khoản người dùng',

  // Branches
  [PERMISSIONS.BRANCHES_CREATE]: 'Tạo chi nhánh mới',
  [PERMISSIONS.BRANCHES_READ]: 'Xem danh sách và chi tiết chi nhánh',
  [PERMISSIONS.BRANCHES_UPDATE]: 'Cập nhật thông tin chi nhánh',
  [PERMISSIONS.BRANCHES_DELETE]: 'Xóa chi nhánh',

  // Courses
  [PERMISSIONS.COURSES_CREATE]: 'Tạo khóa học/lớp học mới',
  [PERMISSIONS.COURSES_READ]: 'Xem danh sách và chi tiết khóa học',
  [PERMISSIONS.COURSES_UPDATE]: 'Cập nhật thông tin khóa học',
  [PERMISSIONS.COURSES_DELETE]: 'Xóa khóa học',

  // Students
  [PERMISSIONS.STUDENTS_CREATE]: 'Tạo hồ sơ học viên mới',
  [PERMISSIONS.STUDENTS_READ]: 'Xem danh sách và chi tiết học viên',
  [PERMISSIONS.STUDENTS_UPDATE]: 'Cập nhật thông tin học viên',
  [PERMISSIONS.STUDENTS_DELETE]: 'Xóa (lưu trữ) hồ sơ học viên',

  // Attendance
  [PERMISSIONS.ATTENDANCE_READ]: 'Xem lịch sử điểm danh',
  [PERMISSIONS.ATTENDANCE_CREATE]: 'Thực hiện điểm danh',

  // Finance
  [PERMISSIONS.FINANCE_READ]: 'Xem báo cáo tài chính, lịch sử giao dịch',
  [PERMISSIONS.FINANCE_CREATE]: 'Tạo giao dịch (thu học phí, chi phí)',

  // Reports
  [PERMISSIONS.REPORTS_READ]: 'Xem báo cáo tổng hợp',

  // Roles
  [PERMISSIONS.ROLES_READ]: 'Xem cấu hình vai trò và quyền hạn',
  [PERMISSIONS.ROLES_UPDATE]: 'Chỉnh sửa phân quyền cho vai trò',
};

// Cải tiến: Nhóm các quyền theo nghiệp vụ để dễ quản lý trên UI
export const PERMISSION_GROUPS: Array<{
  name: string;
  description: string;
  codes: PermissionCode[];
}> = [
  {
    name: 'Quản trị hệ thống',
    description: 'Các quyền quản lý cấu hình và người dùng cấp cao.',
    codes: [
      PERMISSIONS.USERS_CREATE, 
      PERMISSIONS.USERS_READ, 
      PERMISSIONS.USERS_UPDATE, 
      PERMISSIONS.USERS_DELETE, 
      PERMISSIONS.ROLES_READ,
      PERMISSIONS.ROLES_UPDATE,
      PERMISSIONS.ALL
    ],
  },
  {
    name: 'Quản lý vận hành',
    description: 'Quản lý các chi nhánh và khóa học/lớp học.',
    codes: [PERMISSIONS.BRANCHES_CREATE, PERMISSIONS.BRANCHES_READ, PERMISSIONS.BRANCHES_UPDATE, PERMISSIONS.BRANCHES_DELETE, PERMISSIONS.COURSES_CREATE, PERMISSIONS.COURSES_READ, PERMISSIONS.COURSES_UPDATE, PERMISSIONS.COURSES_DELETE],
  },
  {
    name: 'Quản lý học viên',
    description: 'Quản lý hồ sơ, điểm danh và các vấn đề liên quan đến học viên.',
    codes: [PERMISSIONS.STUDENTS_CREATE, PERMISSIONS.STUDENTS_READ, PERMISSIONS.STUDENTS_UPDATE, PERMISSIONS.STUDENTS_DELETE, PERMISSIONS.ATTENDANCE_READ, PERMISSIONS.ATTENDANCE_CREATE],
  },
  {
    name: 'Tài chính & Báo cáo',
    description: 'Quản lý các giao dịch tài chính và xem báo cáo.',
    codes: [
      PERMISSIONS.FINANCE_READ,
      PERMISSIONS.FINANCE_CREATE,
      PERMISSIONS.REPORTS_READ,
    ],
  },
];

export const getRoleLabel = (role: RoleCode): string => ROLE_LABELS[role] ?? role;
export const getPermissionLabel = (p: PermissionCode): string => PERMISSION_LABELS[p] ?? p;