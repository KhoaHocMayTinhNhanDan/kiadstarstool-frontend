// src/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession.ts

/**
 * Interface chuyên biệt cho quản lý Phiên làm việc (Session)
 * Bao gồm: Token JWT
 */
export interface IAuthSession {
  /**
   * Get authentication token (JWT)
   * @returns Authentication token or null
   */
  getIdToken(): Promise<string | null>;

  /**
   * Refresh authentication token
   */
  refreshToken(): Promise<void>;
}