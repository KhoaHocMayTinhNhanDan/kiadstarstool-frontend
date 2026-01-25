/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { getInputStyles, getInputWrapperStyles, getIconStyles, getErrorMessageStyles } from './Input.styles';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  fullWidth?: boolean;
  error?: boolean | string; // Có thể truyền boolean hoặc message lỗi
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', fullWidth = false, error, leftIcon, rightIcon, className, style, ...props }, ref) => {
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : null;

    return (
      <div css={css`display: flex; flex-direction: column; width: ${fullWidth ? '100%' : 'auto'};`}>
        <div css={getInputWrapperStyles(fullWidth)} className={className} style={style}>
          {leftIcon && (
            <div css={getIconStyles('left', size)}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            css={getInputStyles(size, !!leftIcon, !!rightIcon, hasError)}
            {...props}
          />

          {rightIcon && (
            <div css={getIconStyles('right', size)}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {errorMessage && <span css={getErrorMessageStyles()}>{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';