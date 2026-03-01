import { type IUserProfileRepository } from '../users/ports/gateways_interface/IUserProfileRepository';
import { Result } from '../../01-entities/shared/base/result';
import { Permission } from '../../01-entities/users/base/Permission.vo';
import { type PermissionCode } from '../../shared/constants/authorization/auth.domain';

interface Input {
  userId: string;
  permission: PermissionCode;
}

export class RevokeUserPermissionInteractor {
  private readonly userRepository: IUserProfileRepository;

  constructor(userRepository: IUserProfileRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: Input): Promise<Result<void>> {
    try {
      // 1. Validate permission format
      const permissionOrError = Permission.create(input.permission);
      if (permissionOrError.isFailure) {
        return Result.fail<void>(String(permissionOrError.getErrorValue()));
      }

      const permission = permissionOrError.getValue();

      // 2. Load user
      const user = await this.userRepository.getById(input.userId);
      if (!user) {
        return Result.fail<void>('User not found');
      }

      if (user.isDisabled()) {
        return Result.fail<void>('User is disabled');
      }

      // 3. Revoke (idempotent)
      if (!user.permissions.has(permission.value)) {
        return Result.ok();
      }

      const updatedPermissions = user.permissions.revoke(permission.value);
      const updatedUser = user.applyPermissions(updatedPermissions);

      // 4. Persist
      await this.userRepository.save(updatedUser);

      return Result.ok();
    } catch (error) {
      return Result.fail<void>('Internal server error');
    }
  }
}
