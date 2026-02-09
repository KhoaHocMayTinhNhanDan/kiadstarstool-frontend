// src/04-frameworks-and-drivers/ui/web/components/02-organisms/auth/LoginForm/LoginForm.types.ts
import type { SerializedStyles } from '@emotion/react';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  onForgotPassword?: () => void;
  className?: string;
  /**
   * Thông báo lỗi để hiển thị trên form.
   */
  errorMessage?: string;
  sx?: SerializedStyles;
}