import { type ListUsersInput } from './ports/input/IListUsersInput';
import { type UserOutput } from './ports/output/IUserOutput';
import { type IUserProfileRepository } from './ports/gateways_interface/IUserProfileRepository';
import { Result } from '../../01-entities/shared/base/result';

export class ListUsersInteractor {
 private readonly userRepo: IUserProfileRepository
  constructor(userRepo: IUserProfileRepository) {
    this.userRepo = userRepo;
  }

  async execute(input: ListUsersInput): Promise<Result<UserOutput[]>> {
    try {
      // Note: This assumes `userRepo` will be updated to have a `findAll` method.
      const users = await this.userRepo.findAll(input.filters);

      const userOutputs = users.map(user => ({
        id: user.id.value,
        displayName: user.profile.displayName,
        role: user.role.value,
        isActive: user.isActive,
      }));

      return Result.ok<UserOutput[]>(userOutputs);
    } catch (error: any) {
      console.error('[ListUsersInteractor] Failed to list users:', error);
      return Result.fail<UserOutput[]>(error.message || 'An unexpected error occurred while listing users');
    }
  }
}