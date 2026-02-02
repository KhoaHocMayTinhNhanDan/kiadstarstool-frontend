// src/02-usecases/auth/login/Login.interactor.ts
import { Result } from '../../../01-entities/shared/base/result';
import { AuthError } from '../../../01-entities/errors/AuthError';
import { Credentials } from '../../../01-entities/auth/Credentials.vo';
import { IAuthRepository } from '../../ports/repositories/IAuthRepository';
import { type IUserRepository } from '../../ports/repositories/IUserRepository';
import type { LoginInput } from './Login.input';
import type { LoginOutput } from './Login.output';
import { buildRolePermissions } from '../../../shared/constants/authorization/auth.policy';
import { EffectivePermissionService } from '../../../01-entities/users/services/EffectivePermission.service';

export class LoginInteractor {
  private readonly authRepo: IAuthRepository;
  private readonly userRepo: IUserRepository;

  constructor(
    authRepo: IAuthRepository,
    userRepo: IUserRepository,
  ) {
    this.authRepo = authRepo;
    this.userRepo = userRepo;
  }

  async execute(input: LoginInput): Promise<Result<LoginOutput>> {
    const credentialsResult = Credentials.create(
      input.username,
      input.password
    );

    if (credentialsResult.isFailure) {
      return Result.fail<LoginOutput>(AuthError.invalidCredentials().message);
    }

    const credentials = credentialsResult.getValue();

    const authResult = await this.authRepo.authenticate(credentials);

    if (authResult.isFailure) {
      return Result.fail<LoginOutput>(AuthError.invalidCredentials().message);
    }

    const auth = authResult.getValue();
    const user = await this.userRepo.getById(auth.userId);

    if (!user) {
      return Result.fail<LoginOutput>(AuthError.userNotFound().message);
    }

    if (user.isActive === false) {
      return Result.fail<LoginOutput>(AuthError.accountBlocked().message);
    }

    // Calculate effective permissions using the new service
    const rolePermissions = buildRolePermissions(user.role.value);
    const effectivePermissions = EffectivePermissionService.resolve(
      rolePermissions,
      user.permissions
    );

    return Result.ok({
      userId: user.id.value,
      displayName: user.profile.displayName,
      role: user.role.value,
      permissions: effectivePermissions, // return effective permissions
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    });
  }
}

export const createLoginInteractor = (
  authRepo: IAuthRepository,
  userRepo: IUserRepository,
): LoginInteractor => new LoginInteractor(authRepo, userRepo);
