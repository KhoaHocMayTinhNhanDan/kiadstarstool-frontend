// src/04-frameworks-and-drivers/ui/web/components/00-atoms/Avatar/Avatar.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { getAvatarRootStyles, avatarImageStyles, getAvatarFallbackStyles, avatarWrapper } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

// Helper: Tạo initials từ tên
const getInitials = (name?: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ 
    src, 
    alt, 
    fallback, 
    name,
    size = 'md', 
    className, 
    sx, 
    ...props 
  }, ref) => {
    
    // Tự động tạo fallback từ name nếu không có fallback
    const fallbackText = fallback || getInitials(name);
    // Tự động tạo alt từ name nếu không có alt
    const altText = alt || (name ? `${name}'s avatar` : 'User avatar');
    
    return (
      <div css={avatarWrapper} className={className}>
        <AvatarPrimitive.Root
          ref={ref}
          css={[getAvatarRootStyles(size), sx]}
          {...props}
        >
          <AvatarPrimitive.Image
            src={src}
            alt={altText}
            css={avatarImageStyles}
          />
          <AvatarPrimitive.Fallback
            delayMs={600}
            css={getAvatarFallbackStyles(size)}
          >
            {fallbackText}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';