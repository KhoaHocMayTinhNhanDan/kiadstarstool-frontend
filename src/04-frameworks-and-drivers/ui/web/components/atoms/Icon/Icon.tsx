/** @jsxImportSource @emotion/react */
import React from 'react';
import { getIconStyles, SIZES } from './Icon.styles';

export type IconSize = keyof typeof SIZES;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: IconSize;
  color?: string;
  children: React.ReactNode; // SVG content
}

export const Icon = ({ 
  size = 'md', 
  color, 
  children, 
  className, 
  ...props 
}: IconProps) => {
  return (
    <span 
      css={getIconStyles(size, color)} 
      className={className}
      {...props}
    >
      {children}
    </span>
  );
};