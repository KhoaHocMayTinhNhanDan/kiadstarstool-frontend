import { useCallback, useSyncExternalStore } from 'react';
import { AppContext } from '@/05-bootstrap/app-context';
import { type AuthState } from '@/03-interface-adapters/presenters/auth/Auth.presenter';
import { Result } from '@/01-entities/shared/base/result';

export const useAuth = () => {
  const presenter = AppContext.getAuthPresenter();
  const controller = AppContext.getAuthController();

  // Sử dụng useSyncExternalStore để lắng nghe state từ Presenter
  const authState = useSyncExternalStore<AuthState>(
    (callback) => presenter.subscribe(callback),
    () => presenter.getState()
  );

  // --- ACTIONS ---

  const login = useCallback(async (email: string, password: string) => {
    presenter.setLoading(true);
    try {
      const result = await controller.login({ username_or_email: email, password });
      if (result.isFailure) {
        presenter.setError(result.getErrorValue());
      }
      // Presenter sẽ tự động được cập nhật bởi onAuthStateChanged
      return result;
    } catch (error: any) {
      const msg = error.message || 'Login failed unexpectedly';
      presenter.setError(msg);
      return Result.fail(msg);
    }
    finally {
      presenter.setLoading(false);
    }
  }, [controller, presenter]);

  const logout = useCallback(async () => {
    presenter.setLoading(true);
    try {
      const result = await controller.logout();
      // Presenter sẽ tự động được cập nhật bởi onAuthStateChanged
      return result;
    } finally {
      // Luôn đặt lại loading, bất kể logout thành công hay thất bại.
      // Nếu không, trạng thái loading sẽ bị kẹt lại nếu logout có lỗi.
      presenter.setLoading(false);
    }
  }, [controller, presenter]);

  const register = useCallback(async (email: string, password: string) => {
    presenter.setLoading(true);
    try {
      const result = await controller.register(email, password);
      if (result.isFailure) {
        presenter.setError(result.getErrorValue());
      }
      return result;
    } catch (error: any) {
      const msg = error.message || 'Registration failed unexpectedly';
      presenter.setError(msg);
      return Result.fail(msg);
    } finally {
      presenter.setLoading(false);
    }
  }, [controller, presenter]);

  // Trích xuất permissions từ AuthIdentity (được map từ Firebase Custom Claims)
  // Chuyển đổi từ Permission Object sang string code để UI dễ sử dụng
  const permissions = authState.user?.permissions.map(p => p.value) || [];

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    permissions, // <--- Thêm dòng này để RouteGuard sử dụng
    
    // Actions
    login,
    logout,
    register,
  };
};