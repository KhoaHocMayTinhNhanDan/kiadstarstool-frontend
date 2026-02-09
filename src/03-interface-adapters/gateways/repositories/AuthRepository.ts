// src/03-interface-adapters/gateways/repositories/AuthRepository.ts
import { Result } from '@/01-entities/shared/base/result';
import { Credentials } from '@/01-entities/auth/Credentials.vo';
import { IAuthRepository, type AuthSession } from '@/02-usecases/ports/output/auth/login/IAuthRepository';
import { type IAuthDriver } from '../device-interfaces/auth/IAuthDriver';

export class AuthRepository implements IAuthRepository {
  private readonly authDriver: IAuthDriver;

  constructor(authDriver: IAuthDriver) {
    this.authDriver = authDriver;
    console.log('[AuthRepository] Initialized with driver:', authDriver.constructor.name);
  }

  async authenticate(credentials: Credentials): Promise<Result<AuthSession>> {
    console.log('[AuthRepository] authenticate called for:', credentials.username);
    try {
      // 1. Gọi Driver để đăng nhập
      console.log('[AuthRepository] Calling authDriver.signInWithEmailAndPassword...');
      const authIdentity = await this.authDriver.signInWithEmailAndPassword(
        credentials.username,
        credentials.password
      );
      console.log('[AuthRepository] Driver login success for:', authIdentity.email);

      // 2. Lấy Token
      const token = await this.authDriver.getIdToken();
      if (!token) {
        return Result.fail<AuthSession>('Failed to retrieve access token');
      }

      // 3. Trả về AuthSession (Mapping từ Driver -> Domain)
      // Lưu ý: userId ở đây lấy từ customClaims.uid hoặc email tùy logic của bạn
      // Với MockDriver/Firebase, ta có thể lấy uid từ customClaims hoặc gọi getCurrentUser
      const userId = authIdentity.customClaims['uid'] as string || authIdentity.email;

      return Result.ok<AuthSession>({
        userId: userId,
        accessToken: token,
        refreshToken: 'not-implemented-yet' // Firebase tự quản lý refresh token
      });
    } catch (error: any) {
      // Map lỗi từ Driver sang Domain Error message
      console.error('[AuthRepository] Error in authenticate:', error);
      return Result.fail<AuthSession>(error.message || 'Authentication failed');
    }
  }

  async logout(): Promise<void> {
    await this.authDriver.signOut();
  }
}