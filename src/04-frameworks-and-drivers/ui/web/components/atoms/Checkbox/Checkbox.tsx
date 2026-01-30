/** @jsxImportSource @emotion/react */
import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { getCheckboxStyles, getIndicatorStyles, checkboxWrapper, errorTextStyles } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
  </svg>
);

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ size = 'md', error, sx, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={checkboxWrapper} className={className}>
        <CheckboxPrimitive.Root
          ref={ref}
          css={[getCheckboxStyles({ size, error: hasError }), sx]}
          {...props}
        >
          <CheckboxPrimitive.Indicator css={getIndicatorStyles()}>
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {typeof error === 'string' && (
          <div css={errorTextStyles} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';