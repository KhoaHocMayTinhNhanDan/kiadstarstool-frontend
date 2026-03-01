// src/04-frameworks-and-drivers/ui/web/components/00-atoms/Input/Input.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  inputStyles,
  errorText,
  inputWrapper,
  inputContainer,
  iconWrapper,
  labelText,
} from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'md',
      error,
      disabled,
      readOnly,
      fullWidth, // Destructure to consume it, preventing it from being in ...props
      leftIcon,
      rightIcon,
      sx,
      className,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div css={inputWrapper} className={className}>
        {label && (
          <label css={labelText} htmlFor={props.id}>
            {label}
          </label>
        )}

        <div css={inputContainer}>
          {leftIcon && <div css={iconWrapper('left')}>{leftIcon}</div>}

          <input
            ref={ref}
            css={[
              inputStyles({
                size,
                error: hasError,
                disabled,
                readOnly,
                hasLeftIcon: !!leftIcon,
                hasRightIcon: !!rightIcon,
              }),
              sx,
            ]}
            aria-invalid={hasError}
            aria-readonly={readOnly}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />

          {rightIcon && <div css={iconWrapper('right')}>{rightIcon}</div>}
        </div>

        {typeof error === 'string' && (
          <div css={errorText} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
