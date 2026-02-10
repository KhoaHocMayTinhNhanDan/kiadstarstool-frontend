import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import { AppContext } from '@/00-core/app-context';
import { type LoginInput } from '@/02-usecases/auth/ports/input/ILoginInput';
import { type LoginOutput } from '@/02-usecases/auth/ports/output/ILoginOutput';

import { useToast } from '../hooks/user/useToast';
import { jwtDecode } from 'jwt-decode';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';

// 1. Định nghĩa "hình dạng" của Context
interface AuthContextType {
  user: LoginOutput | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: PermissionCode[];
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Tạo Context (export để useAuth.ts có thể dùng)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Tạo Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Bắt đầu loading để kiểm tra session
  const { toast } = useToast();

  // Khi component mount lần đầu, thử tải user từ localStorage để duy trì phiên đăng nhập
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        // DEBUG: Kiểm tra xem đang dùng Driver nào
        const debugInfo = AppContext.debug();
        console.log(`[AuthContext] Login requested. Current Driver: ${debugInfo.auth?.driverName}`);

        const controller = AppContext.getAuthController();
        
        // Map email sang username để đảm bảo tương thích với LoginInput/Credentials
        const loginInput: LoginInput = {
          username_or_email: input.email,
          password: input.password
        };
        const result = await controller.login(loginInput);

        if (result.isSuccess) {
          const userData = result.getValue();
          setUser(userData);
          // Lưu session của user
          localStorage.setItem('user', JSON.stringify(userData));
          // Lưu userId để các hook khác (như usePermission) tiện sử dụng
          // FIX: LoginOutput giờ chỉ trả về token, cần decode để lấy userId
          try {
            const decoded: any = jwtDecode(userData.token);
            if (decoded.sub || decoded.user_id) {
              localStorage.setItem('userId', decoded.sub || decoded.user_id);
            }
          } catch (e) { /* ignore */ }
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
      const controller = AppContext.getAuthController();
      await controller.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Luôn xóa state ở frontend
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
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
