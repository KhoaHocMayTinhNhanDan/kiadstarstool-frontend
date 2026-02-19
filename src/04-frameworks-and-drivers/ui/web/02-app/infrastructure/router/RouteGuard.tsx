// src/04-frameworks-and-drivers/ui/web/infrastructure/router/RouteGuard.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { useAuth } from '../../hooks/user/useAuth'; // Giả định hook này tồn tại
import { LoadingSpinner } from '../../../00-design-system/00-atoms/LoadingSpinner'; // Giả định component này tồn tại

interface RouteGuardProps {
  requiredPermissions?: PermissionCode[]; // Chuyển thành mảng và tùy chọn
  redirectPath?: string;
}

export const RouteGuard = ({
  requiredPermissions = [],
  redirectPath = '/403', // Trang lỗi Forbidden
}: RouteGuardProps) => {
  const { isAuthenticated, isLoading, permissions } = useAuth();
  const location = useLocation();

  // While the authentication status is being determined (e.g., reading from session),
  // show a loading indicator.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If the user is not authenticated, redirect to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires specific permissions, verify the user has them.
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((p) => permissions.includes(p))
  ) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}; 