/** @jsxImportSource @emotion/react */
import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { getAvatarRootStyles, avatarImageStyles, getAvatarFallbackStyles, avatarWrapper } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, sx, ...props }, ref) => {
    return (
      <div css={avatarWrapper} className={className}>
        <AvatarPrimitive.Root
          ref={ref}
          css={[getAvatarRootStyles(size), sx]}
          {...props}
        >
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            css={avatarImageStyles}
          />
          <AvatarPrimitive.Fallback
            delayMs={600}
            css={getAvatarFallbackStyles(size)}
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';