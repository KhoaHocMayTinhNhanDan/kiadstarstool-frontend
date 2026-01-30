import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
  error?: boolean | string; // Thêm hỗ trợ error
  sx?: CSSObject;
}