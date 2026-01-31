// src/02-usecases/usecases/authentication/Login.interactor.ts

import type { IAuthRepository } from '../../ports/repositories/IAuthRepository';
import type { IAuthPresenter } from '../../ports/presenters/IAuthPresenter';
import type { UserAuth } from '@/01-entities/business/users/UserAuth.entity';
import { AuthError } from '@/01-entities/errors/AuthError';

export class LoginInteractor {
  private readonly authRepository: IAuthRepository;
  private readonly authPresenter: IAuthPresenter;
  
  constructor(
    authRepository: IAuthRepository,
    authPresenter: IAuthPresenter,
  ) {
    this.authRepository = authRepository;
    this.authPresenter = authPresenter;
  }

  async execute(payload: { email: string; password: string }): Promise<void> {
    try {
      // 1. Validate input
      this.validateInput(payload);

      // 2. Authenticate via repository
      const userAuth = await this.authRepository.login(payload);

      // 3. Validate authentication response
      this.validateUserAuth(userAuth);

      // 4. Present success
      this.authPresenter.loginSuccess(userAuth);

    } catch (error) {
      this.handleError(error);
    }
  }

  /* =====================
   *  PRIVATE METHODS
   * ===================== */

  private validateInput(payload: { email: string; password: string }): void {
    const { email, password } = payload;

    // Email validation
    if (!email || email.trim().length === 0) {
      throw AuthError.invalidCredentials();
    }

    // Password validation
    if (!password || password.trim().length === 0) {
      throw AuthError.invalidCredentials();
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw AuthError.invalidCredentials();
    }

    // Password minimum length
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw AuthError.invalidCredentials();
    }
  }

  /**
   * Validate the UserAuth entity
   * Dựa trên UserAuth entity thực tế của bạn
   */
  private validateUserAuth(userAuth: UserAuth): void {
    // Check if userAuth exists and has email
    if (!userAuth || !userAuth.email || userAuth.email.trim().length === 0) {
      throw AuthError.unknown('Invalid user data received from authentication service');
    }

    // Check if user has at least one role
    if (!userAuth.roles || userAuth.roles.length === 0) {
      throw AuthError.unknown('User has no roles assigned');
    }

    // Optional: Check email verification if required by your business rules
    // Nếu ứng dụng của bạn yêu cầu xác thực email
    if (this.isEmailVerificationRequired() && !userAuth.emailVerified) {
      throw AuthError.emailNotVerified();
    }

    // Optional: Check custom claims for account status
    // Nếu bạn lưu trạng thái tài khoản trong customClaims
    if (userAuth.customClaims?.isBlocked === true) {
      throw AuthError.accountBlocked();
    }
  }

  private handleError(error: unknown): void {
    // If it's already an AuthError
    if (error instanceof AuthError) {
      this.authPresenter.loginFailed(error.message);
      return;
    }

    // Handle Error instances
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (this.isInvalidCredentialsError(errorMessage)) {
        this.authPresenter.loginFailed('Invalid email or password');
      
      } else if (this.isRateLimitError(errorMessage)) {
        this.authPresenter.loginFailed('Too many login attempts. Please try again later.');
      
      } else if (this.isNetworkError(errorMessage)) {
        this.authPresenter.loginFailed('Network error. Please check your connection.');
      
      } else if (this.isEmailNotVerifiedError(errorMessage)) {
        // Xử lý lỗi email chưa xác thực từ Firebase
        this.authPresenter.loginFailed('Please verify your email before logging in.');
      
      } else {
        this.authPresenter.loginFailed('Login failed. Please try again.');
      }
    
    } else {
      this.authPresenter.loginFailed('An unexpected error occurred during login');
    }
  }

  /* =====================
   *  HELPER METHODS
   * ===================== */

  /**
   * Kiểm tra xem ứng dụng có yêu cầu xác thực email không
   * Có thể config từ environment hoặc business rules
   */
  private isEmailVerificationRequired(): boolean {
    // Trả về true nếu ứng dụng của bạn yêu cầu xác thực email
    // Có thể đọc từ config: return import.meta.env.VITE_REQUIRE_EMAIL_VERIFICATION === 'true'
    return true; // hoặc false tùy config
  }

  private isInvalidCredentialsError(errorMessage: string): boolean {
    const patterns = [
      'invalid-credential',
      'wrong-password',
      'user-not-found',
      'invalid-email',
    ];
    return patterns.some(pattern => errorMessage.includes(pattern));
  }

  private isRateLimitError(errorMessage: string): boolean {
    return errorMessage.includes('too-many-requests');
  }

  private isNetworkError(errorMessage: string): boolean {
    return errorMessage.includes('network-request-failed') || 
           errorMessage.includes('network-error');
  }

  private isEmailNotVerifiedError(errorMessage: string): boolean {
    return errorMessage.includes('email-not-verified') ||
           errorMessage.includes('unverified-email');
  }
}

export const createLoginInteractor = (
  authRepository: IAuthRepository,
  authPresenter: IAuthPresenter,
): LoginInteractor => {
  return new LoginInteractor(authRepository, authPresenter);
};