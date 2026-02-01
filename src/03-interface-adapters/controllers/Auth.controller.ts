import { LoginInteractor } from '@/02-usecases/auth/login/Login.interactor';
import { LogoutInteractor } from '@/02-usecases/auth/logout/Logout.interactor';
import { type LoginInput } from '@/02-usecases/auth/login/Login.input';
import { Result } from '@/01-entities/shared/base/result';
import { type LoginOutput } from '@/02-usecases/auth/login/Login.output';

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
  async logout(): Promise<Result<void>> {
    try {
      return await this.logoutInteractor.execute();
    } catch (error: any) {
      console.error('[AuthController] Logout unexpected error:', error);
      return Result.fail<void>('An unexpected error occurred during logout');
    }
  }
}