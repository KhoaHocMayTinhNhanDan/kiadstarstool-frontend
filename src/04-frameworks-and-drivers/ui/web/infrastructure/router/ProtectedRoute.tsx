// src/04-frameworks-and-drivers/ui/web/infrastructure/router/ProtectedRoute.tsx
import React, { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { useAuth } from '../../hooks/useAuth'; // Giả định hook này tồn tại
import { LoadingSpinner } from '../../components/00-atoms/LoadingSpinner'; // Giả định component này tồn tại
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  requiredPermissions?: PermissionCode[]; // Chuyển thành mảng và tùy chọn
  redirectPath?: string;
}

/**
 * Extracts user permissions from a JWT access token.
 * Assumes the permissions are stored in a `permissions` array claim.
 * @param token The JWT access token.
 * @returns An array of permission codes.
 */
const getUserPermissionsFromToken = (token?: string): PermissionCode[] => {
  if (!token) {
    return [];
  }
  try {
    const decoded: { permissions?: PermissionCode[] } = jwtDecode(token);
    return decoded.permissions || [];
  } catch (error) {
    console.error('Failed to decode access token:', error);
    return [];
  }
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermissions = [],
  redirectPath = '/403', // Trang lỗi Forbidden
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const userPermissions = useMemo(
    () => getUserPermissionsFromToken(user?.accessToken),
    [user],
  );

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
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every((p) =>
      userPermissions.includes(p),
    );
    if (!hasRequiredPermissions) {
      // User is authenticated but lacks the necessary permissions.
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }
  }

  return <Outlet />;
};