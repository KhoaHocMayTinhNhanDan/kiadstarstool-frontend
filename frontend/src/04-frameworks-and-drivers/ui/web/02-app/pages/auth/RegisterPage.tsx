/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, Text, Input, Button, Alert } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { useAuth } from '../../hooks/user/123/useAuth';
import { useToast } from '../../../01-ui-core/hooks/useToast';

export const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(email, password);
      
      if (result.isSuccess) {
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        setError(result.getErrorValue());
        toast.error('Đăng ký thất bại');
      }
    } catch (err: any) {
      setError('Đã xảy ra lỗi không mong muốn.');
    } finally {
      setIsLoading(false);
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
          Đăng ký tài khoản
        </Text>
        <Text color="SECONDARY">
          Tham gia cùng chúng tôi ngay hôm nay!
        </Text>
      </Box>

      {error && <Alert status="error" title="Lỗi" description={error} mb="lg" />}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="lg">
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Nhập lại mật khẩu"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <Button type="submit" isLoading={isLoading} >
            Đăng ký
          </Button>
        </Box>
      </form>

      <Box mt="lg" sx={{ textAlign: 'center' }}>
        <Text size="sm" color="SECONDARY">
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ color: COLORS.PRIMARY, fontWeight: 600, textDecoration: 'none' }}>
            Đăng nhập
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
