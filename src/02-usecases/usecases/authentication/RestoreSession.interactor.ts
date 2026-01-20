// src/02-usecases/usecases/authentication/RestoreSession.interactor.ts

import type { IAuthRepository } from '../../ports/input/IAuthRepository';
import type { IAuthPresenter } from '../../ports/output/IAuthPresenter';
import type { UserAuth } from '@/01-entities/business/users/UserAuth.entity';
import { AuthError } from '@/shared/errors/AuthError';

export class RestoreSessionInteractor {
  private readonly authRepository: IAuthRepository;
  private readonly authPresenter: IAuthPresenter;

  constructor(
    authRepository: IAuthRepository,
    authPresenter: IAuthPresenter,
  ) {
    this.authRepository = authRepository;
    this.authPresenter = authPresenter;
  }

  /**
   * Execute session restoration use case
   * Typically called on app startup
   */
  async execute(): Promise<void> {
    try {
      // 1. Attempt to restore session via repository
      const userAuth = await this.authRepository.restoreSession();

      // 2. If no user is found, session restoration is complete (no user)
      if (!userAuth) {
        this.presentNoSession();
        return;
      }

      // 3. Validate the restored user
      this.validateRestoredUser(userAuth);

      // 4. Check session validity (business rules)
      const isValidSession = await this.checkSessionValidity(userAuth);

      if (!isValidSession) {
        // Session is invalid (expired, revoked, etc.)
        this.presentInvalidSession();
        return;
      }

      // 5. Session is valid, present success
      this.presentSessionRestored(userAuth);

    } catch (error) {
      this.handleError(error);
    }
  }

  /* =====================
   *  PRIVATE METHODS
   * ===================== */

  private validateRestoredUser(userAuth: UserAuth): void {
    if (!userAuth.email || userAuth.email.trim().length === 0) {
      throw AuthError.unknown('Invalid user data in session');
    }

    if (!userAuth.roles || userAuth.roles.length === 0) {
      throw AuthError.unknown('User in session has no roles');
    }

    // Check if account is blocked
    if (userAuth.customClaims?.isBlocked === true) {
      throw AuthError.accountBlocked();
    }

    // Check if email verification is required but not verified
    if (this.isEmailVerificationRequired() && !userAuth.emailVerified) {
      throw AuthError.emailNotVerified();
    }
  }

  private async checkSessionValidity(userAuth: UserAuth): Promise<boolean> {
    try {
      // Check session expiration based on last login
      if (userAuth.lastLoginAt) {
        const lastLogin = new Date(userAuth.lastLoginAt);
        const now = new Date();
        const sessionLifetime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        if (now.getTime() - lastLogin.getTime() > sessionLifetime) {
          return false; // Session expired
        }
      }

      // Additional validity checks can be added here:
      // - Token validation
      // - IP address check
      // - Device check
      // - Business-specific rules

      return true;
    } catch {
      return false;
    }
  }

  private presentNoSession(): void {
    // No active session found - this is a normal state (user not logged in)
    console.log('[RestoreSession] No active session found');
    
    // We could call a presenter method like:
    // this.authPresenter.sessionNotFound();
    
    // Or just do nothing, since no session is a valid state
  }

  private presentInvalidSession(): void {
    console.warn('[RestoreSession] Invalid session found');
    
    // Present invalid session
    // this.authPresenter.sessionInvalid();
    
    // For now, we'll treat invalid session as no session
    this.presentNoSession();
  }

  private presentSessionRestored(userAuth: UserAuth): void {
    console.log('[RestoreSession] Session restored for:', userAuth.email);
    
    // Call presenter to update UI with restored user
    // In AuthPresenter, we need to add sessionRestored method
    const presenter = this.authPresenter as any;
    if (presenter.sessionRestored) {
      presenter.sessionRestored(userAuth);
    } else if (presenter.loginSuccess) {
      // Fallback to loginSuccess if sessionRestored not implemented
      presenter.loginSuccess(userAuth);
    }
  }

  private handleError(error: unknown): void {
    console.error('[RestoreSession] Error:', error);

    if (error instanceof AuthError) {
      // Present specific auth errors
      if (error.code === 'ACCOUNT_BLOCKED') {
        // this.authPresenter.accountBlocked();
      } else if (error.code === 'EMAIL_NOT_VERIFIED') {
        // this.authPresenter.emailNotVerified();
      }
    }

    // For other errors, we'll just log and continue without session
    this.presentNoSession();
  }

  private isEmailVerificationRequired(): boolean {
    // Could be from configuration or business rules
    return true; // Default to requiring email verification
  }

  /**
   * Optional: Force session validation (e.g., on sensitive operations)
   */
  async validateCurrentSession(): Promise<UserAuth | null> {
    try {
      const userAuth = await this.authRepository.restoreSession();
      
      if (!userAuth) {
        return null;
      }

      this.validateRestoredUser(userAuth);
      const isValid = await this.checkSessionValidity(userAuth);

      return isValid ? userAuth : null;
    } catch {
      return null;
    }
  }
}

export const createRestoreSessionInteractor = (
  authRepository: IAuthRepository,
  authPresenter: IAuthPresenter,
): RestoreSessionInteractor => {
  return new RestoreSessionInteractor(authRepository, authPresenter);
};