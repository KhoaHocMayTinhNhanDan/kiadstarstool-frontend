import type { ReactNode } from 'react';
import type { CardProps } from '../../../atoms/Card/Card.types';

export interface UserStat {
  label: string;
  value: string | number;
}

export interface UserProfileCardProps extends Omit<CardProps, 'children'> {
  avatarSrc?: string;
  avatarFallback: string;
  name: string;
  role?: string;
  coverSrc?: string;
  stats?: UserStat[];
  description?: string;
  actions?: ReactNode;
  onFollow?: () => void;
  isFollowing?: boolean;
}