import { type ListUsersInput } from './ports/input/IListUsersInput';
import { type UserOutput } from './ports/output/IUserOutput';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';
import { Result } from '../../01-entities/shared/base/result';

export class ListUsersInteractor {
 private readonly userRepo: IUserRepository
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async execute(input: ListUsersInput): Promise<Result<UserOutput[]>> {
    try {
      // Note: This assumes `userRepo` will be updated to have a `findAll` method.
      const users = await this.userRepo.findAll(input.filters);

      const userOutputs = users.map(user => ({
        uid: user.id.value,
        displayName: user.profile.displayName,
        role: user.role.value,
        isActive: user.isActive,
        email: user.email,
        photoURL: user.profile.photoURL,
        phone: user.profile.phoneNumbers?.[0]?.value,
      }));

      return Result.ok<UserOutput[]>(userOutputs);
    } catch (error: any) {
      console.error('[ListUsersInteractor] Failed to list users:', error);
      return Result.fail<UserOutput[]>(error.message || 'An unexpected error occurred while listing users');
    }
  }
}