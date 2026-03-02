/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { useAuth } from '../../hooks/user/useAuthorization';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { LoginForm, type LoginFormData } from '../../../00-design-system/02-organisms/auth/LoginForm';

export const LoginPage = () => {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tự động điều hướng nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    setIsSubmitting(true);
    // Gọi login từ hook, kết quả trả về là Result object
    const result = await login(email, password);
    setIsSubmitting(false);
    
    if (result.isSuccess) {
      toast.success('Đăng nhập thành công!');
      // Việc điều hướng sẽ được useEffect xử lý khi isAuthenticated chuyển thành true
    } else {
      // Lỗi đã được cập nhật vào state 'error' của hook, nhưng ta cũng có thể toast
      toast.error('Đăng nhập thất bại');
    }
  };

  const handleForgotPassword = () => {
    toast.info('Tính năng "Quên mật khẩu" đang được phát triển.');
  };

  return (
    <Box display="flex" flexDirection="column" gap="xl">
      <Box sx={{ textAlign: 'center' }}>
        <Text as="h1" variant="heading-xl" weight="bold">
          Đăng nhập
        </Text>
        <Text color="SECONDARY">
          Chào mừng trở lại!
        </Text>
      </Box>

      <LoginForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        errorMessage={error || undefined}
        onForgotPassword={handleForgotPassword}
      />

      <Box mt="lg" sx={{ textAlign: 'center' }}>
        <Text size="sm" color="SECONDARY">
          Chưa có tài khoản?{' '}
          <Link to="#" style={{ color: COLORS.PRIMARY, fontWeight: 600, textDecoration: 'none' }}>
            Đăng ký ngay
          </Link>
        </Text>
      </Box>
    </Box>
  );
};