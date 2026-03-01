import { type GetUserInput } from './ports/input/IGetUserInput';
import { type UserOutput } from './ports/output/IUserOutput';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';
import { Result } from '../../01-entities/shared/base/result';

export class GetUserInteractor {
    private readonly userRepo: IUserRepository
    constructor(
      userRepo: IUserRepository
    ) {
      this.userRepo = userRepo;
    }

  async execute(input: GetUserInput): Promise<Result<UserOutput>> {
    try {
      const user = await this.userRepo.getById(input.userId);

      if (!user) {
        return Result.fail<UserOutput>('User not found');
      }

      // Map Entity to Output DTO
      return Result.ok<UserOutput>({
        uid: user.id.value,
        displayName: user.profile.displayName,
        role: user.role.value,
        isActive: user.isActive,
        email: user.email,
        photoURL: user.profile.photoURL,
        phone: user.profile.phoneNumbers?.[0]?.value,
      });
    } catch (error: any) {
      console.error(`[GetUserInteractor] Failed to get user ${input.userId}:`, error);
      return Result.fail<UserOutput>(error.message || 'An unexpected error occurred while fetching user details');
    }
  }
}