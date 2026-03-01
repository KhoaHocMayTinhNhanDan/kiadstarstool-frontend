export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormProps {
  /**
   * Hàm được gọi khi form submit hợp lệ
   */
  onSubmit: (data: ForgotPasswordFormData) => void;
  /**
   * Trạng thái đang xử lý
   */
  isLoading?: boolean;
  /**
   * Thông báo lỗi từ server (nếu có)
   */
  errorMessage?: string;
  /**
   * Đường dẫn hoặc hàm xử lý khi bấm "Quay lại đăng nhập"
   */
  onBackToLogin?: () => void;
}