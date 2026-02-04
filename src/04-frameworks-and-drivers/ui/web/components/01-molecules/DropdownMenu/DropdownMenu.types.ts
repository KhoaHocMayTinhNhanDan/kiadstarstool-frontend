// src/04-frameworks-and-drivers/ui/web/components/01-molecules/DropdownMenu/DropdownMenu.types.ts
import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  sx?: CSSObject;
}

export interface DropdownMenuContentProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  sx?: CSSObject;
}

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  sx?: CSSObject;
}

export interface DropdownMenuSeparatorProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  sx?: CSSObject;
}

export interface DropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  sx?: CSSObject;
}

export interface DropdownMenuGroupProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> {
  sx?: CSSObject;
}