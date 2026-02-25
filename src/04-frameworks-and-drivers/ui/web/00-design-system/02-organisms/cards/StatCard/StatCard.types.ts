// src/04-frameworks-and-drivers/ui/web/components/02-organisms/cards/StatCard/StatCard.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export type StatCardAccent = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
    direction?: 'up' | 'down';
  };
  description?: string;
  accentColor?: StatCardAccent;
  isLoading?: boolean;
  className?: string;
  sx?: SerializedStyles;
  testId?: string;
}