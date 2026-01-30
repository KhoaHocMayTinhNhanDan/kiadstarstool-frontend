import type { CSSObject } from '@emotion/react';
import type { AvatarProps } from '../../atoms/Avatar/Avatar.types';

export interface UserCardProps {
  name: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  avatarSize?: AvatarProps['size'];
  onClick?: () => void;
  className?: string;
  sx?: CSSObject;
}