/** @jsxImportSource @emotion/react */
import React from 'react';
import { getSelectStyles, selectWrapper, labelStyles, errorTextStyles } from './Select.styles';
import type { SelectProps } from './Select.types';

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, helperText, fullWidth = false, size = 'md', disabled, placeholder, className, sx, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={selectWrapper} className={className}>
        {label && (
          <label htmlFor={props.id} css={labelStyles}>
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          css={[getSelectStyles({ error: hasError, disabled, size }), sx]}
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