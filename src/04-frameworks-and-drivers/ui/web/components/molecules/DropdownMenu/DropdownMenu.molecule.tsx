/** @jsxImportSource @emotion/react */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { contentStyles, itemStyles, separatorStyles } from './DropdownMenu.molecule.styles';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} css={contentStyles} {...props}>
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
));

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} css={itemStyles} {...props}>
    {children}
  </DropdownMenuPrimitive.Item>
));

export const DropdownMenuSeparator = () => <DropdownMenuPrimitive.Separator css={separatorStyles} />;