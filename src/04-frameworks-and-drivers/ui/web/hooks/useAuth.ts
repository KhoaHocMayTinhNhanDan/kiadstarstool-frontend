import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook để truy cập state và các hành động xác thực.
 * Bắt buộc phải được sử dụng bên trong một <AuthProvider>.
 *
 * @returns {object} Context xác thực, bao gồm:
 * - `user`: Object chứa thông tin user (hoặc null).
 * - `isAuthenticated`: Boolean cho biết user đã đăng nhập hay chưa.
 * - `isLoading`: Boolean cho biết một tác vụ xác thực (login/logout) có đang chạy không.
 * - `login`: Hàm để thực hiện đăng nhập.
 * - `logout`: Hàm để thực hiện đăng xuất.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
