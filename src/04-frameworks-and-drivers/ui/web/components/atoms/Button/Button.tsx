/** @jsxImportSource @emotion/react */
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getButtonStyles } from './Button.styles';
import { LoadingSpinner } from '../Loading-spinner/Loading-spinner';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    asChild = false, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    loading = false,
    leftIcon,
    children, 
    className,
    disabled,
    ...props 
  }, ref) => {
    const Component = asChild ? Slot : 'button';
    
    return (
      <Component
        ref={ref}
        css={getButtonStyles(size, variant, fullWidth, loading)}
        className={className}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingSpinner size="sm" variant={variant === 'primary' || variant === 'danger' || variant === 'secondary' ? 'white' : 'primary'} />
          </span>
        )}
        {!loading && leftIcon && <span style={{ display: 'flex', marginRight: size === 'icon' ? 0 : 8 }}>{leftIcon}</span>}
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';