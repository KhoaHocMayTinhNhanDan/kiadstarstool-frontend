/** @jsxImportSource @emotion/react */
import React from 'react';
import { getSkeletonStyles } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, sx, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        css={[getSkeletonStyles(variant, width, height), sx]}
        className={className}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';