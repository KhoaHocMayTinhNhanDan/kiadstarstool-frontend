import { Result } from '../../../01-entities/shared/base/result';
import { IAuthRepository } from '../../ports/repositories/IAuthRepository';

export class LogoutInteractor {
  private readonly authRepo: IAuthRepository;

  constructor(authRepo: IAuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(): Promise<Result<void>> {
    await this.authRepo.logout();
    return Result.ok<void>();
  }
}

export const createLogoutInteractor = (
  authRepo: IAuthRepository,
): LogoutInteractor => new LogoutInteractor(authRepo);