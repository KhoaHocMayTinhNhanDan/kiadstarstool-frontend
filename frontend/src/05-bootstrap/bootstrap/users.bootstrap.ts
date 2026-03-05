import { UserRepository } from '@/03-interface-adapters/gateways/inbound/repositories/UserRepository';
import { GetUserInteractor } from '@/02-usecases/users/GetUser.interactor';
import { CreateUserInteractor } from '@/02-usecases/users/CreateUser.interactor';
import { ListUsersInteractor } from '@/02-usecases/users/ListUsers.interactor';
import { UpdateUserProfileInteractor } from '@/02-usecases/users/UpdateUserProfile.interactor';
import { DeactivateUserInteractor } from '@/02-usecases/users/DeactivateUser.interactor';
import { UsersController } from '@/03-interface-adapters/controllers/Users.controller';
import type { RecordActivityInteractor } from '@/02-usecases/activity/RecordActivity.interactor';

export function bootstrapUsers(
  userRepository: UserRepository,
  recordActivityInteractor: RecordActivityInteractor
) {
  const getUserInteractor = new GetUserInteractor(userRepository);
  const listUsersInteractor = new ListUsersInteractor(userRepository);
  const updateProfileInteractor = new UpdateUserProfileInteractor(userRepository, recordActivityInteractor);
  const deactivateUserInteractor = new DeactivateUserInteractor(userRepository);
  const createUserInteractor = new CreateUserInteractor(userRepository);
  const usersController = new UsersController(
    getUserInteractor,
    listUsersInteractor,
    updateProfileInteractor,
    deactivateUserInteractor,
    createUserInteractor
  );

  return {
    userRepository,
    usersController,
  };
}