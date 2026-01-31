// src/03-interface-adapters/presenters/auth/Auth.presenter.ts
import type { IAuthPresenter } from '@/02-usecases/ports/presenters/IAuthPresenter'
import type { UserAuth } from '@/01-entities/business/users/UserAuth.entity'
import type { AuthViewModel } from './Auth.viewmodel'

export class AuthPresenter implements IAuthPresenter {
  private vm: AuthViewModel | null = null
  private error: string | null = null

  loginSuccess(user: UserAuth) {
    this.vm = {
      userId: user.email,
      email: user.email,
      roles: user.roles,
      isAdmin: user.isAdmin,
    }
  }

  loginFailed(message: string) {
    this.error = message
  }

  getViewModel() {
    return this.vm
  }

  getError() {
    return this.error
  }
}
