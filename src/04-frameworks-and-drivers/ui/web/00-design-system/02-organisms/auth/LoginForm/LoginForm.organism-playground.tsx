/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { LoginForm } from './LoginForm.organism';
import type { LoginFormData } from './LoginForm.types';
import { Box, Text } from '../../../00-atoms';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../../../03-ui-shared/constants/tokens-constants';

export const LoginFormPlayground = () => {
  // State cho Interactive Demo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (data: LoginFormData) => {
    setLoading(true);
    setError(undefined);
    
    console.log('Form submitted:', data);

    // Giả lập gọi API
    setTimeout(() => {
      setLoading(false);
      // Giả lập lỗi nếu email chứa từ "error"
      if (data.email.includes('error')) {
        setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
      } else {
        alert(`Đăng nhập thành công!\nEmail: ${data.email}\nPassword: ${data.password}\nRemember: ${data.rememberMe}`);
      }
    }, 1500);
  };

  // Style giả lập Card container cho form (vì LoginForm giờ là pure form)
  const cardStyle = css`
    background-color: ${COLORS.BACKGROUND_PAPER};
    border: 1px solid ${COLORS.NEUTRAL_BORDER};
    border-radius: ${RADIUS.lg};
    padding: ${SPACING.xl};
    box-shadow: ${SHADOWS.md};
  `;

  return (
    <Box p="xl" css={css`background-color: ${COLORS.BACKGROUND_NEUTRAL}; min-height: 100vh;`}>
      <Box mb="xl" textAlign="center">
        <Text as="h1" variant="heading-2xl" weight="bold">
          🎨 LoginForm Playground
        </Text>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="xl" justifyContent="center">
        
        {/* Case 1: Interactive Demo */}
        <Box width="100%" maxWidth="400px">
          <Box mb="md" textAlign="center">
            <Text as="h3" variant="heading-md" weight="semibold">
              1. Interactive Demo
            </Text>
            <Text variant="body-sm" color="SECONDARY">
              (Nhập "error" vào email để test lỗi)
            </Text>
          </Box>
          <Box css={cardStyle}>
            <LoginForm 
              onSubmit={handleSubmit}
              isLoading={loading}
              errorMessage={error}
              onForgotPassword={() => alert('Navigate to Forgot Password Page')}
            />
          </Box>
        </Box>

        {/* Case 2: Loading State */}
        <Box width="100%" maxWidth="400px">
          <Box mb="md" textAlign="center">
            <Text as="h3" variant="heading-md" weight="semibold">
              2. Loading State
            </Text>
            <Text variant="body-sm" color="SECONDARY">
              (Mô phỏng trạng thái đang gửi dữ liệu)
            </Text>
          </Box>
          <Box css={cardStyle}>
            <LoginForm 
              onSubmit={() => {}}
              isLoading={true}
            />
          </Box>
        </Box>

        {/* Case 3: Error State */}
        <Box width="100%" maxWidth="400px">
          <Box mb="md" textAlign="center">
            <Text as="h3" variant="heading-md" weight="semibold">
              3. Error State
            </Text>
            <Text variant="body-sm" color="SECONDARY">
              (Mô phỏng hiển thị lỗi từ server)
            </Text>
          </Box>
          <Box css={cardStyle}>
            <LoginForm 
              onSubmit={() => {}}
              errorMessage="Tài khoản của bạn đã bị khóa do đăng nhập sai quá nhiều lần."
            />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};