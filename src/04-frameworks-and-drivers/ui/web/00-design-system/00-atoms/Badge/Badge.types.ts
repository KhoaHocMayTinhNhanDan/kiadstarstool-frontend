import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export type BadgeVariant = 'filled' | 'outline' | 'ghost';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
  sx?: CSSObject;
}