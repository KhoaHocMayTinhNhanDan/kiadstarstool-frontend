import { Result } from '../../01-entities/shared/base/result';
import { IAuthRepository } from './ports/AuthRepository.port';
import type { ILogoutUseCase, LogoutInput, LogoutOutput } from '../ports/input/auth';

export class LogoutInteractor implements ILogoutUseCase {
  private readonly authRepo: IAuthRepository;

  constructor(authRepo: IAuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(input?: LogoutInput): Promise<Result<LogoutOutput>> {
    try {
      await this.authRepo.logout();
      return Result.ok({ success: true });
    } catch (error: any) {
      return Result.fail(error.message || 'Logout failed');
    }
  }
}

export const createLogoutInteractor = (authRepo: IAuthRepository): LogoutInteractor => 
  new LogoutInteractor(authRepo);