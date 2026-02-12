// src/04-frameworks-and-drivers/ui/web/hooks/usePermission.ts
import { useCallback } from 'react';
import { AppContext } from '@/00-core/app-context';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';

export const usePermission = () => {
  // TODO: Trong thực tế, userId nên được lấy từ AuthContext (Global State)
  // Hiện tại mình lấy tạm từ localStorage để demo luồng chạy
  const getUserId = () => {
    try {
      // Giả định LoginInteractor đã lưu userId vào localStorage
      return localStorage.getItem('userId') || '';
    } catch {
      return '';
    }
  };

  const checkPermission = useCallback(async (permission: PermissionCode): Promise<boolean> => {
    const userId = getUserId();
    if (!userId) return false;

    try {
      const controller = AppContext.getAuthorizationController();
      const result = await controller.checkPermission({ userId, permission });
      return result.allowed;
    } catch (error) {
      return false;
    }
  }, []);

  return { checkPermission };
};
