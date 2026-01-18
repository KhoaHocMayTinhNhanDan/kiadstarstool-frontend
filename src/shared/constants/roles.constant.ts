/**
 * ==============================
 * DOMAIN ROLES & PERMISSIONS
 * ==============================
 * Single Source of Truth cho:
 * - Vai trò (Role)
 * - Quyền hạn (Permission)
 * - Preset quyền theo vai trò
 *
 * Dùng cho:
 * - Entity (User)
 * - Usecase
 * - Presenter
 * - UI
 */

/* ==============================
 * ROLES
 * ============================== */

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TEACHER: 'teacher',
  STAFF: 'staff',
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];

/* ==============================
 * PERMISSIONS
 * ============================== */

export const PERMISSIONS = {
  /** Wildcard – toàn quyền */
  ALL: '*',

  /* Attendance */
  ATTENDANCE_VIEW: 'attendance_view',
  ATTENDANCEANCE_EDIT: 'attendance_edit',

  /* Students */
  STUDENTS_VIEW: 'students_view',
  STUDENTS_EDIT: 'students_edit',

  /* Reports */
  VIEW_REPORTS: 'view_reports',

  /* Management */
  MANAGE_USERS: 'manage_users',
  MANAGE_BRANCHES: 'manage_branches',

  /* Courses */
  MANAGE_COURSES: 'manage_courses',
  VIEW_COURSES: 'view_courses',
} as const;

export type PermissionCode =
  typeof PERMISSIONS[keyof typeof PERMISSIONS];

/* ==============================
 * LABELS (UI-FRIENDLY)
 * ============================== */

export const ROLE_LABELS: Record<RoleCode, string> = {
  admin: 'Quản trị viên',
  manager: 'Quản lý',
  teacher: 'Giáo viên',
  staff: 'Nhân viên',
};

export const PERMISSION_LABELS: Record<PermissionCode, string> = {
  '*': 'Toàn quyền hệ thống',

  attendance_view: 'Xem dữ liệu điểm danh',
  attendance_edit: 'Thực hiện điểm danh',

  students_view: 'Xem danh sách học sinh',
  students_edit: 'Thêm / Sửa / Xóa học sinh',

  view_reports: 'Xem báo cáo hệ thống',

  manage_users: 'Quản lý tài khoản',
  manage_branches: 'Quản lý cơ sở',

  manage_courses: 'Quản lý lớp học',
  view_courses: 'Xem danh sách lớp học',
};

/* ==============================
 * PERMISSION GROUPS (UI RENDER)
 * ============================== */

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
      PERMISSIONS.ATTENDANCEANCE_EDIT,
    ],
  },
  {
    name: '👨‍🎓 Học sinh',
    description: 'Quản lý thông tin học sinh',
    codes: [
      PERMISSIONS.STUDENTS_VIEW,
      PERMISSIONS.STUDENTS_EDIT,
    ],
  },
  {
    name: '🏢 Cơ sở & Lớp học',
    description: 'Quản lý chi nhánh và lớp học',
    codes: [
      PERMISSIONS.MANAGE_BRANCHES,
      PERMISSIONS.MANAGE_COURSES,
      PERMISSIONS.VIEW_COURSES,
    ],
  },
  {
    name: '⚙️ Quản trị & Báo cáo',
    description: 'Quản lý hệ thống và xem báo cáo',
    codes: [
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.ALL,
    ],
  },
];

/* ==============================
 * ROLE → PERMISSION PRESETS
 * ============================== */

export const ROLE_PRESETS: Record<RoleCode, PermissionCode[]> = {
  admin: [
    PERMISSIONS.ALL, // Admin toàn quyền
  ],

  manager: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCEANCE_EDIT,
    PERMISSIONS.STUDENTS_VIEW,
    PERMISSIONS.STUDENTS_EDIT,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_BRANCHES,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.VIEW_COURSES,
  ],

  teacher: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCEANCE_EDIT,
    PERMISSIONS.STUDENTS_VIEW,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_COURSES,
  ],

  staff: [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.STUDENTS_VIEW,
    PERMISSIONS.VIEW_COURSES,
  ],
};

/* ==============================
 * DERIVED CONSTANTS
 * ============================== */

export const ALL_ROLE_CODES: RoleCode[] = Object.values(ROLES);
export const ALL_PERMISSION_CODES: PermissionCode[] =
  Object.values(PERMISSIONS);

/* ==============================
 * HELPERS (DOMAIN-SAFE)
 * ============================== */

export function isValidRole(role: unknown): role is RoleCode {
  return ALL_ROLE_CODES.includes(role as RoleCode);
}

export function isValidPermission(
  permission: unknown,
): permission is PermissionCode {
  return ALL_PERMISSION_CODES.includes(permission as PermissionCode);
}

export function getPermissionsForRole(
  role: RoleCode,
): PermissionCode[] {
  return ROLE_PRESETS[role] ?? [];
}

export function getRoleLabel(role: RoleCode): string {
  return ROLE_LABELS[role] ?? role;
}

export function getPermissionLabel(
  permission: PermissionCode,
): string {
  return PERMISSION_LABELS[permission] ?? permission;
}
