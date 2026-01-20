// src/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver.ts

import type { IAuthDriver } from '@/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver';
import { UserAuth } from '@/01-entities/business/users/UserAuth.entity';
import { auth } from '@/shared/config/firebase';
import { ROLES } from '@/shared/constants/roles.constant';

export class FirebaseAuthDriver implements IAuthDriver {
  
  /* =====================
   *  CORE AUTH
   * ===================== */

  async signInWithEmailAndPassword(email: string, password: string): Promise<UserAuth> {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: any) {
      console.error('Firebase login error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async signOut(): Promise<void> {
    try {
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    } catch (error) {
      console.error('Firebase logout error:', error);
      throw new Error('Logout failed');
    }
  }

  async getCurrentUser(): Promise<UserAuth | null> {
    const user = auth.currentUser;
    return user ? await this.mapFirebaseUser(user) : null;
  }

  /* =====================
   *  PASSWORD MANAGEMENT
   * ===================== */

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Firebase password reset error:', error);
      throw new Error('Failed to send reset email');
    }
  }

  // FIXED: Đổi thứ tự parameters theo IAuthDriver
  async updateEmail(currentEmail: string, newEmail: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || user.email !== currentEmail) {
      throw new Error('User not authenticated or email mismatch');
    }
    
    try {
      const { updateEmail } = await import('firebase/auth');
      await updateEmail(user, newEmail);
    } catch (error: any) {
      console.error('Firebase update email error:', error);
      throw new Error('Failed to update email');
    }
  }

  // FIXED: Đổi thứ tự parameters theo IAuthDriver  
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || user.email !== email) {
      throw new Error('User not authenticated or email mismatch');
    }
    
    try {
      const { updatePassword } = await import('firebase/auth');
      await updatePassword(user, newPassword);
    } catch (error: any) {
      console.error('Firebase update password error:', error);
      throw new Error('Failed to update password');
    }
  }

  /* =====================
   *  SESSION MANAGEMENT
   * ===================== */

  async getIdToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
      const { getIdToken } = await import('firebase/auth');
      return await getIdToken(user);
    } catch (error) {
      console.error('Firebase get token error:', error);
      return null;
    }
  }

  async refreshToken(): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;
    
    try {
      const { getIdToken } = await import('firebase/auth');
      await getIdToken(user, true);
    } catch (error) {
      console.error('Firebase refresh token error:', error);
      throw new Error('Failed to refresh token');
    }
  }

  /* =====================
   *  USER MANAGEMENT
   * ===================== */

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserAuth> {
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: any) {
      console.error('Firebase create user error:', error);
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async deleteUser(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user to delete');
    
    try {
      const { deleteUser } = await import('firebase/auth');
      await deleteUser(user);
    } catch (error: any) {
      console.error('Firebase delete user error:', error);
      throw new Error('Failed to delete user');
    }
  }

  async sendEmailVerification(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user to verify');
    
    try {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Firebase verification error:', error);
      throw new Error('Failed to send verification');
    }
  }

  async signInAnonymously(): Promise<UserAuth> {
    try {
      const { signInAnonymously } = await import('firebase/auth');
      const userCredential = await signInAnonymously(auth);
      return await this.mapFirebaseUser(userCredential.user);
    } catch (error: any) {
      console.error('Firebase anonymous login error:', error);
      throw new Error('Anonymous login failed');
    }
  }

  /* =====================
   *  OBSERVERS
   * ===================== */

  onAuthStateChanged(callback: (user: UserAuth | null) => void): () => void {
    // FIXED: Dùng dynamic import thay vì require
    import('firebase/auth').then(({ onAuthStateChanged: fbOnAuthStateChanged }) => {
      return fbOnAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userAuth = await this.mapFirebaseUser(firebaseUser);
            callback(userAuth);
          } catch (error) {
            console.error('Error mapping Firebase user:', error);
            callback(null);
          }
        } else {
          callback(null);
        }
      });
    }).catch(error => {
      console.error('Failed to import firebase/auth for onAuthStateChanged:', error);
    });

    // Return dummy unsubscribe function
    return () => {
      console.log('Unsubscribe from auth state changes');
    };
  }

  /* =====================
   *  PRIVATE HELPERS
   * ===================== */

  private async mapFirebaseUser(firebaseUser: any): Promise<UserAuth> {
    if (!firebaseUser) {
      throw new Error('Firebase user is null');
    }

    try {
      // Get custom claims
      const token = await firebaseUser.getIdTokenResult(true); // force refresh
      const claims = token.claims || {};
      
      // Extract roles (default to teacher)
      let roles: string[] = claims.roles || [ROLES.TEACHER];
      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      // Extract permissions
      const permissions: string[] = claims.permissions || [];

      // Get user metadata
      const metadata = firebaseUser.metadata || {};
      
      return new UserAuth({
        email: firebaseUser.email || '',
        roles: roles as any,
        permissions: permissions as any,
        emailVerified: firebaseUser.emailVerified || false,
        lastLoginAt: metadata.lastSignInTime || new Date().toISOString(),
        customClaims: {
          ...claims,
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          phoneNumber: firebaseUser.phoneNumber || '',
          isBlocked: claims.isBlocked || false,
          creationTime: metadata.creationTime,
          lastSignInTime: metadata.lastSignInTime
        }
      });
    } catch (error) {
      console.error('Error mapping Firebase user to UserAuth:', error);
      // Fallback to basic user info
      return new UserAuth({
        email: firebaseUser.email || '',
        roles: [ROLES.TEACHER],
        emailVerified: firebaseUser.emailVerified || false,
        lastLoginAt: new Date().toISOString(),
        customClaims: {
          uid: firebaseUser.uid,
          isBlocked: false
        }
      });
    }
  }

  private mapFirebaseError(error: any): string {
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

  /* =====================
   *  UTILITIES
   * ===================== */

  /**
   * Sign up alias for createUserWithEmailAndPassword
   */
  async signUpWithEmailAndPassword(email: string, password: string): Promise<UserAuth> {
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
    const user = auth.currentUser;
    if (!user) return;
    
    try {
      await user.reload();
    } catch (error) {
      console.error('Firebase reload user error:', error);
      throw new Error('Failed to reload user');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user to update');
    
    try {
      const { updateProfile } = await import('firebase/auth');
      await updateProfile(user, profile);
    } catch (error: any) {
      console.error('Firebase update profile error:', error);
      throw new Error('Failed to update profile');
    }
  }
}

export const createFirebaseAuthDriver = (): FirebaseAuthDriver => {
  return new FirebaseAuthDriver();
};