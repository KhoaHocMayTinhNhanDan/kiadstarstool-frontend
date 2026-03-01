import { Result } from '@/01-entities/shared/base/result';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';
import { type UpdateUserProfileInput } from './ports/input/UpdateUserProfile.input';
import { type UpdateUserProfileOutput } from './ports/output/UpdateUserProfile.output';
import { PhoneNumber } from '@/01-entities/shared/base/PhoneNumber.vo';

export class UpdateUserProfileInteractor {
  private readonly userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async execute(input: UpdateUserProfileInput): Promise<Result<UpdateUserProfileOutput>> {
    try {
      const user = await this.userRepo.getById(input.userId);
      if (!user) {
        return Result.fail('User not found');
      }

      // Chuẩn bị dữ liệu cập nhật
      const updateProps: { displayName?: string; photoURL?: string; phoneNumbers?: PhoneNumber[] } = {};

      if (input.displayName !== undefined) {
        updateProps.displayName = input.displayName;
      }

      if (input.photoURL !== undefined) {
        updateProps.photoURL = input.photoURL;
      }

      if (input.phone) {
        // Chuyển đổi string phone thành PhoneNumber VO
        // Lưu ý: PhoneNumber.create sẽ throw error nếu format không đúng, catch block sẽ bắt lỗi này
        updateProps.phoneNumbers = [PhoneNumber.create(input.phone)];
      }

      // Sử dụng Domain Method để cập nhật (đảm bảo tính bất biến và đa hình)
      const updatedUser = user.updateProfile(updateProps);

      await this.userRepo.save(updatedUser);

      return Result.ok({ success: true });
    } catch (error: any) {
      return Result.fail(error.message || 'Failed to update profile');
    }
  }
}