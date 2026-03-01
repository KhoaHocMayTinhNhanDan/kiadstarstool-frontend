import { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';

/**
 * Interface quản lý tài khoản người dùng (Account Management)
 * Bao gồm: Đăng ký, Đổi mật khẩu, Cập nhật thông tin, Xóa tài khoản...
 */
export interface IAuthAccountManagement {
  createUserWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity>;
  sendPasswordResetEmail(email: string): Promise<void>;
  updateEmail(currentEmail: string, newEmail: string): Promise<void>;
  updatePassword(email: string, newPassword: string): Promise<void>;
  deleteUser(): Promise<void>;
  sendEmailVerification(): Promise<void>;
  signInAnonymously(): Promise<AuthIdentity>;

  /**
   * Cập nhật thông tin hiển thị (Tên, Ảnh đại diện) trên hệ thống Auth
   */
  updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void>;

  /**
   * Tải lại thông tin người dùng từ Auth Provider (để cập nhật claims, email verified, v.v.)
   */
  reloadUser(): Promise<void>;
}