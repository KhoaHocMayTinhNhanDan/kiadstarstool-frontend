/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Eye, EyeOff } from 'lucide-react';
import { Box, Text, Input, Button, Alert, IconButton } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { useAuth } from '../../hooks/user/useAuthorization';
import { useToast } from '../../../01-ui-core/hooks/useToast';

export const LoginPage = () => {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Tự động điều hướng nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

  return (
    <Box
      css={css`
        width: 100%;
        max-width: 400px;
        padding: ${SPACING.xl};
        background-color: ${COLORS.BACKGROUND_PAPER};
        border-radius: ${RADIUS.lg};
        box-shadow: ${SHADOWS.lg};
        border: 1px solid ${COLORS.NEUTRAL_BORDER};
      `}
    >
      <Box mb="xl" sx={{ textAlign: 'center' }}>
        <Text as="h1" variant="heading-xl" weight="bold">
          Đăng nhập
        </Text>
        <Text color="SECONDARY" >
          Chào mừng trở lại!
        </Text>
      </Box>

      {error && <Alert status="error" title="Lỗi" description={error} mb="lg" />}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="lg">
          <Box display="flex" flexDirection="column" gap="xs">
            <Text as="label" size="sm" weight="medium">Email</Text>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          
          <Box display="flex" flexDirection="column" gap="xs">
            <Text as="label" size="sm" weight="medium">Mật khẩu</Text>
            <Box position="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                css={css`padding-right: 40px;`}
              />
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                css={css`
                  position: absolute;
                  right: 8px;
                  top: 50%;
                  transform: translateY(-50%);
                  color: ${COLORS.SECONDARY};
                  &:hover { background-color: transparent; }
                `}
              />
            </Box>
          </Box>
          
          <Button type="submit" isLoading={isSubmitting} >
            Đăng nhập
          </Button>
        </Box>
      </form>

      <Box mt="lg" sx={{ textAlign: 'center' }}>
        <Text size="sm" color="SECONDARY">
          Chưa có tài khoản?{' '}
          <Link to="/register" style={{ color: COLORS.PRIMARY, fontWeight: 600, textDecoration: 'none' }}>
            Đăng ký ngay
          </Link>
        </Text>
      </Box>
    </Box>
  );
};