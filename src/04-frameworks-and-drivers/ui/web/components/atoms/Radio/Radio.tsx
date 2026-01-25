/** @jsxImportSource @emotion/react */
import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { getRadioGroupRootStyles, getRadioItemStyles, getRadioIndicatorStyles } from './Radio.styles';

// --- Types ---
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioVariant = 'primary' | 'success' | 'danger' | 'neutral';

// --- Radio Group (Root) ---
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  // Có thể thêm props custom cho Group nếu cần (ví dụ layout row/column)
}

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        css={getRadioGroupRootStyles()}
        className={className}
        {...props}
        ref={ref}
      />
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// --- Radio Item (Button) ---
export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: RadioSize;
  variant?: RadioVariant;
}

export const RadioItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioItemProps>(
  ({ className, size = 'md', variant = 'primary', ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        css={getRadioItemStyles(size, variant)}
        className={className}
        {...props}
        ref={ref}
      >
        <RadioGroupPrimitive.Indicator css={getRadioIndicatorStyles(size, variant)} />
      </RadioGroupPrimitive.Item>
    );
  }
);
RadioItem.displayName = 'RadioItem';