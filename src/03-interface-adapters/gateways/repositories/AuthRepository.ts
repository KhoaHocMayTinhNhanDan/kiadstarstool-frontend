// src/03-interface-adapters/gateways/repositories/AuthRepository.ts

import type { IAuthRepository } from '@/02-usecases/ports/input/IAuthRepository';
import type { UserAuth } from '@/01-entities/users/UserAuth.entity';
import type { IAuthDriver } from '../device-interfaces/auth/IAuthDriver';

export class AuthRepository implements IAuthRepository {
  constructor( authDriver: IAuthDriver) {this.authDriver = authDriver;}  private readonly authDriver: IAuthDriver;

  async login(payload: { email: string; password: string }): Promise<UserAuth> {
    // Delegate to the auth driver
    return await this.authDriver.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
  }

  async logout(): Promise<void> {
    await this.authDriver.signOut();
  }

  async restoreSession(): Promise<UserAuth | null> {
    return await this.authDriver.getCurrentUser();
  }

  // Additional repository methods
  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.authDriver.sendPasswordResetEmail(email);
  }

  async updateEmail(currentEmail: string, newEmail: string): Promise<void> {
    await this.authDriver.updateEmail(currentEmail, newEmail);
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await this.authDriver.updatePassword(email, newPassword);
  }
}