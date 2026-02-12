import { type GetUserInput } from './ports/input/IGetUserInput';
import { type UserOutput } from './ports/output/IUserOutput';
import { type IUserProfileRepository } from './ports/gateways_interface/IUserProfileRepository';
import { Result } from '../../01-entities/shared/base/result';

export class GetUserInteractor {
    private readonly userRepo: IUserProfileRepository
    constructor(
      userRepo: IUserProfileRepository
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
        id: user.id.value,
        displayName: user.profile.displayName,
        role: user.role.value,
        isActive: user.isActive,
      });
    } catch (error: any) {
      console.error(`[GetUserInteractor] Failed to get user ${input.userId}:`, error);
      return Result.fail<UserOutput>(error.message || 'An unexpected error occurred while fetching user details');
    }
  }
}