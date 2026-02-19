// src/04-frameworks-and-drivers/ui/web/infrastructure/http/middleware/Authorization.middleware.ts
import { AppContext } from '@/00-core/app-context';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';

/**
 * Middleware xác thực quyền truy cập.
 * Đóng vai trò cầu nối giữa HTTP/Router Layer và Authorization Controller.
 * 
 * @param userId ID của user đang đăng nhập
 * @param permission Quyền cần kiểm tra
 * @returns Promise<{ allowed: boolean; reason?: string }>
 */
export const authorize = async (
  userId: string,
  permissions: PermissionCode[]
): Promise<{ allowed: boolean; reason?: string }> => {
  // Nếu không yêu cầu quyền nào, mặc định cho qua
  if (permissions.length === 0) {
    return { allowed: true };
  }

  try {
    const controller = AppContext.getAuthorizationController();

    // Phải có TẤT CẢ các quyền được yêu cầu
    for (const permission of permissions) {
      const result = await controller.checkPermission({
        userId,
        permission,
      });
      if (!result.allowed) {
        return { allowed: false, reason: `Missing permission: ${permission}` };
      }
    }

    return { allowed: true };
  } catch (error: any) {
    console.error('[AuthorizationMiddleware] Error:', error);
    return { allowed: false, reason: error.message || 'Authorization failed' };
  }
};