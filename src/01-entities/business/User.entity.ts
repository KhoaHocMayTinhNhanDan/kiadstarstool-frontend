// src/01-entities/business/User.entity.ts

import { 
  BaseEntity, 
  ENTITY_STATUS, 
  type EntityStatus 
} from '../Base.entity';
import {
  ROLES,
  type RoleCode,
  PERMISSIONS,
  type PermissionCode,
  isValidRole,
  getPermissionsForRole,
  getRoleLabel,
  getPermissionLabel
} from '../../shared/constants/roles.constant';

export interface UserProps {
  email?: string;
  roles?: RoleCode[];
  permissions?: PermissionCode[];
  branchIds?: string[];

  displayName?: string;
  photoURL?: string;
  phoneNumbers?: string[];

  lastLoginAt?: string | null;
  customClaims?: Record<string, any>;
  emailVerified?: boolean;
  
  // BaseEntity fields (optional in constructor)
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status?: EntityStatus;
}

export class User extends BaseEntity {
  email: string;
  roles: RoleCode[];
  permissions: PermissionCode[];
  branchIds: string[];

  displayName: string;
  photoURL: string;
  phoneNumbers: string[];

  lastLoginAt: string | null;
  customClaims: Record<string, any>;
  emailVerified: boolean;



  constructor(data: UserProps = {}) {
    super(data);

    this.email = (data.email ?? '').toLowerCase().trim();

    // Validate and set roles with proper typing
    this.roles = this._normalizeRoles(data.roles);

    // Calculate permissions from roles
    this.permissions = Array.isArray(data.permissions)
      ? this._normalizePermissions(data.permissions)
      : this._calculatePermissionsFromRoles(this.roles);

    this.branchIds = Array.isArray(data.branchIds)
      ? data.branchIds
      : [];

    this.displayName = (data.displayName ?? '').trim();
    this.photoURL = data.photoURL ?? '/assets/images/default-avatar.png';

    this.phoneNumbers = Array.isArray(data.phoneNumbers)
      ? data.phoneNumbers.map((p) => p.trim())
      : [];

    this.lastLoginAt = data.lastLoginAt ?? null;
    this.customClaims = data.customClaims ?? {};
    this.emailVerified = Boolean(data.emailVerified);
  }

  private _normalizeRoles(roles?: RoleCode[] | string[]): RoleCode[] {
    if (!roles || roles.length === 0) {
      return [ROLES.TEACHER]; // Default role
    }

    // Filter only valid roles with explicit type assertion
    const validRoles: RoleCode[] = [];
    
    for (const role of roles) {
      if (isValidRole(role)) {
        validRoles.push(role);
      }
    }

    if (validRoles.length === 0) {
      return [ROLES.TEACHER]; // Fallback to default
    }

    return validRoles;
  }

  private _normalizePermissions(permissions: PermissionCode[] | string[]): PermissionCode[] {
    const permissionSet = new Set<PermissionCode>();
    
    for (const permission of permissions) {
      if (permission === PERMISSIONS.ALL) {
        // Wildcard permission - clear all and add only wildcard
        permissionSet.clear();
        permissionSet.add(PERMISSIONS.ALL);
        break; // Break loop since wildcard overrides everything
      }
      
      // Check if it's a valid permission
      const isValid = Object.values(PERMISSIONS).includes(permission as PermissionCode);
      if (isValid && permission !== PERMISSIONS.ALL) {
        // Only add if we don't already have wildcard
        if (!permissionSet.has(PERMISSIONS.ALL)) {
          permissionSet.add(permission as PermissionCode);
        }
      }
    }

    return Array.from(permissionSet);
  }

  private _calculatePermissionsFromRoles(roles: RoleCode[]): PermissionCode[] {
    const permissionSet = new Set<PermissionCode>();
    
    for (const role of roles) {
      const rolePermissions = getPermissionsForRole(role);
      
      for (const permission of rolePermissions) {
        if (permission === PERMISSIONS.ALL) {
          // Wildcard permission - clear all and add only wildcard
          permissionSet.clear();
          permissionSet.add(PERMISSIONS.ALL);
          return [PERMISSIONS.ALL]; // Return immediately
        }
        
        // Only add if we don't already have wildcard
        if (!permissionSet.has(PERMISSIONS.ALL)) {
          permissionSet.add(permission);
        }
      }
    }

    return Array.from(permissionSet);
  }

  /* =====================
   *  PERMISSION METHODS
   * ===================== */

  hasPermission(permission: PermissionCode | string): boolean {
    if (!this.isActive) return false;
    
    // Check for wildcard permission
    if (this.permissions.includes(PERMISSIONS.ALL)) {
      return true;
    }
    
    // Type-safe check
    const allPermissionCodes = Object.values(PERMISSIONS);
    if (!allPermissionCodes.includes(permission as PermissionCode)) {
      return false; // Invalid permission code
    }
    
    return this.permissions.includes(permission as PermissionCode);
  }

  hasAnyPermission(permissions: PermissionCode[]): boolean {
    if (!this.isActive) return false;
    
    if (this.permissions.includes(PERMISSIONS.ALL)) {
      return true;
    }
    
    return permissions.some(permission => 
      this.permissions.includes(permission)
    );
  }

