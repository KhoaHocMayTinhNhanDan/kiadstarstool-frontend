// src/04-frameworks-and-drivers/ui/web/02-app/contexts/AuthContext.tsx
import React, { createContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { AppContext } from '@/00-core/app-context';
import { type LoginInput } from '@/02-usecases/auth/ports/input/ILoginInput';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';

import { useToast } from '../../01-ui-core/hooks/useToast';
import { jwtDecode } from 'jwt-decode';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';

// 1. Định nghĩa kiểu dữ liệu cho User và Context
export interface AuthUser extends Partial<UserOutput> {
  id: string; // Make id mandatory
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: PermissionCode[];
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Tạo Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_session';

// 3. Tạo Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Bắt đầu loading để kiểm tra session
  const { toast } = useToast();

  // Khi component mount lần đầu, thử tải user từ localStorage để duy trì phiên đăng nhập
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedSession) {
        const parsedUser: AuthUser = JSON.parse(storedSession);
        
        if (!parsedUser?.token) {
          throw new Error('Invalid session data: No token found');
        }

        // Kiểm tra token hết hạn (chỉ khi không ở chế độ mock)
        if (!AppContext.isUsingMockAuth()) {
          const decoded: any = jwtDecode(parsedUser.token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            throw new Error('Token expired');
          }
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to initialize session from localStorage:", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null); // Đảm bảo state được reset
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debug: Log dữ liệu user mỗi khi có thay đổi
  useEffect(() => {
    console.log('[AuthContext] User state updated:', user);
  }, [user]);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const controller = AppContext.getAuthController();
        const usersController = AppContext.getUsersController();

        // Map email sang username để đảm bảo tương thích với LoginInput/Credentials
        const loginInput: LoginInput = {
          username_or_email: input.email,
          password: input.password
        };
        const result = await controller.login(loginInput);

        if (result.isSuccess) {
          const authData = result.getValue();
          let userId = '';

          // 1. Decode token để lấy userId
          try {
            const decoded: any = jwtDecode(authData.token);
            userId = decoded.sub || decoded.user_id || '';
          } catch (e) {
            console.error("Failed to decode token:", e);
          }

          // 2. Lấy thông tin Profile chi tiết (nếu có userId)
          let profileData: Partial<UserOutput> = {};
          if (userId) {
            try {
              const profileResult = await usersController.getUser({ userId });
              if (profileResult.isSuccess) {
                profileData = profileResult.getValue();
              }
            } catch (e) {
              console.warn('[AuthContext] Failed to fetch user profile', e);
            }
          }

          // 3. Gộp dữ liệu và lưu state
          const fullUserData: AuthUser = { ...profileData, id: userId, token: authData.token };
          setUser(fullUserData);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fullUserData));
          toast.success('Đăng nhập thành công!');
        } else {
          // Ném lỗi để component UI có thể bắt và hiển thị
          throw new Error(result.getErrorValue());
        }
      } catch (error: any) {
        toast.error(error.message || 'Đăng nhập thất bại.');
        // Ném lại lỗi để form có thể xử lý state của nó (vd: dừng loading spinner của button)
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('[AuthContext] Logout requested.');
      const controller = AppContext.getAuthController();
      await controller.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Luôn xóa state ở frontend
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoading(false);
    }
  }, []);

  const permissions = useMemo(() => {
    if (!user?.token) return [];
    try {
      const decoded: { permissions?: PermissionCode[] } = jwtDecode(user.token);
      return decoded.permissions || [];
    } catch (error) {
      return [];
    }
  }, [user]);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, isLoading, permissions, login, logout }), [user, isLoading, permissions, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
