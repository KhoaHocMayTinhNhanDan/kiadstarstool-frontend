/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import {
  Button,
  Input,
  Checkbox,
  Text,
  LoadingSpinner,
} from '../../../atoms';
import * as styles from './LoginForm.organism.styles';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  /**
   * Hàm được gọi khi form được submit với dữ liệu hợp lệ.
   */
  onSubmit: (data: LoginFormData) => void;
  /**
   * Cờ báo hiệu form đang trong trạng thái chờ (loading).
   */
  isLoading?: boolean;
  /**
   * Thông báo lỗi để hiển thị trên form.
   */
  errorMessage?: string;
}

/**
 * Component LoginForm là một "organism" dùng cho việc xác thực người dùng.
 * Nó bao gồm các trường nhập liệu, checkbox và nút bấm.
 */
const LoginForm = ({ onSubmit, isLoading = false, errorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form css={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <h2 css={styles.title}>Đăng nhập</h2>

      <div css={styles.fieldWrapper}>
        <label htmlFor="login-email" css={styles.label}>Email</label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nhapemail@gmail.com"
          disabled={isLoading}
          required
          autoComplete="email"
        />
      </div>

      <div css={styles.fieldWrapper}>
        <label htmlFor="login-password" css={styles.label}>Mật khẩu</label>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          required
          autoComplete="current-password"
        />
      </div>

      <div css={styles.optionsContainer}>
        <label htmlFor="remember-me" css={styles.rememberMeContainer}>
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
            disabled={isLoading}
          />
          <Text as="span" size="sm">Ghi nhớ tôi</Text>
        </label>
        <a href="/auth/forgot-password" css={styles.forgotPasswordLink}>
          <Text as="span" size="sm">Quên mật khẩu?</Text>
        </a>
      </div>

      {errorMessage && (
        <div css={styles.errorMessage}>
          <Text as="span" size="sm">{errorMessage}</Text>
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Đăng nhập'}
      </Button>
    </form>
  );
};

export default LoginForm;