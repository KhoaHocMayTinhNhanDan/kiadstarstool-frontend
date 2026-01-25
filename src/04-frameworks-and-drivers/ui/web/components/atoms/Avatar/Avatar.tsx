/** @jsxImportSource @emotion/react */
import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { getAvatarRootStyles, getAvatarImageStyles, getAvatarFallbackStyles } from './Avatar.styles';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        css={getAvatarRootStyles(size)}
        className={className}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          css={getAvatarImageStyles()}
        />
        <AvatarPrimitive.Fallback
          css={getAvatarFallbackStyles(size)}
          delayMs={600} // Delay hiển thị fallback để tránh nháy khi ảnh đang load nhanh
        >
          {fallback?.slice(0, 2).toUpperCase()}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = 'Avatar';