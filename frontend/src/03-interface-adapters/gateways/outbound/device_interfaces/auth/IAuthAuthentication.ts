// src/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication.ts
import type { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';

/**
 * Interface chuyên biệt cho các tác vụ Xác thực (Authentication)
 * Bao gồm: Đăng nhập, Đăng xuất, Lấy user hiện tại, Lắng nghe trạng thái
 */
export interface IAuthAuthentication {
  /**
   * Sign in with email and password
   * @param email - User email
   * @param password - User password
   * @returns Authenticated AuthIdentity entity
   * @throws Error on authentication failure
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity>;

  /**
   * Sign out current user
   */
  signOut(): Promise<void>;

  /**
   * Get currently authenticated user
   * @returns AuthIdentity if authenticated, null otherwise
   */
  getCurrentUser(): Promise<AuthIdentity | null>;

  /**
   * Listen to authentication state changes
   * @param callback - Called when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged(callback: (user: AuthIdentity | null) => void): () => void;
}