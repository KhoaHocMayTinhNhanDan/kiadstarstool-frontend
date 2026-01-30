/** @jsxImportSource @emotion/react */
import React from 'react';
import { getBadgeStyles, badgeWrapper } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'filled', color = 'primary', size = 'md', className, sx, ...props }, ref) => {
    return (
      <span css={badgeWrapper} className={className}>
        <span
          ref={ref}
          css={[getBadgeStyles(variant, color, size), sx]}
          {...props}
        >
          {children}
        </span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';