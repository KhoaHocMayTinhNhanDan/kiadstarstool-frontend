/** @jsxImportSource @emotion/react */
import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { getSwitchRootStyles, getSwitchThumbStyles, switchWrapper, errorTextStyles } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ size = 'md', error, sx, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={switchWrapper} className={className}>
        <SwitchPrimitive.Root
          ref={ref} // Sửa lại để nhận ref
          css={[getSwitchRootStyles({ size, error: hasError }), sx]}
          {...props}
        >
          <SwitchPrimitive.Thumb css={getSwitchThumbStyles(size)} />
        </SwitchPrimitive.Root>

        {typeof error === 'string' && (
          <div css={errorTextStyles} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';