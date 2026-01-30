/** @jsxImportSource @emotion/react */
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  contentStyles,
  itemStyles,
  separatorStyles,
} from './DropdownMenu.molecule.styles';
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuSeparatorProps,
} from './DropdownMenu.types';

/* ==========================================================================
 * ROOT & TRIGGER
 * ========================================================================== */

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/* ==========================================================================
 * CONTENT
 * ========================================================================== */

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ children, sideOffset = 4, sx, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      css={[contentStyles, sx]}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = 'DropdownMenuContent';

/* ==========================================================================
 * ITEM
 * ========================================================================== */

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ children, sx, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} css={[itemStyles, sx]} {...props}>
    {children}
  </DropdownMenuPrimitive.Item>
));

DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ==========================================================================
 * SEPARATOR
 * ========================================================================== */

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ sx, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    css={[separatorStyles, sx]}
    {...props}
  />
));

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
