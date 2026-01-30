/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import {
  Button,
  Input,
  Checkbox,
  Text,
  LoadingSpinner,
  Box,
} from '../../../atoms';
import { FormField } from '../../../molecules/FormField';
import * as styles from './LoginForm.organism.styles';
import type { LoginFormProps } from './LoginForm.organism.types';

/**
 * Component LoginForm là một "organism" dùng cho việc xác thực người dùng.
 * Nó bao gồm các trường nhập liệu, checkbox và nút bấm.
 */
const LoginForm = ({ onSubmit, onForgotPassword, isLoading = false, errorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    if (validate()) {
      onSubmit({ email, password, rememberMe });
    }
  };

  return (
    <Box as="form" css={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <Text as="h2" css={styles.title}>Đăng nhập</Text>

      <FormField label="Email" error={errors.email} id="login-email" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nhapemail@gmail.com"
          disabled={isLoading}
          autoComplete="email"
          error={!!errors.email}
        />
      </FormField>

      <FormField label="Mật khẩu" error={errors.password} id="login-password" required>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          autoComplete="current-password"
          error={!!errors.password}
        />
      </FormField>

      <Box css={styles.optionsContainer}>
        <label css={styles.rememberMeContainer}>
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
            disabled={isLoading}
          />
          <Text as="span" size="sm" sx={{ cursor: 'pointer' }}>Ghi nhớ tôi</Text>
        </label>
        <Text
          as="a"
          onClick={onForgotPassword}
          css={styles.forgotPasswordLink}
        >
          Quên mật khẩu?
        </Text>
      </Box>

      {errorMessage && (
        <Box css={styles.errorMessage}>
          <Text size="sm" color="DANGER" align="center">{errorMessage}</Text>
        </Box>
      )}

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        Đăng nhập
      </Button>
    </Box>
  );
};

export default LoginForm;