// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button.tsx
import React, { forwardRef } from 'react';
import { StyledButton, LoadingSpinner } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      radius = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      loadingText,
      className,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      
      onClick?.(event);
    };

    // Determine what to render based on loading state
    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner />
            {loadingText || children}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
          <span className="button-content">{children}</span>
          {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
        </>
      );
    };

    return (
      <StyledButton
        ref={ref}
        type={type}
        $variant={variant}
        $size={size}
        $radius={radius}
        $fullWidth={fullWidth}
        disabled={disabled || loading}
        data-loading={loading}
        className={`button ${className || ''}`}
        onClick={handleClick}
        aria-busy={loading}
        aria-disabled={disabled}
        {...props}
      >
        {renderContent()}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

// Export component
export default Button;