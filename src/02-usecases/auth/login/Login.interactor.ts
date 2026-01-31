import { Result } from '../../../01-entities/shared/base/result';
import { AuthError } from '../../../01-entities/errors/AuthError';
import { Credentials } from '../../../01-entities/auth/Credentials.vo';
import type { IAuthRepository } from '../../ports/repositories/IAuthRepository';
import type { IUserRepository } from '../../ports/repositories/IUserRepository';
import type { LoginInput } from './Login.input';
import type { LoginOutput } from './Login.output';

export class LoginInteractor {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: LoginInput): Promise<Result<LoginOutput>> {
    const credentialsResult = Credentials.create(
      input.username,
      input.password
    );

    if (credentialsResult.isFailure) {
      // SECURITY: Luôn trả về lỗi chung "Invalid credentials" khi input không hợp lệ
      // để ngăn chặn kẻ tấn công đoán biết định dạng username/password.
      return Result.fail(AuthError.invalidCredentials().message);
    }

    const credentials = credentialsResult.getValue();

    const authResult = await this.authRepo.authenticate(
      credentials
    );

    if (authResult.isFailure) {
      // SECURITY: Nếu xác thực thất bại, trả về lỗi chung.
      // (Lưu ý: Nên log lỗi chi tiết authResult.getErrorValue() vào hệ thống log nội bộ để debug)
      return Result.fail(AuthError.invalidCredentials().message);
    }

    const auth = authResult.getValue();
    const user = await this.userRepo.getById(auth.userId);

    if (!user) {
      // DATA INTEGRITY: Auth thành công nhưng không tìm thấy User trong DB.
      // Đây là lỗi nghiêm trọng về dữ liệu.
      return Result.fail(AuthError.userNotFound().message);
    }

    // BUSINESS RULE: Kiểm tra tài khoản có đang hoạt động không
    // (Giả định Entity User có thuộc tính isActive, nếu chưa có bạn nên thêm vào)
    if (user.isActive === false) {
      return Result.fail(AuthError.accountBlocked().message);
    }

    return Result.ok({
      userId: user.id.value,
      displayName: user.profile.displayName,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    });
  }
}
