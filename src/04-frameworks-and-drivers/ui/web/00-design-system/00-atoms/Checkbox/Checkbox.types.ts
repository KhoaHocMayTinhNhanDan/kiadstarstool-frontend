import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: CheckboxSize;
  error?: boolean | string;
  sx?: CSSObject;
}