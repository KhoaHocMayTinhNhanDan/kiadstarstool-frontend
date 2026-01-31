// src/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver.ts

import type { UserAuth } from '@/01-entities/auth/AuthIdentity.entity';


/**
 * Device Interface for Authentication
 * 
 * Abstraction layer for authentication providers (Firebase, Auth0, Mock, etc.)
 * Follows Ports & Adapters pattern - this is a "port"
 */
export interface IAuthDriver {
  
  /* =====================
   *  CORE AUTH OPERATIONS
   * ===================== */

  /**
   * Sign in with email and password
   * @param email - User email
   * @param password - User password
   * @returns Authenticated UserAuth entity
   * @throws Error on authentication failure
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<UserAuth>;

  /**
   * Sign out current user
   */
  signOut(): Promise<void>;

  /**
   * Get currently authenticated user
   * @returns UserAuth if authenticated, null otherwise
   */
  getCurrentUser(): Promise<UserAuth | null>;

  /* =====================
   *  PASSWORD MANAGEMENT
   * ===================== */

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

  /* =====================
   *  SESSION MANAGEMENT
   * ===================== */

  /**
   * Get authentication token (JWT)
   * @returns Authentication token or null
   */
  getIdToken(): Promise<string | null>;

  /**
   * Refresh authentication token
   */
  refreshToken(): Promise<void>;

  /* =====================
   *  USER MANAGEMENT
   * ===================== */

  /**
   * Create new user with email and password
   * @param email - User email
   * @param password - User password
   * @returns Created UserAuth
   */
  createUserWithEmailAndPassword(email: string, password: string): Promise<UserAuth>;

  /**
   * Delete current user account
   */
  deleteUser(): Promise<void>;

  /**
   * Send email verification
   */
  sendEmailVerification(): Promise<void>;

  /* =====================
   *  OBSERVERS
   * ===================== */

  /**
   * Listen to authentication state changes
   * @param callback - Called when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged(callback: (user: UserAuth | null) => void): () => void;
}