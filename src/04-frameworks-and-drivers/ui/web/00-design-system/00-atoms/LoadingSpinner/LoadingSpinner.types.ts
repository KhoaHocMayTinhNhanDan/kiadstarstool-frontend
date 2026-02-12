import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: string;
  sx?: CSSObject;
}