// src/02-usecases/ports/input/IAuthRepository.ts

import type { UserAuth } from '@/01-entities/business/users/UserAuth.entity'

/* =====================
 *  LOGIN
 * ===================== */

export interface LoginPayload {
  email: string
  password: string
}

/* =====================
 *  INPUT PORT
 * ===================== */

export interface IAuthRepository {
  login(payload: LoginPayload): Promise<UserAuth>

  logout(): Promise<void>

  restoreSession(): Promise<UserAuth | null>
}
