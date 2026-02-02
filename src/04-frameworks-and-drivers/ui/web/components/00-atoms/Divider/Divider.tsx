/** @jsxImportSource @emotion/react */
import React from 'react';
import { getDividerStyles } from './Divider.styles';
import type { DividerProps } from './Divider.types';

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, sx, ...props }, ref) => {
    // Nếu là vertical, thường dùng div thay vì hr để dễ control height
    const Component = orientation === 'horizontal' ? 'hr' : 'div';

    return (
      <Component
        ref={ref as any}
        css={[getDividerStyles({ orientation, ...props }), sx]}
        className={className}
        role="separator"
        aria-orientation={orientation}
      />
    );
  }
);

Divider.displayName = 'Divider';