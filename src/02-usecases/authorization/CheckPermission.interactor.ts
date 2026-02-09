// src/02-usecases/authorization/CheckPermission.interactor.ts
import { type IUserProfileRepository } from '../ports/output/repositories/IUserRepository';
import { Result } from '../../01-entities/shared/base/result';
import { Permission } from '../../01-entities/users/base/Permission.vo';
import { type PermissionCode } from '../../shared/constants/authorization/auth.domain';
import { buildRolePermissions } from '../../shared/constants/authorization/auth.policy';

interface Input {
  userId: string;
  permission: PermissionCode;
}

interface Output {
  allowed: boolean;
}

export class CheckPermissionInteractor {
  private readonly userRepository: IUserProfileRepository;

  constructor(userRepository: IUserProfileRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: Input): Promise<Result<Output>> {
    try {
      // 1. Validate permission format
      const permissionOrError = Permission.create(input.permission);
      if (permissionOrError.isFailure) {
        return Result.fail<Output>(String(permissionOrError.getErrorValue()));
      }

      const permission = permissionOrError.getValue();

      // 2. Load user
      const user = await this.userRepository.getById(input.userId);
      if (!user) {
        return Result.fail<Output>('User not found');
      }

      if (user.isDisabled()) {
        return Result.ok({ allowed: false });
      }

      // 3. Build effective permissions using the service
      const rolePermissions = buildRolePermissions(user.role.value);
      const allowed = user.can(permission.value, rolePermissions);

      return Result.ok({ allowed });

    } catch (error) {
      return Result.fail<Output>('Internal server error');
    }
  }
}
