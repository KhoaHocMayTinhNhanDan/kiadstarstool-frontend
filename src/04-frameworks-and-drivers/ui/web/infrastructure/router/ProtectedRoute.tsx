// src/04-frameworks-and-drivers/ui/web/infrastructure/router/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { authorize } from '@/04-frameworks-and-drivers/ui/web/infrastructure/http/middleware/Authorization.middleware';
import { useAuth } from '../../hooks/useAuth'; // Giả định hook này tồn tại
import { LoadingSpinner } from '../../components/atoms/LoadingSpinner'; // Giả định component này tồn tại

interface ProtectedRouteProps {
  requiredPermissions?: PermissionCode[]; // Chuyển thành mảng và tùy chọn
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermissions = [],
  redirectPath = '/403' // Trang lỗi Forbidden
}) => {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      if (!isAuthenticated || !user) {
        setStatus('denied');
        return;
      }

      // Nếu không yêu cầu quyền cụ thể, chỉ cần đăng nhập là đủ
      if (requiredPermissions.length === 0) {
        setStatus('allowed');
        return;
      }

      // Gọi Middleware để kiểm tra tất cả các quyền
      const result = await authorize(user.userId, requiredPermissions);
      setStatus(result.allowed ? 'allowed' : 'denied');
    };

    check();
  }, [isAuthenticated, user, requiredPermissions]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'denied') {
    // Nếu chưa đăng nhập, chuyển hướng đến /login. Nếu đã đăng nhập nhưng thiếu quyền, chuyển đến trang cấm.
    const targetPath = !isAuthenticated ? '/login' : redirectPath;
    return <Navigate to={targetPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};