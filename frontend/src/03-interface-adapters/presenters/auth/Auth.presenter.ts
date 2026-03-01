import { type AuthIdentity } from '@/01-entities/auth/AuthIdentity.entity';

export interface AuthState {
  user: AuthIdentity | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type Listener = (state: AuthState) => void;

export class AuthPresenter {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Bắt đầu với loading để check auth ban đầu
    error: null,
  };

  private listeners: Set<Listener> = new Set();

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state); // Gửi state hiện tại ngay khi đăng ký
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  setLoading(isLoading: boolean) {
    if (this.state.isLoading === isLoading) return;
    this.state = { ...this.state, isLoading };
    this.notify();
  }

  setError(error: string | null) {
    if (this.state.error === error) return;
    this.state = { ...this.state, error, isLoading: false };
    this.notify();
  }

  setUser(user: AuthIdentity | null) {
    if (this.state.user?.id === user?.id && this.state.isAuthenticated === !!user) return;
    this.state = { user, isAuthenticated: !!user, isLoading: false, error: null };
    this.notify();
  }
}