/** @jsxImportSource @emotion/react */
import React from 'react';
import { cardStyles } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, sx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        css={[cardStyles, sx]}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';