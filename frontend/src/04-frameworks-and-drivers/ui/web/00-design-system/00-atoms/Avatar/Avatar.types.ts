// src/04-frameworks-and-drivers/ui/web/components/00-atoms/Avatar/Avatar.types.ts
import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  /** Fallback text (initials) or Icon element */
  fallback?: ReactNode;
  /** Name to generate initials automatically */
  name?: string;
  size?: AvatarSize;
  sx?: CSSObject;
}