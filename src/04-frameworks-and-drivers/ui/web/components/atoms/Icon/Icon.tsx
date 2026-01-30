// src/04-frameworks-and-drivers/ui/web/components/atoms/Icon/Icon.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { getIconStyles, iconWrapper } from './Icon.styles';
import type { IconProps } from './Icon.types';

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ children, size = 'inherit', className, sx, ...props }, ref) => {
    return (
      <span css={iconWrapper} className={className}>
        <span
          ref={ref}
          css={[getIconStyles(size), sx]}
          {...props}
        >
          {children}
        </span>
      </span>
    );
  }
);

Icon.displayName = 'Icon';
