import type { ReactNode } from 'react';
import type { CardProps } from '../../../atoms/Card/Card.types';

export interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number; // e.g., 12.5
    label?: string; // e.g., "vs last month"
    direction?: 'up' | 'down' | 'neutral'; // Explicit direction override
  };
  description?: string;
  accentColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}