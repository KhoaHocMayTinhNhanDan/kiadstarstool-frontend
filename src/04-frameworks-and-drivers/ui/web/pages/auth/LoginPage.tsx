// File: LoginPage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, Text } from '../../components/00-atoms';
import { LoginForm, type LoginFormData } from '../../components/02-organisms/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../components/00-atoms/00-core/tokens-constants';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      toast.success('Welcome back!');
      // Navigation handled by useEffect
    } catch (error: any) {
      console.error('Login error:', error); // Tắt log lỗi nếu muốn
      toast.error(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
      <Box mb="xl" textAlign="center">
        <Box mb="xs">
          <Text variant="heading-xl" weight="bold">Welcome back</Text>
        </Box>
        <Text color="SECONDARY">Enter your credentials to access your account</Text>
      </Box>

      <LoginForm 
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
        onForgotPassword={handleForgotPassword}
      />
    </Box>
  );
};
