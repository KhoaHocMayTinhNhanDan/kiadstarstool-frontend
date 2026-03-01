// src/01-entities/auth/AuthSession.vo.ts
import { Result } from '../shared/base/result';
import { ValueObject } from '../shared/base/ValueObject';

interface AuthSessionProps {
  userId: string;
  accessToken: string;
  refreshToken?: string;
}

export class AuthSession extends ValueObject<AuthSessionProps> {
  private constructor(props: AuthSessionProps) {
    super(props);
  }

  get userId(): string {
    return this.props.userId;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }

  public static create(props: AuthSessionProps): Result<AuthSession> {
    if (!props.userId || props.userId.trim().length === 0) {
      return Result.fail<AuthSession>('AuthSession.userId is required');
    }

    if (!props.accessToken || props.accessToken.trim().length === 0) {
      return Result.fail<AuthSession>('AuthSession.accessToken is required');
    }

    return Result.ok<AuthSession>(
      new AuthSession({
        userId: props.userId.trim(),
        accessToken: props.accessToken,
        refreshToken: props.refreshToken,
      }),
    );
  }
}
