import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ForbiddenPage } from '../../pages/system/ForbiddenPage';

interface RouteGuardProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export const RouteGuard = ({ children, requiredRoles = [] }: RouteGuardProps) => {
  const location = useLocation();
  
  // 🚧 MOCK DATA (TẠM THỜI):
  // Giả lập luôn luôn đã đăng nhập và có quyền 'admin' để test UI
  // Sau này sẽ thay thế bằng AppContext.isAuthenticated()
  const isAuthenticated = true; 
  const currentUserRole = 'admin'; 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền đơn giản
  if (requiredRoles.length > 0) {
    if (!requiredRoles.includes(currentUserRole)) {
      return <ForbiddenPage />;
    }
  }

  return <>{children}</>;
};