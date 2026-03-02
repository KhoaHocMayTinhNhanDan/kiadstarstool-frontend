// src/04-frameworks-and-drivers/devices/auth/MockAuthDriver.ts

import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement';
import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';
import { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';
import { UserRole } from '@/01-entities/users/base/UserRole.vo';
import { Permission } from '@/01-entities/users/base/Permission.vo';

const MOCK_STORAGE_KEY = 'mock_auth_user_email';

export class MockAuthDriver
  implements IAuthAuthentication, IAuthAccountManagement, IAuthSession
{
  private mockUsers: Array<{
    email: string;
    password: string;
    roles: string[];
    emailVerified: boolean;
    customClaims: Record<string, any>;
    idToken?: string;
    displayName?: string;
    photoURL?: string;
  }> = [
    {
      email: 'hoangdong@gmail.com',
      password: '123@@@',
      roles: ['admin'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-admin-token-123',
      displayName: 'Hoàng Đông',
      photoURL: 'https://i.pravatar.cc/150?u=hoangdong'
    },
    {
      email: 'manager@example.com',
      password: 'password123',
      roles: ['manager'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-manager-token-456',
      displayName: 'Quản Lý Chi Nhánh',
      photoURL: 'https://i.pravatar.cc/150?u=manager'
    },
    {
      email: 'teacher@example.com',
      password: 'password123',
      roles: ['teacher'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-teacher-token-789',
      displayName: 'Giáo Viên',
      photoURL: 'https://i.pravatar.cc/150?u=teacher'
    },
    {
      email: 'staff@example.com',
      password: 'password123',
      roles: ['staff'],
      emailVerified: true,
      customClaims: { isBlocked: false },
      idToken: 'mock-staff-token-101',
      displayName: 'Nhân Viên',
      photoURL: 'https://i.pravatar.cc/150?u=staff'
    }
  ];

  private currentUser: AuthIdentity | null = null;
  private authStateListeners: Array<(user: AuthIdentity | null) => void> = [];

  constructor() {
    this.restoreSession();
  }

  /* =====================
   *  IAuthDriver Implementation
   * ===================== */

  async signInWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity> {
    console.log('[MockAuthDriver] 🟢 Signing in (MOCK MODE):', email);
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

    const roles = user.roles.map(r => UserRole.create(r).getValue());

    const userAuthResult = AuthIdentity.create({
      id: `mock-id-${user.email}`,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`,
      roles: roles,
      permissions: [], // Mock permissions if needed
      emailVerified: user.emailVerified,
      customClaims: user.customClaims,
      lastLoginAt: new Date().toISOString()
    });

    if (userAuthResult.isFailure) {
      // This should not happen with mock data, but it's good practice
      console.error('[MockAuthDriver] Failed to create mock AuthIdentity:', userAuthResult.getErrorValue());
      throw new Error('auth/internal-mock-error');
    }

    this.currentUser = userAuthResult.getValue();
    localStorage.setItem(MOCK_STORAGE_KEY, email); // Persist session
    this.notifyAuthStateChange(this.currentUser);
    return this.currentUser;
  }

  async signOut(): Promise<void> {
    await this.delay(300);
    localStorage.removeItem(MOCK_STORAGE_KEY); // Clear session
    this.currentUser = null;
    this.notifyAuthStateChange(null);
  }

  async getCurrentUser(): Promise<AuthIdentity | null> {
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

  async createUserWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity> {
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

    const roles = newUser.roles.map(r => UserRole.create(r).getValue());

    const userAuthResult = AuthIdentity.create({
      id: `mock-id-${newUser.email}`,
      email: newUser.email,
      displayName: newUser.email.split('@')[0],
      photoURL: `https://i.pravatar.cc/150?u=${newUser.email}`,
      roles: roles,
      permissions: [],
      emailVerified: newUser.emailVerified,
      customClaims: newUser.customClaims,
      lastLoginAt: new Date().toISOString()
    });

    if (userAuthResult.isFailure) {
      console.error('[MockAuthDriver] Failed to create new mock AuthIdentity:', userAuthResult.getErrorValue());
      throw new Error('auth/internal-mock-error');
    }

    // FIX: Tự động đăng nhập sau khi tạo tài khoản thành công (giống hành vi của Firebase)
    this.currentUser = userAuthResult.getValue();
    this.notifyAuthStateChange(this.currentUser);

    return this.currentUser;
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

  async signInAnonymously(): Promise<AuthIdentity> {
    await this.delay(500);
    const id = `mock-anon-${Date.now()}`;
    
    const userAuthResult = AuthIdentity.create({
      id,
      email: '', // Anonymous user không có email
      displayName: 'Guest',
      roles: [],
      permissions: [],
      emailVerified: false,
      lastLoginAt: new Date().toISOString(),
      customClaims: { isAnonymous: true }
    });

    this.currentUser = userAuthResult.getValue();
    this.notifyAuthStateChange(this.currentUser);
    return this.currentUser;
  }

  async updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    await this.delay(300);
    if (!this.currentUser) throw new Error('auth/no-current-user');

    const userIndex = this.mockUsers.findIndex(u => u.email === this.currentUser!.email);
    if (userIndex !== -1) {
      // Cập nhật dữ liệu trong mảng mockUsers để giữ lại sau khi reload/re-login
      if (profile.displayName) this.mockUsers[userIndex].displayName = profile.displayName;
      if (profile.photoURL) this.mockUsers[userIndex].photoURL = profile.photoURL;
    }
  }

  async reloadUser(): Promise<void> {
    await this.delay(200);
    if (!this.currentUser) return;

    // Đăng nhập lại "ngầm" để lấy dữ liệu mới nhất từ mockUsers
    const user = this.mockUsers.find(u => u.email === this.currentUser!.email);
    if (user) {
      // Tái tạo AuthIdentity với dữ liệu mới
      // Lưu ý: Trong thực tế ta nên tách logic tạo AuthIdentity ra hàm riêng để tái sử dụng
      // Ở đây ta gọi lại signInWithEmailAndPassword để đơn giản hóa việc refresh
      await this.signInWithEmailAndPassword(user.email, user.password);
    }
  }

  onAuthStateChanged(callback: (user: AuthIdentity | null) => void): () => void {
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

  setCurrentUser(userAuth: AuthIdentity | null): void {
    this.currentUser = userAuth;
    this.notifyAuthStateChange(userAuth);
  }

  /* =====================
   *  Private Helpers
   * ===================== */

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private notifyAuthStateChange(user: AuthIdentity | null): void {
    this.authStateListeners.forEach(listener => {
      try {
        listener(user);
      } catch (error) {
        console.error('[MockAuthDriver] Error in auth state listener:', error);
      }
    });
  }

  private restoreSession() {
    if (typeof window === 'undefined') return;
    
    const storedEmail = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!storedEmail) return;

    const user = this.mockUsers.find(u => u.email === storedEmail);
    if (user) {
      const roles = user.roles.map(r => UserRole.create(r).getValue());
      const userAuthResult = AuthIdentity.create({
        id: `mock-id-${user.email}`,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`,
        roles: roles,
        permissions: [],
        emailVerified: user.emailVerified,
        customClaims: user.customClaims,
        lastLoginAt: new Date().toISOString()
      });

      if (userAuthResult.isSuccess) {
        this.currentUser = userAuthResult.getValue();
        console.log('[MockAuthDriver] 🔄 Session restored for:', user.email);
      }
    } else {
      localStorage.removeItem(MOCK_STORAGE_KEY); // Clean up invalid session
    }
  }
}

export const createMockAuthDriver = (): MockAuthDriver => {
  return new MockAuthDriver();
};