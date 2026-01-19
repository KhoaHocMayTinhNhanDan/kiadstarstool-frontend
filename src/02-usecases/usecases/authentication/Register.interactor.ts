// src/02-usecases/usecases/authentication/Register.interactor.ts

import type { IAuthRepository } from '../../ports/input/IAuthRepository';
import type { IAuthPresenter } from '../../ports/output/IAuthPresenter';
import { UserAuth } from '@/01-entities/users/UserAuth.entity';
import { AuthError } from '@/shared/errors/AuthError';

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export class RegisterInteractor {
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
   * Execute registration use case
   */
  async execute(payload: RegisterPayload): Promise<void> {
    try {
      // 1. Validate input
      this.validateInput(payload);

      // 2. Check if passwords match
      if (payload.password !== payload.confirmPassword) {
        throw AuthError.invalidCredentials();
      }

      // 3. Additional business validations
      this.validateBusinessRules(payload);

      // 4. Create user (delegated to repository)
      // Note: In real implementation, repository would handle user creation
      // For now, we'll simulate by logging in (since MockAuthDriver supports createUser)
      const userAuth = await this.simulateRegistration(payload);

      // 5. Validate created user
      this.validateRegisteredUser(userAuth);

      // 6. Present success
      this.presentRegistrationSuccess(userAuth);

    } catch (error) {
      this.handleError(error);
    }
  }

  /* =====================
   *  PRIVATE METHODS
   * ===================== */

  private validateInput(payload: RegisterPayload): void {
    const { email, password } = payload;

    // Email validation
    if (!email || email.trim().length === 0) {
      throw AuthError.invalidCredentials();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw AuthError.invalidCredentials();
    }

    // Password validation
    if (!password || password.trim().length === 0) {
      throw AuthError.invalidCredentials();
    }

    const MIN_PASSWORD_LENGTH = 8;
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw AuthError.invalidCredentials();
    }
  }

  private validateBusinessRules(payload: RegisterPayload): void {
    // Business-specific rules
    
    // Password strength
    if (!this.isStrongPassword(payload.password)) {
      throw new AuthError(
        'INVALID_CREDENTIALS',
        'Password must contain uppercase, lowercase, and numbers'
      );
    }

    // Email domain restrictions (example)
    const blockedDomains = ['tempmail.com', 'trashmail.com'];
    const emailDomain = payload.email.split('@')[1];
    if (blockedDomains.includes(emailDomain.toLowerCase())) {
      throw new AuthError(
        'INVALID_CREDENTIALS',
        'Please use a valid email address'
      );
    }
  }

  private async simulateRegistration(payload: RegisterPayload): Promise<UserAuth> {
    // In a real implementation, this would call a repository method like:
    // return await this.authRepository.register(payload);
    
    // For now with MockAuthDriver, we'll create a user then "login"
    // You'll need to add register method to IAuthRepository and implement it
    // in AuthRepository.ts
    
    // Simulate registration by returning a mock user
    return new UserAuth({
      email: payload.email,
      roles: ['teacher'], // Default role for new users
      emailVerified: false,
      customClaims: {
        isBlocked: false,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        createdAt: new Date().toISOString()
      }
    });
  }

  private validateRegisteredUser(userAuth: UserAuth): void {
    if (!userAuth || !userAuth.email) {
      throw AuthError.unknown('Registration failed - invalid user data');
    }

    // Check if user has at least one role
    if (!userAuth.roles || userAuth.roles.length === 0) {
      throw AuthError.unknown('User has no roles assigned');
    }
  }

  private presentRegistrationSuccess(userAuth: UserAuth): void {
    // In a real implementation, AuthPresenter would have a registrationSuccess method
    // For now, we'll use loginSuccess to indicate user is logged in after registration
    
    // Call presenter (assuming we'll add registration methods to IAuthPresenter)
    // this.authPresenter.registrationSuccess(userAuth);
    
    // Temporary: use loginSuccess
    (this.authPresenter as any).loginSuccess?.(userAuth);
  }

  private handleError(error: unknown): void {
    if (error instanceof AuthError) {
      this.authPresenter.loginFailed(error.message);
      return;
    }

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (errorMessage.includes('email-already-in-use')) {
        this.authPresenter.loginFailed('Email is already registered');
      } else if (errorMessage.includes('weak-password')) {
        this.authPresenter.loginFailed('Password is too weak');
      } else if (errorMessage.includes('invalid-email')) {
        this.authPresenter.loginFailed('Invalid email address');
      } else {
        this.authPresenter.loginFailed('Registration failed. Please try again.');
      }
    } else {
      this.authPresenter.loginFailed('An unexpected error occurred during registration');
    }
  }

  private isStrongPassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
  }
}

export const createRegisterInteractor = (
  authRepository: IAuthRepository,
  authPresenter: IAuthPresenter,
): RegisterInteractor => {
  return new RegisterInteractor(authRepository, authPresenter);
};