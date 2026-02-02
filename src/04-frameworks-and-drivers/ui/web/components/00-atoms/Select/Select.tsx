/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { getSelectStyles, selectWrapper, labelStyles, errorTextStyles } from './Select.styles';
import type { SelectProps } from './Select.types';

// Style dynamic cho Label dựa trên size
const getLabelSizeStyles = (size: string) => {
  const sizeMap: Record<string, string> = {
    sm: '0.75rem',   // 12px
    md: '0.875rem',  // 14px
    lg: '1rem',      // 16px
  };
  return css`
    font-size: ${sizeMap[size] || '0.875rem'};
  `;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, helperText, fullWidth = false, size = 'md', disabled, placeholder, className, sx, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={[selectWrapper, fullWidth && { width: '100%' }]} className={className}>
        {label && (
          <label htmlFor={props.id} css={[labelStyles, getLabelSizeStyles(size)]}>
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          css={[
            getSelectStyles({ error: hasError, disabled, size }),
            fullWidth && { width: '100%' },
            sx
          ]}
          disabled={disabled}
          aria-invalid={hasError}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {typeof error === 'string' && (
          <span css={errorTextStyles} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';