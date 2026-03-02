import { Result } from '@/01-entities/shared/base/result';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';
import { type UpdateUserProfileInput } from './ports/input/UpdateUserProfile.input';
import { type UpdateUserProfileOutput } from './ports/output/UpdateUserProfile.output';
import { PhoneNumber } from '@/01-entities/shared/value-objects/PhoneNumber.vo';
import { RecordActivityInteractor } from '../activity/RecordActivity.interactor';

export class UpdateUserProfileInteractor {
  private readonly userRepo: IUserRepository;
  private readonly recordActivityInteractor: RecordActivityInteractor;

  constructor(userRepo: IUserRepository, recordActivityInteractor: RecordActivityInteractor) {
    this.userRepo = userRepo;
    this.recordActivityInteractor = recordActivityInteractor;
  }

  async execute(input: UpdateUserProfileInput): Promise<Result<UpdateUserProfileOutput>> {
    try {
      const user = await this.userRepo.getById(input.userId);
      if (!user) {
        return Result.fail('User not found');
      }

      // Chuẩn bị dữ liệu cập nhật
      const updateProps: { displayName?: string; photoURL?: string; phoneNumbers?: PhoneNumber[] } = {};
      const changedFields: string[] = [];

      if (input.displayName !== undefined) {
        updateProps.displayName = input.displayName;
        changedFields.push('displayName');
      }

      if (input.photoURL !== undefined) {
        updateProps.photoURL = input.photoURL;
        changedFields.push('photoURL');
      }

      if (input.phone) {
        // Chuyển đổi string phone thành PhoneNumber VO
        // Lưu ý: PhoneNumber.create sẽ throw error nếu format không đúng, catch block sẽ bắt lỗi này
        updateProps.phoneNumbers = [PhoneNumber.create(input.phone)];
        changedFields.push('phone');
      }

      // Sử dụng Domain Method để cập nhật (đảm bảo tính bất biến và đa hình)
      const updatedUser = user.updateProfile(updateProps);

      await this.userRepo.save(updatedUser);

      // Ghi lại lịch sử hoạt động
      if (changedFields.length > 0) {
        await this.recordActivityInteractor.execute({
          userId: input.userId,
          type: 'user_update',
          description: 'Cập nhật thông tin hồ sơ',
          details: { changedFields }
        });
      }

      return Result.ok({ success: true });
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to update profile');
    }
  }
}