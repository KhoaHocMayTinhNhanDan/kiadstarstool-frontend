// src/03-interface-adapters/gateways/repositories/AuthRepository.ts
import { Result } from '@/01-entities/shared/base/result';
import { Credentials } from '@/01-entities/auth/value-objects/Credentials.vo';
import { AuthSession } from '@/01-entities/auth/value-objects/AuthSession.vo';
import { type IAuthRepository } from '@/02-usecases/auth/ports/gateways_interface/IAuthRepository';
import { type IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import { type IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';

export class AuthRepository implements IAuthRepository {
  private readonly driver: IAuthAuthentication & IAuthSession;

  constructor(driver: IAuthAuthentication & IAuthSession) {
    this.driver = driver;
  }

  async authenticate(credentials: Credentials): Promise<Result<AuthSession>> {
    try {
      // 1. Gọi Driver để đăng nhập
      const authIdentity = await this.driver.signInWithEmailAndPassword(
        credentials.username,
        credentials.password
      );

      // 2. Lấy Token
      const token = await this.driver.getIdToken();
      if (!token) {
        return Result.fail<AuthSession>('Failed to retrieve access token');
      }

      // 3. Trả về AuthSession (Mapping từ Driver -> Domain)
      // Ưu tiên lấy ID từ AuthIdentity (thường là uid của Firebase)
      const userId = authIdentity.id;

      // QUAN TRỌNG: Sử dụng Factory method để tạo Value Object và validate dữ liệu
      const sessionResult = AuthSession.create({
        userId: userId,
        accessToken: token,
        refreshToken: undefined // Firebase SDK tự quản lý refresh token ngầm
      });

      return sessionResult;
    } catch (error: any) {
      // Map lỗi từ Driver sang Domain Error message
      console.error('[AuthRepository] Error in authenticate:', error);
      return Result.fail<AuthSession>(error.message || 'Authentication failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.driver.signOut();
    } catch (error) {
      console.error('[AuthRepository] Logout warning:', error);
      // Không throw lỗi ở đây để đảm bảo trải nghiệm người dùng (UI vẫn clear state)
    }
  }
}