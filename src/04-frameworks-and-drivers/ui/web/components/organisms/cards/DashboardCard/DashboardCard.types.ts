import type { ReactNode } from 'react';
import type { CardProps } from '../../../atoms/Card/Card.types';

export interface DashboardCardProps extends Omit<CardProps, 'children'> {
  icon: ReactNode;
  title: string;
  value: string | number;
  description?: ReactNode;
  /**
   * Color of the icon background
   */
  accentColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}