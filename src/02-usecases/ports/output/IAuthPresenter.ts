// src/02-usecases/ports/output/IAuthPresenter.ts
import type { UserAuth } from '@/01-entities/users/UserAuth.entity'

export interface IAuthPresenter {
  loginSuccess(user: UserAuth): void
  loginFailed(message: string): void
}
