import type { CSSObject } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

export interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  error?: boolean | string;
  /** Custom styles using Emotion CSSObject */
  sx?: CSSObject;
}