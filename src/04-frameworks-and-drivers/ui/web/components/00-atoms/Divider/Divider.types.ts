import type { CSSObject } from '@emotion/react';
import type { ColorKey, SpacingKey } from '../00-core/tokens-constants';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: ColorKey | string;
  thickness?: number | string;
  variant?: 'solid' | 'dashed' | 'dotted';
  my?: SpacingKey | string | number; // Margin Y (cho horizontal)
  mx?: SpacingKey | string | number; // Margin X (cho vertical)
  className?: string;
  sx?: CSSObject;
}