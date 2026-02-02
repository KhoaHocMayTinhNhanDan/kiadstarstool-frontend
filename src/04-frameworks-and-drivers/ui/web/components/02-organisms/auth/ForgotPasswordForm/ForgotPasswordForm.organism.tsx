/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import {
  Button,
  Input,
  Text,
  LoadingSpinner,
  Box,
} from '../../../atoms';
import * as styles from './ForgotPasswordForm.organism.styles';
import { useI18n } from '../../../providers/I18nProvider';
import type { ForgotPasswordFormProps } from './ForgotPasswordForm.organism.types';

const ForgotPasswordForm = ({ 
  onSubmit, 
  isLoading = false, 
  errorMessage,
  onBackToLogin 
}: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const { t } = useI18n();

  const validate = () => {
    if (!email.trim()) {
      setEmailError(t('auth.validation.emailRequired') || 'Vui lòng nhập email');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t('auth.validation.emailInvalid') || 'Email không hợp lệ');
      return false;
    }
    setEmailError(undefined);
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    if (validate()) {
      onSubmit({ email });
    }
  };

  return (
    <Box as="form" css={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <Box>
        <Text as="h2" css={styles.title}>{t('auth.forgotPassword.title') || 'Quên mật khẩu?'}</Text>
        <Text as="p" css={styles.description}>
          {t('auth.forgotPassword.description') || 'Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.'}
        </Text>
      </Box>

      <Box css={styles.fieldWrapper}>
        <Text as="label" htmlFor="forgot-email" css={styles.label}>{t('auth.email') || 'Email'}</Text>
        <Input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nhapemail@gmail.com"
          disabled={isLoading}
          required
          autoComplete="email"
          error={emailError}
        />
      </Box>

      {errorMessage && (
        <div css={styles.errorMessage}>
          <Text as="span" size="sm">{errorMessage}</Text>
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" color="white" /> : (t('auth.forgotPassword.submit') || 'Gửi liên kết')}
      </Button>

      <Box css={styles.footer}>
        {onBackToLogin ? (
          <Button 
            type="button" 
            onClick={onBackToLogin} 
            variant="ghost"
            sx={styles.backLink}
          >
            {t('auth.backToLogin') || 'Quay lại đăng nhập'}
          </Button>
        ) : (
          <Text as="a" href="/auth/login" css={styles.backLink}>
            {t('auth.backToLogin') || 'Quay lại đăng nhập'}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;