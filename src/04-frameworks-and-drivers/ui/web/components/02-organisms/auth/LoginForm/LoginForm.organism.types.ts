export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  /**
   * Hàm được gọi khi form được submit với dữ liệu hợp lệ.
   */
  onSubmit: (data: LoginFormData) => void;
  /**
   * Hàm được gọi khi người dùng nhấn "Quên mật khẩu".
   */
  onForgotPassword?: () => void;
  /**
   * Cờ báo hiệu form đang trong trạng thái chờ (loading).
   */
  isLoading?: boolean;
  /**
   * Thông báo lỗi để hiển thị trên form.
   */
  errorMessage?: string;
}