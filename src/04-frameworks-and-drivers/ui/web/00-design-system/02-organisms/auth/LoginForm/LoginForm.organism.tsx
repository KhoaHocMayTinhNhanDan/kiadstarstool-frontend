// src/04-frameworks-and-drivers/ui/web/components/02-organisms/auth/LoginForm/LoginForm.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box, Button, Input, Text, Checkbox } from '../../../00-atoms';
import * as styles from './LoginForm.styles';
import type { LoginFormProps, LoginFormData } from './LoginForm.types';

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  onForgotPassword,
  errorMessage,
  className,
  sx,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      css={[styles.formContainer, sx]} 
      className={className}
      noValidate
    >
      {errorMessage && (
        <div css={styles.errorMessage}>{errorMessage}</div>
      )}

      <Box>
        <Box mb="xs">
          <Text variant="body-sm" weight="medium">Email</Text>
        </Box>
        <Input 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={!!errors.email}
          autoFocus
          autoComplete="email"
        />
        {errors.email && <Text variant="caption" color="DANGER">{errors.email}</Text>}
      </Box>

      <Box>
        <Box display="flex" justifyContent="space-between" mb="xs">
          <Text variant="body-sm" weight="medium">Password</Text>
          {onForgotPassword && (
            <a onClick={onForgotPassword} css={styles.forgotPasswordLink}>
              Forgot password?
            </a>
          )}
        </Box>
        <Input 
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          error={!!errors.password}
          autoComplete="current-password"
        />
        {errors.password && <Text variant="caption" color="DANGER">{errors.password}</Text>}
      </Box>

      <Box display="flex" alignItems="center" gap="sm">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={(checked) => setRememberMe(checked === true)}
          disabled={isLoading}
        />
        <Text as="label" htmlFor="remember-me" variant="body-sm" sx={{ cursor: 'pointer' } as any}>Remember me for 30 days</Text>
      </Box>

      <Button 
        type="submit" 
        fullWidth 
        size="lg" 
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
};