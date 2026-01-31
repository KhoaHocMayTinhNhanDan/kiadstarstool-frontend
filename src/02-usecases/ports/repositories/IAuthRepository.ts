import { Result } from '../../../01-entities/shared/base/result';
import { Credentials } from '../../../01-entities/auth/Credentials.vo';

export interface AuthSession {
  userId: string;
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthRepository {
  authenticate(credentials: Credentials): Promise<Result<AuthSession>>;
}