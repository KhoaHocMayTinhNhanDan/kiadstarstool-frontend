import { Result } from '@/01-entities/shared/base/result';
import { GetUserInteractor } from '@/02-usecases/users/GetUser.interactor';
import { ListUsersInteractor } from '@/02-usecases/users/ListUsers.interactor';
import { type GetUserInput } from '@/02-usecases/users/ports/input/IGetUserInput';
import { type ListUsersInput } from '@/02-usecases/users/ports/input/IListUsersInput';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';

export class UsersController {
  private readonly getUserInteractor: GetUserInteractor;
  private readonly listUsersInteractor: ListUsersInteractor;

  constructor(getUserInteractor: GetUserInteractor, listUsersInteractor: ListUsersInteractor) {
    this.getUserInteractor = getUserInteractor;
    this.listUsersInteractor = listUsersInteractor;
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
}
