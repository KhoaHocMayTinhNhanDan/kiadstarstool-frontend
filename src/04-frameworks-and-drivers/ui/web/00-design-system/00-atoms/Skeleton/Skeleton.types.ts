import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  sx?: CSSObject;
}