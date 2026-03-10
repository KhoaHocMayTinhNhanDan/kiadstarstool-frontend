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

      // Chỉ cập nhật nếu giá trị mới được cung cấp và khác với giá trị cũ.
      if (input.displayName !== undefined && input.displayName !== user.profile.displayName) {
        updateProps.displayName = input.displayName;
        changedFields.push('displayName');
      }

      // So sánh giá trị mới và cũ, xử lý cả trường hợp null/undefined
      const oldPhotoURL = user.profile.photoURL || null;
      
      console.log('[UpdateUserProfileInteractor] Comparing photo URLs:');
      console.log('  - New URL:', input.photoURL);
      console.log('  - Old URL:', oldPhotoURL);

      if (input.photoURL !== undefined && input.photoURL !== oldPhotoURL) {
        updateProps.photoURL = input.photoURL;
        changedFields.push('photoURL');
      }

      const currentPhone = user.profile.phoneNumbers?.[0]?.value || '';
      if (input.phone !== undefined && input.phone !== currentPhone) {
        updateProps.phoneNumbers = [PhoneNumber.create(input.phone)];
        changedFields.push('phone');
      }

      // Nếu không có trường nào thay đổi, chúng ta có thể bỏ qua việc lưu.
      if (changedFields.length === 0) {
        console.log('[UpdateUserProfileInteractor] Không có thay đổi nào được phát hiện, bỏ qua việc lưu vào cơ sở dữ liệu.');
        return Result.ok({ success: true });
      }

      // Sử dụng Domain Method để cập nhật (đảm bảo tính bất biến và đa hình)
      const updatedUser = user.updateProfile(updateProps);

      await this.userRepo.save(updatedUser);

      // Ghi lại lịch sử hoạt động
      await this.recordActivityInteractor.execute({
        userId: input.userId,
        type: 'user_update',
        description: 'Cập nhật thông tin hồ sơ',
        details: { changedFields }
      });

      return Result.ok({ success: true });
    } catch (error: any) {
      console.error('[UpdateUserProfileInteractor] Failed to execute:', error);
      return Result.fail(error.message || 'Không thể cập nhật hồ sơ');
    }
  }
}