  hasAllPermissions(permissions: PermissionCode[]): boolean {
    if (!this.isActive) return false;
    
    if (this.permissions.includes(PERMISSIONS.ALL)) {
      return true;
    }
    
    return permissions.every(permission => 
      this.permissions.includes(permission)
    );
  }

  /* =====================
   *  ROLE METHODS
   * ===================== */

  hasRole(role: RoleCode): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: RoleCode[]): boolean {
    return roles.some(role => this.roles.includes(role));
  }

  getRoleLabels(): string[] {
    return this.roles.map(role => getRoleLabel(role));
  }

  addRole(role: RoleCode): this {
    if (!this.roles.includes(role) && isValidRole(role)) {
      this.roles.push(role);
      this.permissions = this._calculatePermissionsFromRoles(this.roles);
      this.touch();
    }
    return this;
  }

  removeRole(role: RoleCode): this {
    if (this.roles.length > 1 && this.roles.includes(role)) {
      this.roles = this.roles.filter(r => r !== role);
      this.permissions = this._calculatePermissionsFromRoles(this.roles);
      this.touch();
    }
    return this;
  }

  /* =====================
   *  BRANCH METHODS
   * ===================== */

  isInBranch(branchId: string): boolean {
    return this.branchIds.includes(branchId);
  }

  addBranch(branchId: string): this {
    if (!this.branchIds.includes(branchId)) {
      this.branchIds.push(branchId);
      this.touch();
    }
    return this;
  }

  removeBranch(branchId: string): this {
    this.branchIds = this.branchIds.filter(id => id !== branchId);
    this.touch();
    return this;
  }

  /* =====================
   *  USER BEHAVIOR
   * ===================== */

  recordLogin(): this {
    this.lastLoginAt = new Date().toISOString();
    this.touch();
    return this;
  }

  updateProfile(profileData: Partial<{
    displayName: string;
    photoURL: string;
    phoneNumbers: string[];
  }>): this {
    if (profileData.displayName !== undefined) {
      this.displayName = profileData.displayName.trim();
    }
    if (profileData.photoURL !== undefined) {
      this.photoURL = profileData.photoURL;
    }
    if (profileData.phoneNumbers !== undefined) {
      this.phoneNumbers = Array.isArray(profileData.phoneNumbers)
        ? profileData.phoneNumbers.map((p) => p.trim())
        : [];
    }
    this.touch();
    return this;
  }

  /* =====================
   *  OVERRIDES
   * ===================== */

  override get isBlocked(): boolean {
    return this.status === ENTITY_STATUS.BLOCKED;
  }

  override validate(): string[] {
    const errors = super.validate();

    // Email validation
    if (!this.email) {
      errors.push('Email không được để trống');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        errors.push('Email không hợp lệ');
      }
    }

    // Display name validation
    if (!this.displayName) {
      errors.push('Tên hiển thị không được để trống');
    }

    // Roles validation
    if (this.roles.length === 0) {
      errors.push('User phải có ít nhất một vai trò');
    } else {
      const invalidRoles: string[] = [];
      for (const role of this.roles) {
        if (!isValidRole(role)) {
          invalidRoles.push(role);
        }
      }
      if (invalidRoles.length > 0) {
        errors.push(`Có vai trò không hợp lệ: ${invalidRoles.join(', ')}`);
      }
    }

    // Phone numbers validation
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,15}$/;
    this.phoneNumbers.forEach((phone) => {
      if (phone && !phoneRegex.test(phone)) {
        errors.push(`Số điện thoại không hợp lệ: ${phone}`);
      }
    });

    return errors;
  }

  /* =====================
   *  ABSTRACT IMPLEMENTATIONS
   * ===================== */

  clone(): this {
    return Object.assign(
        Object.create(this.constructor.prototype),
        structuredClone(this)
    );
  }


  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      roles: this.roles,
      permissions: this.permissions,
      branchIds: this.branchIds,
      displayName: this.displayName,
      photoURL: this.photoURL,
      phoneNumbers: this.phoneNumbers,
      lastLoginAt: this.lastLoginAt,
      customClaims: this.customClaims,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      status: this.status,
    };
  }

  /* =====================
   *  HELPER GETTERS
   * ===================== */

  get primaryRole(): RoleCode | null {
    return this.roles.length > 0 ? this.roles[0] : null;
  }

  get primaryRoleLabel(): string {
    const primary = this.primaryRole;
    return primary ? getRoleLabel(primary) : 'Không có vai trò';
  }

  get permissionLabels(): string[] {
    return this.permissions.map(permission => 
      getPermissionLabel(permission)
    );
  }

  get isAdmin(): boolean {
    return this.hasRole(ROLES.ADMIN);
  }

  get isManager(): boolean {
    return this.hasRole(ROLES.MANAGER);
  }

  get isTeacher(): boolean {
    return this.hasRole(ROLES.TEACHER);
  }

  get isStaff(): boolean {
    return this.hasRole(ROLES.STAFF);
  }
}