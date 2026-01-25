/** @jsxImportSource @emotion/react */
import React from 'react';
import { getSkeletonStyles } from './Skeleton.styles';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  className, 
  ...props 
}: SkeletonProps) => {
  // Nếu variant là text, mặc định height sẽ theo dòng chữ (ví dụ 1em hoặc 20px)
  const defaultHeight = variant === 'text' ? '1em' : height;

  return (
    <div 
      css={getSkeletonStyles(variant, width, defaultHeight)} 
      className={className} 
      {...props} 
    />
  );
};

Skeleton.displayName = 'Skeleton';