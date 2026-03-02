// src/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver.ts

import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement';
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';
import { AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';
import { UserRole } from '@/01-entities/users/base/UserRole.vo';
import { Permission } from '@/01-entities/users/base/Permission.vo';
import { auth } from '@/shared/config/firebase';
import { ROLES } from '@/shared/constants/authorization/auth.domain';
import type { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export class FirebaseAuthDriver
  implements IAuthAuthentication, IAuthAccountManagement, IAuthSession
{
  
  /* =====================
   *  CORE AUTH
   * ===================== */

  async signInWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity> {
    try {
      console.log('[FirebaseAuthDriver] Signing in user with email:', email);
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] signInWithEmailAndPassword error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async signOut(): Promise<void> {
    try {
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    } catch (error) {
      console.error('[FirebaseAuthDriver] signOut error:', error);
      throw new Error('auth/logout-failed');
    }
  }

  async getCurrentUser(): Promise<AuthIdentity | null> {
    const user = auth.currentUser;
    return user ? await this.mapFirebaseUser(user).catch(() => null) : null;
  }

  /* =====================
   *  PASSWORD MANAGEMENT
   * ===================== */

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] sendPasswordResetEmail error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async updateEmail(currentEmail: string, newEmail: string): Promise<void> {
    const user = this.getRequiredCurrentUser();
    if (user.email !== currentEmail) throw new Error('auth/user-mismatch');
    
    try {
      const { updateEmail } = await import('firebase/auth');
      await updateEmail(user, newEmail);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] updateEmail error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = this.getRequiredCurrentUser();
    if (user.email !== email) throw new Error('auth/user-mismatch');
    
    try {
      const { updatePassword } = await import('firebase/auth');
      await updatePassword(user, newPassword);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] updatePassword error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  /* =====================
   *  SESSION MANAGEMENT
   * ===================== */

  async getIdToken(): Promise<string | null> {
    const user = this.getRequiredCurrentUser();
    
    try {
      const { getIdToken } = await import('firebase/auth');
      return await getIdToken(user);
    } catch (error) {
      console.error('[FirebaseAuthDriver] getIdToken error:', error);
      return null;
    }
  }

  async refreshToken(): Promise<void> {
    const user = this.getRequiredCurrentUser();
    
    try {
      const { getIdToken } = await import('firebase/auth');
      await getIdToken(user, true);
    } catch (error) {
      console.error('[FirebaseAuthDriver] refreshToken error:', error);
      throw new Error('auth/token-refresh-failed');
    }
  }

  /* =====================
   *  USER MANAGEMENT
   * ===================== */

  async createUserWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity> {
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] createUserWithEmailAndPassword error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async deleteUser(): Promise<void> {
    const user = this.getRequiredCurrentUser();
    
    try {
      const { deleteUser } = await import('firebase/auth');
      await deleteUser(user);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] deleteUser error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async sendEmailVerification(): Promise<void> {
    const user = this.getRequiredCurrentUser();
    
    try {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(user);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] sendEmailVerification error:', error);
      throw new Error('auth/verification-send-failed');
    }
  }

  async signInAnonymously(): Promise<AuthIdentity> {
    try {
      const { signInAnonymously } = await import('firebase/auth');
      const userCredential = await signInAnonymously(auth);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] signInAnonymously error:', error);
      throw new Error('auth/anonymous-login-failed');
    }
  }

  /* =====================
   *  OBSERVERS
   * ===================== */

  onAuthStateChanged(callback: (user: AuthIdentity | null) => void): () => void {
    let unsubscribe: (() => void) | undefined;
    let isUnsubscribed = false;
    
    // The listener setup is async due to dynamic import, but the method must
    // synchronously return an unsubscribe function. This flag ensures that
    // if unsubscribe is called before the listener is attached, it's honored.
    import('firebase/auth').then(({ onAuthStateChanged: fbOnAuthStateChanged }) => {
      if (isUnsubscribed) return; // Don't attach listener if already unsubscribed

      unsubscribe = fbOnAuthStateChanged(auth, async (firebaseUser) => {
        if (isUnsubscribed) return;

        if (firebaseUser) {
          try {
            const userAuth = await this.mapFirebaseUser(firebaseUser);
            if (!isUnsubscribed) callback(userAuth);
          } catch (error) {
            console.error('[FirebaseAuthDriver] Error mapping user in onAuthStateChanged:', error);
            if (!isUnsubscribed) callback(null);
          }
        } else {
          if (!isUnsubscribed) callback(null);
        }
      });
    }).catch(error => {
      console.error('[FirebaseAuthDriver] Failed to import firebase/auth for onAuthStateChanged:', error);
      // FIX: Báo cho App biết là đã kiểm tra xong (dù lỗi) để tắt Loading
      if (!isUnsubscribed) callback(null);
    });

    // Return a wrapper function that can be called synchronously.
    return () => {
      isUnsubscribed = true;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }

  /* =====================
   *  PRIVATE HELPERS
   * ===================== */

  private async mapFirebaseUser(firebaseUser: User): Promise<AuthIdentity> {
    // =================================================================================
    // ĐÂY LÀ NƠI TỐT NHẤT ĐỂ LOG DỮ LIỆU FIREBASE TRẢ VỀ
    console.log('[FirebaseAuthDriver] Raw Firebase User Object:', firebaseUser);
    // Bạn có thể xem chi tiết các thuộc tính như: firebaseUser.uid, firebaseUser.email, 
    // firebaseUser.displayName, firebaseUser.photoURL, firebaseUser.metadata, ...
    // =================================================================================

    // Force-refreshing the token should be done explicitly (e.g., via refreshToken).
    // Here we get the cached token result which is more efficient.
    const token = await firebaseUser.getIdTokenResult(false);
    const claims = token.claims || {};

    // Ensure roles is always an array, default to TEACHER if not present.
    const rawRoles = claims.roles;
    const roles: string[] = Array.isArray(rawRoles)
      ? (rawRoles as string[])
      : typeof rawRoles === 'string'
        ? [rawRoles]
        : [ROLES.TEACHER];

    const rawPermissions = claims.permissions;
    const permissions: string[] = Array.isArray(rawPermissions)
      ? (rawPermissions as string[])
      : [];

    const metadata = firebaseUser.metadata || {};

    // Map Strings -> Value Objects
    const mappedRoles = roles
      .map((r) => UserRole.create(r))
      .filter((res) => res.isSuccess)
      .map((res) => res.getValue());

    const mappedPermissions = permissions
      .map((p) => Permission.create(p))
      .filter((res) => res.isSuccess)
      .map((res) => res.getValue());

    const authIdentityResult = AuthIdentity.create({
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      roles: mappedRoles,
      permissions: mappedPermissions,
      emailVerified: firebaseUser.emailVerified || false,
      lastLoginAt: metadata.lastSignInTime || new Date().toISOString(),
      customClaims: claims,
    });

    if (authIdentityResult.isFailure) {
      // This indicates a data integrity issue between Firebase and the domain model.
      // For example, if a user in Firebase somehow has no roles.
      console.error('[FirebaseAuthDriver] Failed to create AuthIdentity:', authIdentityResult.getErrorValue());
      // Throwing here is appropriate because the driver's contract is to return a valid AuthIdentity or throw.
      throw new Error(`Failed to map Firebase user: ${authIdentityResult.getErrorValue()}`);
    }

    return authIdentityResult.getValue();
  }

  private mapFirebaseError(error: unknown): string {
    if (!(error instanceof FirebaseError)) return 'auth/unknown-error';
    const code = error.code || '';
    
    if (code.includes('invalid-credential') || 
        code.includes('wrong-password') || 
        code.includes('user-not-found')) {
      return 'auth/invalid-credential';
    }
    
    if (code.includes('email-already-in-use')) {
      return 'auth/email-already-in-use';
    }
    
    if (code.includes('weak-password')) {
      return 'auth/weak-password';
    }
    
    if (code.includes('too-many-requests')) {
      return 'auth/too-many-requests';
    }
    
    if (code.includes('user-disabled')) {
      return 'auth/account-blocked';
    }
    
    if (code.includes('email-not-verified')) {
      return 'auth/email-not-verified';
    }
    
    if (code.includes('requires-recent-login')) {
      return 'auth/requires-recent-login';
    }
    
    return 'auth/unknown-error';
  }

  private getRequiredCurrentUser(): User {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('auth/no-current-user');
    }
    return user;
  }

  /* =====================
   *  UTILITIES
   * ===================== */

  /**
   * Sign up alias for createUserWithEmailAndPassword
   */
  async signUpWithEmailAndPassword(email: string, password: string): Promise<AuthIdentity> {
    return this.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Check if user exists
   */
  async userExists(email: string): Promise<boolean> {
    try {
      const { fetchSignInMethodsForEmail } = await import('firebase/auth');
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get Firebase auth instance
   */
  getAuth() {
    return auth;
  }

  /**
   * Reload user data from Firebase
   */
  async reloadUser(): Promise<void> {
    const user = this.getRequiredCurrentUser();
    
    try {
      await user.reload();
    } catch (error) {
      console.error('[FirebaseAuthDriver] reloadUser error:', error);
      throw new Error('auth/user-reload-failed');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    const user = this.getRequiredCurrentUser();
    
    try {
      const { updateProfile } = await import('firebase/auth');
      await updateProfile(user, profile);
    } catch (error: unknown) {
      console.error('[FirebaseAuthDriver] updateProfile error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }
}

export const createFirebaseAuthDriver = (): FirebaseAuthDriver => {
  return new FirebaseAuthDriver();
};