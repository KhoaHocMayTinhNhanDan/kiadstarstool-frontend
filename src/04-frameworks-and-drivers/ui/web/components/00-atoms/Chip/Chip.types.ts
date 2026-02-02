import type { CSSObject } from '@emotion/react';
import type { ReactNode, HTMLAttributes } from 'react';

export type ChipVariant = 'filled' | 'outlined' | 'ghost';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  icon?: ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
  sx?: CSSObject;
}