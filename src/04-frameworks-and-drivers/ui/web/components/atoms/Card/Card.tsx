/** @jsxImportSource @emotion/react */
import React from 'react';
import { getCardStyles } from './Card.styles';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: string | number;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', padding = '24px', className, children, ...props }, ref) => {
    return (
      <div ref={ref} css={getCardStyles(variant, padding)} className={className} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';