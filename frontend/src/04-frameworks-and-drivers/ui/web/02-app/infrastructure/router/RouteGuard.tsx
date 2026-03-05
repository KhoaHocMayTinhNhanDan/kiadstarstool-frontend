// src/04-frameworks-and-drivers/ui/web/infrastructure/router/RouteGuard.tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { useAuth } from '../../hooks/user/useAuth';
import { usePermission } from '../../hooks/user/usePermission';
import { LoadingSpinner } from '../../../00-design-system/00-atoms/LoadingSpinner';

interface RouteGuardProps {
  requiredPermissions?: PermissionCode[]; // Chuyển thành mảng và tùy chọn
  redirectPath?: string;
}

export const RouteGuard = ({
  requiredPermissions = [],
  redirectPath = '/403', // Trang lỗi Forbidden
}: RouteGuardProps) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { checkPermission } = usePermission();
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    // Don't check anything until auth state is resolved
    if (isAuthLoading) {
      return;
    }

    // If not authenticated, we know they are not allowed.
    // The redirect will be handled by the sync check outside the effect.
    if (!isAuthenticated) {
      setIsAllowed(false);
      return;
    }

    // If authenticated and no permissions are required, they are allowed.
    if (requiredPermissions.length === 0) {
      setIsAllowed(true);
      return;
    }

    let isMounted = true;
    const verify = async () => {
      // Check all required permissions using the hook
      const results = await Promise.all(
        requiredPermissions.map(p => checkPermission(p))
      );
      // If all checks pass, the user is allowed
      if (isMounted) {
        setIsAllowed(results.every(Boolean));
      }
    };

    verify();

    return () => { isMounted = false; };
  }, [isAuthLoading, isAuthenticated, requiredPermissions, checkPermission]);

  // While auth state or permissions are being checked, show a loading spinner.
  if (isAuthLoading || isAllowed === null) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but permissions are not met, redirect to the forbidden page.
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}; 