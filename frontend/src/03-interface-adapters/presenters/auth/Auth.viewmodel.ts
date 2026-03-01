// src/03-interface-adapters/presenters/auth/Auth.viewmodel.ts
export interface AuthViewModel {
  userId: string
  email: string
  roles: string[]
  isAdmin: boolean
}
