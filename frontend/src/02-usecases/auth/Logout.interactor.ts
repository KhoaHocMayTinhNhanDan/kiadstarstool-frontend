import { type LogoutInput } from './ports/input/ILogoutInput';
import { type LogoutOutput } from './ports/output/ILogoutOutput';
import { type IAuthRepository } from './ports/gateways_interface/IAuthRepository';
import { Result } from '../../01-entities/shared/base/result';
import { RecordActivityInteractor } from '../activity/RecordActivity.interactor';

export class LogoutInteractor {
  private readonly authRepo: IAuthRepository;
  private readonly recordActivityInteractor: RecordActivityInteractor;

  constructor(authRepo: IAuthRepository, recordActivityInteractor: RecordActivityInteractor) {
    this.authRepo = authRepo;
    this.recordActivityInteractor = recordActivityInteractor;
  }

  async execute(input: LogoutInput): Promise<Result<LogoutOutput>> {
    try {
      // Logic nghiệp vụ: Gọi repository để thực hiện đăng xuất
      // Có thể mở rộng để xử lý input.revokeAllSessions nếu backend hỗ trợ
      await this.authRepo.logout();

      // Ghi lại lịch sử hoạt động
      await this.recordActivityInteractor.execute({
        userId: input.userId,
        type: 'auth_logout',
        description: 'Đăng xuất khỏi hệ thống',
      });

      return Result.ok<LogoutOutput>({
        success: true
      });
    } catch (error: any) {
      // Log error nếu cần thiết (thường là qua một logger service được inject vào)
      return Result.fail<LogoutOutput>(error.message || 'Logout failed unexpectedly');
    }
  }
}