import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'primary' | 'success' | 'danger' | 'neutral';

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number | null;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  indeterminate?: boolean;
  sx?: CSSObject;
}