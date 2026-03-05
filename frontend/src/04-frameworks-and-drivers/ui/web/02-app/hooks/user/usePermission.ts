import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { PERMISSIONS, type PermissionCode } from '@/shared/constants/authorization';

/**
 * Hook tùy chỉnh để tập trung logic kiểm tra quyền.
 * Nó tận dụng `useAuth` hook để lấy các quyền hiệu lực của người dùng hiện tại.
 */
export const usePermission = () => {
  // `useAuth` cung cấp danh tính người dùng và các quyền đã được tính toán.
  const { permissions: userPermissions, isLoading: isAuthLoading } = useAuth();

  /**
   * Kiểm tra xem người dùng hiện tại có một quyền cụ thể hay không.
   * Hàm này được ghi nhớ (memoized) bằng `useCallback` để tối ưu hiệu năng.
   * @param requiredPermission Mã quyền cần kiểm tra.
   * @returns Một promise trả về `true` nếu người dùng có quyền, ngược lại là `false`.
   */
  const checkPermission = useCallback(
    async (requiredPermission: PermissionCode): Promise<boolean> => {
      // Khi trạng thái xác thực đang tải, chúng ta chưa thể xác định quyền.
      // Trả về false là mặc định an toàn nhất để tránh hiển thị nội dung không được phép.
      if (isAuthLoading) {
        return false;
      }

      // Nếu không có quyền nào, việc kiểm tra sẽ thất bại.
      if (!userPermissions || userPermissions.length === 0) {
        return false;
      }

      // Người dùng có quyền wildcard ('*') sẽ có tất cả các quyền.
      if (userPermissions.includes(PERMISSIONS.ALL)) {
        return true;
      }

      // Kiểm tra xem danh sách quyền của người dùng có bao gồm quyền được yêu cầu hay không.
      return userPermissions.includes(requiredPermission);
    },
    [userPermissions, isAuthLoading] // Các phụ thuộc cho callback đã được ghi nhớ
  );

  return { 
    /**
     * Một hàm để kiểm tra một quyền cụ thể.
     * Ví dụ: `checkPermission('users:create').then(allowed => ...)`
     */
    checkPermission, 
    /**
     * Mảng thô chứa các quyền của người dùng hiện tại.
     */
    permissions: userPermissions || [],
    /**
     * Một boolean cho biết dữ liệu xác thực và quyền có đang tải hay không.
     */
    isLoading: isAuthLoading 
  };
};