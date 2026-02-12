// src/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement.ts
import type { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';

/**
 * Interface chuyên biệt cho quản lý Tài khoản (Account Management)
 * Bao gồm: Đổi mật khẩu, Reset mật khẩu, Cập nhật email, Xóa tài khoản
 */
export interface IAuthAccountManagement {
  /**
   * Send password reset email
   * @param email - User email
   */
  sendPasswordResetEmail(email: string): Promise<void>;

  /**
   * Update user's email
   * @param currentEmail - Current email
   * @param newEmail - New email
   */
  updateEmail(currentEmail: string, newEmail: string): Promise<void>;

  /**
   * Update user's password
   * @param email - User email
   * @param newPassword - New password
   */
  updatePassword(email: string, newPassword: string): Promise<void>;

  /**
   * Create new user with email and password
   * @param email - User email
   * @param password - User password
   * @returns Created AuthIdentity
   */
  createUserWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity>;

  /**
   * Delete current user account
   */
  deleteUser(): Promise<void>;

  /**
   * Send email verification
   */
  sendEmailVerification(): Promise<void>;
}