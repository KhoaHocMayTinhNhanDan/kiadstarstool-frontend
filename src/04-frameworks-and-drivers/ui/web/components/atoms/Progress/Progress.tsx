/** @jsxImportSource @emotion/react */
import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { getProgressRootStyles, getProgressIndicatorStyles } from './Progress.styles';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'primary' | 'success' | 'danger' | 'neutral';

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number | null;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  indeterminate?: boolean;
}

export const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ value, max = 100, size = 'md', variant = 'primary', indeterminate = false, className, ...props }, ref) => {
    // Tính toán phần trăm để hiển thị (Radix dùng translateX âm để đẩy thanh progress)
    const percentage = value != null ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

    return (
      <ProgressPrimitive.Root
        ref={ref}
        css={getProgressRootStyles(size)}
        className={className}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          css={getProgressIndicatorStyles(variant, indeterminate)}
          style={{
            // Nếu không phải indeterminate thì dùng transform của Radix logic
            transform: indeterminate ? undefined : `translateX(-${100 - percentage}%)`
          }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = 'Progress';