/** @jsxImportSource @emotion/react */
import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { getCheckboxRootStyles, getCheckboxIndicatorStyles } from './Checkbox.styles';
import { Icon } from '../Icon/Icon';

const CheckIcon = <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  // Có thể thêm props custom nếu cần
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        css={getCheckboxRootStyles()}
        className={className}
        {...props}
      >
        <CheckboxPrimitive.Indicator css={getCheckboxIndicatorStyles()}>
          <Icon size="sm" style={{ width: 16, height: 16 }}>
            {CheckIcon}
          </Icon>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';