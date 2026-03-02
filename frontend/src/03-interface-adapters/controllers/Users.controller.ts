import { Result } from '@/01-entities/shared/base/result';
import { GetUserInteractor } from '@/02-usecases/users/GetUser.interactor';
import { ListUsersInteractor } from '@/02-usecases/users/ListUsers.interactor';
import { UpdateUserProfileInteractor } from '@/02-usecases/users/UpdateUserProfile.interactor';
import { DeactivateUserInteractor } from '@/02-usecases/users/DeactivateUser.interactor';
import { CreateUserInteractor } from '@/02-usecases/users/CreateUser.interactor';
import { type GetUserInput } from '@/02-usecases/users/ports/input/IGetUserInput';
import { type ListUsersInput } from '@/02-usecases/users/ports/input/IListUsersInput';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { type UpdateUserProfileInput } from '@/02-usecases/users/ports/input/UpdateUserProfile.input';
import { AppContext } from '@/05-bootstrap/app-context';

export class UsersController {
  private readonly getUserInteractor: GetUserInteractor;
  private readonly listUsersInteractor: ListUsersInteractor;
  private readonly updateProfileInteractor: UpdateUserProfileInteractor;
  private readonly deactivateUserInteractor: DeactivateUserInteractor;
  private readonly createUserInteractor: CreateUserInteractor;

  constructor(
    getUserInteractor: GetUserInteractor, 
    listUsersInteractor: ListUsersInteractor,
    updateProfileInteractor: UpdateUserProfileInteractor,
    deactivateUserInteractor: DeactivateUserInteractor,
    createUserInteractor: CreateUserInteractor
  ) {
    this.getUserInteractor = getUserInteractor;
    this.listUsersInteractor = listUsersInteractor;
    this.updateProfileInteractor = updateProfileInteractor;
    this.deactivateUserInteractor = deactivateUserInteractor;
    this.createUserInteractor = createUserInteractor;
  }

  async getUser(input: GetUserInput): Promise<Result<UserOutput>> {
    try {
      return await this.getUserInteractor.execute(input);
    } catch (error: any) {
      console.error(`[UsersController] GetUser unexpected error for ${input.userId}:`, error);
      return Result.fail<UserOutput>('An unexpected error occurred');
    }
  }

  async listUsers(input: ListUsersInput): Promise<Result<UserOutput[]>> {
    try {
      return await this.listUsersInteractor.execute(input);
    } catch (error: any) {
      console.error('[UsersController] ListUsers unexpected error:', error);
      return Result.fail<UserOutput[]>('An unexpected error occurred');
    }
  }

  async updateProfile(input: UpdateUserProfileInput): Promise<Result<void>> {
    try {
      const result = await this.updateProfileInteractor.execute(input);
      if (result.isFailure) {
        return Result.fail(result.getErrorValue());
      }

      // Đồng bộ với Auth Provider (Firebase/Mock) nếu người dùng đang tự cập nhật hồ sơ của mình
      const currentUser = AppContext.getAuthPresenter().getState().user;
      if (currentUser && currentUser.id === input.userId) {
        const authDriver = AppContext.getAuthDriver();
        // Cập nhật thông tin trên Firebase Auth
        await authDriver.updateProfile({
          displayName: input.displayName,
          photoURL: input.photoURL
        });
        // Reload user để cập nhật UI (Header, Sidebar) ngay lập tức
        await authDriver.reloadUser();
      }

      return Result.ok();
    } catch (error: any) {
      return Result.fail('An unexpected error occurred');
    }
  }

  /**
   * Tạo người dùng mới:
   * 1. Tạo tài khoản bên Auth System (Firebase)
   * 2. Cập nhật ngay DisplayName/PhotoURL cho Auth Account (để login vào là có tên ngay)
   * 3. Lưu thông tin nghiệp vụ xuống Database
   */
  async createUser(input: { email: string; password: string; displayName: string; role: string; phone?: string }): Promise<Result<void>> {
    try {
      const authDriver = AppContext.getAuthDriver();
      
      // 1. Tạo tài khoản Auth (Firebase)
      const authIdentity = await authDriver.createUserWithEmailAndPassword(input.email, input.password);
      
      const photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(input.displayName)}&background=random`;

      // 2. Cập nhật Profile ngay lập tức cho Auth Identity (để hiển thị đúng trên UI)
      await authDriver.updateProfile({
        displayName: input.displayName,
        photoURL: photoURL
      });

      // 3. Lưu thông tin nghiệp vụ xuống Database (User Entity)
      const createResult = await this.createUserInteractor.execute({
        id: authIdentity.id, // Quan trọng: Dùng ID từ Auth để đồng bộ
        email: input.email,
        displayName: input.displayName,
        role: input.role,
        phone: input.phone,
        photoURL: photoURL
      });
      
      if (createResult.isFailure) {
        // TODO: Cân nhắc rollback (xóa user auth) nếu lưu DB thất bại
        return Result.fail(createResult.getErrorValue());
      }
      
      return Result.ok();
    } catch (error: any) {
      console.error('[UsersController] CreateUser error:', error);
      return Result.fail(error.message || 'Failed to create user');
    }
  }

  async deactivateUser(userId: string): Promise<Result<void>> {
    try {
      return await this.deactivateUserInteractor.execute(userId);
    } catch (error: any) {
      console.error('[UsersController] DeactivateUser error:', error);
      return Result.fail('An unexpected error occurred');
    }
  }
}
