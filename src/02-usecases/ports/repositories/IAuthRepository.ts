// src/02-usecases/ports/repositories/IAuthRepository.ts
import { Result } from '../../../01-entities/shared/base/result';
import { Credentials } from '../../../01-entities/auth/Credentials.vo';

export interface AuthSession {
  userId: string;
  accessToken: string;
  refreshToken?: string;
}

export abstract class IAuthRepository {
  abstract authenticate(
    credentials: Credentials
  ): Promise<Result<AuthSession>>;

  abstract logout(): Promise<void>;
}
