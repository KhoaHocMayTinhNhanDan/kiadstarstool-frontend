// src/02-usecases/ports/output/IAuthPresenter.ts
import type { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';

export interface IAuthPresenter {
  loginSuccess(user: AuthIdentity): void
  loginFailed(message: string): void
}
