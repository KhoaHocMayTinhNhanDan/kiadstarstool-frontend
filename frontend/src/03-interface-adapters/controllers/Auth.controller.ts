// src/03-interface-adapters/controllers/Auth.controller.ts
import { LoginInteractor } from '@/02-usecases/auth/Login.interactor';
import { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor';
import { Result } from '@/01-entities/shared/base/result';

import { type LoginInput } from '@/02-usecases/auth/ports/input/ILoginInput';
import { type LoginOutput } from '@/02-usecases/auth/ports/output/ILoginOutput';
import { type LogoutInput } from '@/02-usecases/auth/ports/input/ILogoutInput';
import { type LogoutOutput } from '@/02-usecases/auth/ports/output/ILogoutOutput';
import { AppContext } from '@/05-bootstrap/app-context';

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
  async logout(): Promise<Result<LogoutOutput>> {
    try {
      // Lấy user ID từ presenter TRƯỚC KHI đăng xuất
      const currentUser = AppContext.getAuthPresenter().getState().user;
      
      // Dù có user hay không, vẫn tiến hành logout và ghi log
      // Nếu không có user, ghi log cho 'anonymous' để có thể truy vết nếu cần
      const userId = currentUser ? currentUser.id : 'anonymous';

      return await this.logoutInteractor.execute({ userId });
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
      await authDriver.signInWithEmailAndPassword(email, password);
      return Result.ok();
    } catch (error: any) {
      console.error('[AuthController] Register error:', error);
      return Result.fail(error.message || 'Registration failed');
    }
  }
}