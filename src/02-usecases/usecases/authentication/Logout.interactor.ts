// src/02-usecases/usecases/authentication/Logout.interactor.ts

import type { IAuthRepository } from '../../ports/input/IAuthRepository';
import type { IAuthPresenter } from '../../ports/output/IAuthPresenter';

export class LogoutInteractor {
  private readonly authRepository: IAuthRepository;
  private readonly authPresenter: IAuthPresenter;

  constructor(
    authRepository: IAuthRepository,
    authPresenter: IAuthPresenter,
  ) {
    this.authRepository = authRepository;
    this.authPresenter = authPresenter;
  }

  async execute(): Promise<void> {
    try {
      await this.authRepository.logout();
      // Presenter will handle UI updates (clearing user state, redirect, etc.)
      // We don't pass any data on logout success
    } catch (error) {
      // Handle logout errors if needed
      console.error('Logout failed:', error);
      // Could call a presenter method like authPresenter.logoutFailed()
    }
  }
}

export const createLogoutInteractor = (
  authRepository: IAuthRepository,
  authPresenter: IAuthPresenter,
): LogoutInteractor => {
  return new LogoutInteractor(authRepository, authPresenter);
};