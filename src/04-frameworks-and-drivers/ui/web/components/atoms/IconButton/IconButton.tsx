// src/04-frameworks-and-drivers/ui/web/components/atoms/IconButton/IconButton.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SIZES } from '../00-core/tokens-constants';
import type { IconButtonProps } from './IconButton.types';

/**
 * IconButton – Production ready (FINAL)
 *
 * Rules:
 * - Button controls hit-area
 * - Icon scales from design tokens (SIZES)
 * - No duplicated size map
 * - No magic numbers
 */
export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(({ icon, size = 'md', sx, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      size={size}
      sx={{
        padding: 0,

        /* Perfect center */
        display: 'grid',
        placeItems: 'center',
        lineHeight: 0,

        /* Square hit-area */
        aspectRatio: '1 / 1',
        minWidth: 40,
        minHeight: 40,

        /* 🔑 SINGLE SOURCE OF TRUTH
           Icon uses 1em → fontSize drives scale */
        fontSize: SIZES[size],

        ...sx,
      }}
      {...props}
    >
      {/* Icon = 1em × 1em */}
      <Icon size="inherit">
        {icon}
      </Icon>
    </Button>
  );
});

IconButton.displayName = 'IconButton';
