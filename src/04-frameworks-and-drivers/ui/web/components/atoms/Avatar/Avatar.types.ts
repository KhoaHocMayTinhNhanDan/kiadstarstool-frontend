// src/04-frameworks-and-drivers/ui/web/components/atoms/Avatar/Avatar.types.ts
import type { CSSProperties, ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AvatarVariant = 'circle' | 'square' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  
  /** Alt text for accessibility */
  alt?: string;
  
  /** Size of the avatar */
  size?: AvatarSize;
  
  /** Visual variant */
  variant?: AvatarVariant;
  
  /** Status indicator */
  status?: AvatarStatus;
  
  /** Fallback text or icon when image fails to load */
  fallback?: ReactNode;
  
  /** Border around avatar */
  border?: boolean;
  
  /** Border color */
  borderColor?: string;
  
  /** Custom class name */
  className?: string;
  
  /** Custom styles */
  style?: CSSProperties;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional props */
  [key: string]: any;
}

export interface AvatarGroupProps {
  /** Avatars to display */
  children: ReactNode;
  
  /** Maximum avatars to show before +X */
  max?: number;
  
  /** Size for all avatars in group */
  size?: AvatarSize;
  
  /** Spacing between avatars */
  spacing?: number;
  
  /** Custom class name */
  className?: string;
}