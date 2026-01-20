// src/shared/authorization/constants/roles.constant.ts

import type { RoleCode } from "../../roles.constant";

export interface RoleDefinition {
  code: RoleCode;
  name: string;
  description: string;
  
  // Kế thừa từ role khác
  inherits?: RoleCode[];
  
  // Base permissions (không phụ thuộc scope)
  basePermissions: Permissions[];
  
  // Scoped permissions
  scopedPermissions: ScopedPermission[];
  
  // Permission overrides (ghi đè permissions từ inherited roles)
  overrides?: Array<{
    permission: Permissions;
    action: 'grant' | 'revoke' | 'modify';
    scope?: ScopeCode;
  }>;
  
  // Constraints
  constraints?: {
    maxUsers?: number;              // Số user tối đa có role này
    maxBranchesPerUser?: number;    // Số chi nhánh tối đa/user
    allowedBranches?: string[];     // Chi nhánh được phép
    expirationDays?: number;        // Tự động hết hạn sau X ngày
  };
  
  // Metadata
  isSystem: boolean;                // Role hệ thống (không thể xóa)
  isDefault: boolean;               // Role mặc định cho user mới
  canBeAssigned: boolean;           // Có thể assign cho user
}

export const ROLE_DEFINITIONS: Record<RoleCode, RoleDefinition> = {
  admin: {
    code: 'admin',
    name: 'Quản trị viên hệ thống',
    description: 'Toàn quyền trên tất cả chi nhánh và tính năng',
    basePermissions: [Permissions.ALL],
    scopedPermissions: [],
    isSystem: true,
    isDefault: false,
    canBeAssigned: true
  },
  
  branch_admin: {
    code: 'branch_admin',
    name: 'Quản trị chi nhánh',
    description: 'Toàn quyền trên một chi nhánh cụ thể',
    inherits: ['manager'],
    basePermissions: [],
    scopedPermissions: [
      { code: Permissions.ALL, scope: SCOPES.BRANCH }
    ],
    constraints: {
      maxBranchesPerUser: 1  // Mỗi user chỉ quản lý 1 chi nhánh
    },
    isSystem: false,
    isDefault: false,
    canBeAssigned: true
  },
  
  manager: {
    code: 'manager',
    name: 'Quản lý chi nhánh',
    description: 'Quản lý các hoạt động trong chi nhánh',
    inherits: ['teacher'],
    basePermissions: [
      Permissions.VIEW_REPORTS,
      Permissions.MANAGE_COURSES
    ],
    scopedPermissions: [
      { code: Permissions.MANAGE_USERS, scope: SCOPES.BRANCH },
      { code: PERMISSIONS.STUDENTS_EDIT, scope: SCOPES.BRANCH }
    ],
    constraints: {
      maxBranchesPerUser: 3  // Một manager tối đa quản lý 3 chi nhánh
    },
    isSystem: false,
    isDefault: false,
    canBeAssigned: true
  },
  
  teacher: {
    code: 'teacher',
    name: 'Giáo viên',
    description: 'Giảng dạy và điểm danh',
    basePermissions: [
      PERMISSIONS.ATTENDANCE_VIEW,
      PERMISSIONS.ATTENDANCEANCE_EDIT,
      PERMISSIONS.VIEW_COURSES
    ],
    scopedPermissions: [
      { 
        code: PERMISSIONS.STUDENTS_VIEW, 
        scope: SCOPES.COURSE,
        context: { resourceId: 'assigned' }  // Chỉ xem học sinh lớp được assign
      }
    ],
    isSystem: false,
    isDefault: false,
    canBeAssigned: true
  },
  
  staff: {
    code: 'staff',
    name: 'Nhân viên',
    description: 'Nhân viên hỗ trợ',
    basePermissions: [
      PERMISSIONS.ATTENDANCE_VIEW,
      PERMISSIONS.STUDENTS_VIEW
    ],
    scopedPermissions: [],
    isSystem: false,
    isDefault: true,  // Role mặc định khi tạo user mới
    canBeAssigned: true
  }
};