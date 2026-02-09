import { Result } from '../../../01-entities/shared/base/result';
import { Credentials } from '../../../01-entities/auth/Credentials.vo';
import { AuthSession } from '../../../01-entities/auth/AuthSession.vo';

// Port: Định nghĩa giao tiếp với nơi lưu trữ dữ liệu xác thực
export interface IAuthRepository {
  authenticate(credentials: Credentials): Promise<Result<AuthSession>>;

  logout(): Promise<void>;
}