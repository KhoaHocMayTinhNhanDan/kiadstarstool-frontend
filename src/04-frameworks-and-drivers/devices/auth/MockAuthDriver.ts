// src/04-frameworks-and-drivers/devices/auth/MockAuthDriver.ts

import type { IAuthDriver } from '@/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver';
import { UserAuth } from '@/01-entities/business/users/UserAuth.entity';

export class MockAuthDriver implements IAuthDriver {
  private mockUsers: Array<{
    email: string;
    password: string;
    roles: string[];
    emailVerified: boolean;
    customClaims: Record<string, any>;
    idToken?: string;
  }> = [
    {
      email: 'admin@example.com',
      password: 'password123',
      roles: ['admin'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-admin-token-123'
    },
    {
      email: 'teacher@example.com',
      password: 'password123',
      roles: ['teacher'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-teacher-token-456'
    }
  ];

  private currentUser: UserAuth | null = null;
  private authStateListeners: Array<(user: UserAuth | null) => void> = [];

  /* =====================
   *  IAuthDriver Implementation
   * ===================== */

  async signInWithEmailAndPassword(email: string, password: string): Promise<UserAuth> {
    await this.delay(500);

    const user = this.mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (!user) {
      throw new Error('auth/invalid-credential');
    }

    if (user.customClaims.isBlocked) {
      throw new Error('auth/account-blocked');
    }

    const userAuth = new UserAuth({
      email: user.email,
      roles: user.roles as any,
      emailVerified: user.emailVerified,
      customClaims: user.customClaims,
      lastLoginAt: new Date().toISOString()
    });

    this.currentUser = userAuth;
    this.notifyAuthStateChange(userAuth);
    return userAuth;
  }

  async signOut(): Promise<void> {
    await this.delay(300);
    this.currentUser = null;
    this.notifyAuthStateChange(null);
  }

  async getCurrentUser(): Promise<UserAuth | null> {
    await this.delay(100);
    return this.currentUser;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.delay(500);
    console.log(`[Mock] Password reset email sent to: ${email}`);
  }

  async updateEmail(currentEmail: string, newEmail: string): Promise<void> {
    await this.delay(300);
    const userIndex = this.mockUsers.findIndex(u => u.email === currentEmail);
    if (userIndex !== -1) {
      this.mockUsers[userIndex].email = newEmail;
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await this.delay(300);
    const userIndex = this.mockUsers.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      this.mockUsers[userIndex].password = newPassword;
    }
  }

  async getIdToken(): Promise<string | null> {
    if (!this.currentUser) return null;
    
    const user = this.mockUsers.find(u => u.email === this.currentUser!.email);
    return user?.idToken || 'mock-jwt-token';
  }

  async refreshToken(): Promise<void> {
    await this.delay(200);
    console.log('[Mock] Token refreshed');
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserAuth> {
    await this.delay(500);

    const existingUser = this.mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('auth/email-already-in-use');
    }

    const newUser = {
      email,
      password,
      roles: ['teacher'], // Default role
      emailVerified: false,
      customClaims: { isBlocked: false },
      idToken: `mock-token-${Date.now()}`
    };

    this.mockUsers.push(newUser);

    const userAuth = new UserAuth({
      email: newUser.email,
      roles: newUser.roles as any,
      emailVerified: newUser.emailVerified,
      customClaims: newUser.customClaims
    });

    return userAuth;
  }

  async deleteUser(): Promise<void> {
    await this.delay(300);
    if (!this.currentUser) {
      throw new Error('auth/no-current-user');
    }

    this.mockUsers = this.mockUsers.filter(u => u.email !== this.currentUser!.email);
    await this.signOut();
  }

  async sendEmailVerification(): Promise<void> {
    await this.delay(300);
    console.log('[Mock] Email verification sent');
  }

  onAuthStateChanged(callback: (user: UserAuth | null) => void): () => void {
    this.authStateListeners.push(callback);
    
    // Immediately call with current state
    callback(this.currentUser);

    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  /* =====================
   *  Mock-specific Methods
   * ===================== */

  reset(): void {
    this.currentUser = null;
    this.authStateListeners = [];
    this.mockUsers = [
      {
        email: 'admin@example.com',
        password: 'password123',
        roles: ['admin'],
        emailVerified: true,
        customClaims: { isBlocked: false },
        idToken: 'mock-admin-token-123'
      },
      {
        email: 'teacher@example.com',
        password: 'password123',
        roles: ['teacher'],
        emailVerified: true,
        customClaims: { isBlocked: false },
        idToken: 'mock-teacher-token-456'
      }
    ];
  }

  addMockUser(user: {
    email: string;
    password: string;
    roles: string[];
    emailVerified?: boolean;
    customClaims?: Record<string, any>;
    idToken?: string;
  }): void {
    this.mockUsers.push({
      email: user.email,
      password: user.password,
      roles: user.roles,
      emailVerified: user.emailVerified ?? true,
      customClaims: user.customClaims ?? { isBlocked: false },
      idToken: user.idToken || `mock-token-${Date.now()}`
    });
  }

  getMockUsers(): typeof this.mockUsers {
    return [...this.mockUsers];
  }

  setCurrentUser(userAuth: UserAuth | null): void {
    this.currentUser = userAuth;
    this.notifyAuthStateChange(userAuth);
  }

  /* =====================
   *  Private Helpers
   * ===================== */

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private notifyAuthStateChange(user: UserAuth | null): void {
    this.authStateListeners.forEach(listener => {
      try {
        listener(user);
      } catch (error) {
        console.error('[MockAuthDriver] Error in auth state listener:', error);
      }
    });
  }
}

export const createMockAuthDriver = (): MockAuthDriver => {
  return new MockAuthDriver();
};