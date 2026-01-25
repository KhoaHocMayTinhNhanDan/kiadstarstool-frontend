/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import {
  Button,
  Input,
  Text,
  LoadingSpinner,
} from '../../../atoms';
import * as styles from './ForgotPasswordForm.organism.styles';

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
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

const ForgotPasswordForm = ({ 
  onSubmit, 
  isLoading = false, 
  errorMessage,
  onBackToLogin 
}: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    onSubmit({ email });
  };

  return (
    <form css={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <div>
        <h2 css={styles.title}>Quên mật khẩu?</h2>
        <p css={styles.description}>
          Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
        </p>
      </div>

      <div css={styles.fieldWrapper}>
        <label htmlFor="forgot-email" css={styles.label}>Email</label>
        <Input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nhapemail@gmail.com"
          disabled={isLoading}
          required
          autoComplete="email"
        />
      </div>

      {errorMessage && (
        <div css={styles.errorMessage}>
          <Text as="span" size="sm">{errorMessage}</Text>
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Gửi liên kết'}
      </Button>

      <div css={styles.footer}>
        {onBackToLogin ? (
          <button 
            type="button" 
            onClick={onBackToLogin} 
            css={[styles.backLink, { background: 'none', border: 'none', cursor: 'pointer', padding: 0 }]}
          >
            Quay lại đăng nhập
          </button>
        ) : (
          <a href="/auth/login" css={styles.backLink}>
            Quay lại đăng nhập
          </a>
        )}
      </div>
    </form>
  );
};

export default ForgotPasswordForm;