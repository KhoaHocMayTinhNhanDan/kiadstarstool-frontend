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
      // FIX: Ghi log TRƯỚC KHI logout để đảm bảo user còn session (authenticated)
      // Firestore Security Rules yêu cầu 'isAuthenticated' để cho phép ghi
      if (input.userId) {
        await this.recordActivityInteractor.execute({
          userId: input.userId,
          type: 'auth_logout',
          description: 'Đăng xuất khỏi hệ thống',
        });
      }

      // Sau khi ghi log thành công (hoặc thất bại và catch bên dưới), mới thực hiện logout
      await this.authRepo.logout();

      return Result.ok<LogoutOutput>({
        success: true
      });
    } catch (error: any) {
      console.error('[LogoutInteractor] Error during logout process:', error);
      
      // Fallback: Ngay cả khi ghi log lỗi, vẫn BẮT BUỘC phải logout user để tránh kẹt session
      try {
        await this.authRepo.logout();
      } catch (e) {
        // Ignore error here, just ensure we tried
      }

      // Luôn trả về success để UI chuyển hướng về trang Login
      return Result.ok<LogoutOutput>({
        success: true
      });
    }
  }
}