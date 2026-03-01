// src/shared/errors/AuthError.ts

export const AuthErrorCode = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  ACCOUNT_BLOCKED: 'ACCOUNT_BLOCKED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNKNOWN: 'UNKNOWN',
} as const

export type AuthErrorCode = typeof AuthErrorCode[keyof typeof AuthErrorCode]

/**
 * Domain-level Authentication Error
 * - Không phụ thuộc Firebase / HTTP
 * - Dùng xuyên suốt Usecase → Presenter → UI
 */
export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(
    code: AuthErrorCode,
    message?: string,
  ) {
    super(message ?? AuthError.defaultMessage(code))
    this.name = 'AuthError'
    this.code = code
  }

  /* =====================
   *  FACTORIES
   * ===================== */

  static invalidCredentials(): AuthError {
    return new AuthError(AuthErrorCode.INVALID_CREDENTIALS)
  }

  static userNotFound(): AuthError {
    return new AuthError(AuthErrorCode.USER_NOT_FOUND)
  }

  static emailNotVerified(): AuthError {
    return new AuthError(AuthErrorCode.EMAIL_NOT_VERIFIED)
  }

  static accountBlocked(): AuthError {
    return new AuthError(AuthErrorCode.ACCOUNT_BLOCKED)
  }

  static sessionExpired(): AuthError {
    return new AuthError(AuthErrorCode.SESSION_EXPIRED)
  }

  static unauthorized(): AuthError {
    return new AuthError(AuthErrorCode.UNAUTHORIZED)
  }

  static unknown(message?: string): AuthError {
    return new AuthError(AuthErrorCode.UNKNOWN, message)
  }

  /* =====================
   *  DEFAULT MESSAGES
   * ===================== */

  private static defaultMessage(code: AuthErrorCode): string {
    switch (code) {
      case AuthErrorCode.INVALID_CREDENTIALS:
        return 'Invalid email or password'
      case AuthErrorCode.USER_NOT_FOUND:
        return 'User not found'
      case AuthErrorCode.EMAIL_NOT_VERIFIED:
        return 'Email is not verified'
      case AuthErrorCode.ACCOUNT_BLOCKED:
        return 'Account is blocked'
      case AuthErrorCode.SESSION_EXPIRED:
        return 'Session has expired'
      case AuthErrorCode.UNAUTHORIZED:
        return 'Unauthorized access'
      default:
        return 'Authentication error'
    }
  }
}
