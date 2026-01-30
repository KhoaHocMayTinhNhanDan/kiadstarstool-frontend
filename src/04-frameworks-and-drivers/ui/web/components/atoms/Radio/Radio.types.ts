import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: RadioSize;
  error?: boolean | string;
  sx?: CSSObject;
}

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  sx?: CSSObject;
}