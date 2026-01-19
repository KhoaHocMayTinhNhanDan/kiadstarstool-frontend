// src/03-interface-adapters/controllers/Auth.controller.ts

import type { LoginInteractor } from '@/02-usecases/usecases/authentication/Login.interactor';
import type { LogoutInteractor } from '@/02-usecases/usecases/authentication/Logout.interactor';
import type { RegisterInteractor } from '@/02-usecases/usecases/authentication/Register.interactor';
import type { RestoreSessionInteractor } from '@/02-usecases/usecases/authentication/RestoreSession.interactor';

/**
 * Auth Controller - Interface Adapter Layer
 * 
 * Handles HTTP requests (or UI events) and delegates to use cases
 * Formats inputs and outputs between external world and use cases
 */
export class AuthController {
  private readonly loginInteractor: LoginInteractor;
  private readonly logoutInteractor?: LogoutInteractor;
  private readonly registerInteractor?: RegisterInteractor;
  private readonly restoreSessionInteractor?: RestoreSessionInteractor;
  
  constructor(
    loginInteractor: LoginInteractor,
    logoutInteractor?: LogoutInteractor,
    registerInteractor?: RegisterInteractor,
    restoreSessionInteractor?: RestoreSessionInteractor,
  ) {
    this.loginInteractor = loginInteractor;
    this.logoutInteractor = logoutInteractor;
    this.registerInteractor = registerInteractor;
    this.restoreSessionInteractor = restoreSessionInteractor;
  }

  /* =====================
   *  PUBLIC API
   * ===================== */

  /**
   * Handle login request
   * @param credentials - Email and password
   * @returns Promise that resolves when login completes
   */
  async login(credentials: { email: string; password: string }): Promise<void> {
    try {
      await this.loginInteractor.execute(credentials);
    } catch (error) {
      // Controller can handle errors here if needed
      // By default, errors are handled by the presenter
      throw error;
    }
  }

  /**
   * Handle logout request
   */
  async logout(): Promise<void> {
    if (!this.logoutInteractor) {
      throw new Error('Logout interactor not configured');
    }
    await this.logoutInteractor.execute();
  }

  /**
   * Handle registration request
   */
  async register(userData: {
    email: string;
    password: string;
    confirmPassword: string;
    // Additional registration fields can be added here
  }): Promise<void> {
    if (!this.registerInteractor) {
      throw new Error('Register interactor not configured');
    }
    await this.registerInteractor.execute(userData);
  }

  /**
   * Restore user session (on app startup)
   */
  async restoreSession(): Promise<void> {
    if (!this.restoreSessionInteractor) {
      throw new Error('RestoreSession interactor not configured');
    }
    await this.restoreSessionInteractor.execute();
  }

  /* =====================
   *  UTILITY METHODS
   * ===================== */

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}