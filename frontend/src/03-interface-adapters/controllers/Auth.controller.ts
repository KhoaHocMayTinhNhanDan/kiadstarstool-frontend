// src/03-interface-adapters/controllers/Auth.controller.ts
import { LoginInteractor } from '@/02-usecases/auth/Login.interactor';
import { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor';
import { Result } from '@/01-entities/shared/base/result';

import { type LoginInput } from '@/02-usecases/auth/ports/input/ILoginInput';
import { type LoginOutput } from '@/02-usecases/auth/ports/output/ILoginOutput';
import { type LogoutInput } from '@/02-usecases/auth/ports/input/ILogoutInput';
import { type LogoutOutput } from '@/02-usecases/auth/ports/output/ILogoutOutput';
import { AppContext } from '@/00-core/app-context';

export class AuthController {
  private readonly loginInteractor: LoginInteractor;
  private readonly logoutInteractor: LogoutInteractor;

  constructor(
    loginInteractor: LoginInteractor,
    logoutInteractor: LogoutInteractor
  ) {
    this.loginInteractor = loginInteractor;
    this.logoutInteractor = logoutInteractor;
  }

  /**
   * Xử lý yêu cầu đăng nhập từ UI
   */
  async login(input: LoginInput): Promise<Result<LoginOutput>> {
    try {
      // Gọi Use Case
      return await this.loginInteractor.execute(input);
    } catch (error: any) {
      // Bắt các lỗi không mong muốn (Unexpected Errors)
      console.error('[AuthController] Login unexpected error:', error);
      return Result.fail<LoginOutput>('An unexpected error occurred during login');
    }
  }

  /**
   * Xử lý yêu cầu đăng xuất
   */
  async logout(input?: LogoutInput): Promise<Result<LogoutOutput>> {
    try {
      return await this.logoutInteractor.execute(input);
    } catch (error: any) {
      console.error('[AuthController] Logout unexpected error:', error);
      return Result.fail<LogoutOutput>('An unexpected error occurred during logout');
    }
  }

  /**
   * Xử lý đăng ký.
   * Tạm thời gọi trực tiếp AuthDriver vì chưa có RegisterInteractor hoàn chỉnh.
   * TODO: Refactor để sử dụng RegisterInteractor khi nó sẵn sàng.
   */
  async register(email: string, password: string): Promise<Result<void>> {
    try {
      const authDriver = AppContext.getAuthDriver();
      // Giả sử driver có phương thức này (FirebaseAuthDriver và MockAuthDriver đều có)
      await authDriver.signUpWithEmailAndPassword(email, password);
      return Result.ok();
    } catch (error: any) {
      console.error('[AuthController] Register error:', error);
      return Result.fail(error.message || 'Registration failed');
    }
  }
}