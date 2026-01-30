import type { CSSObject } from '@emotion/react';
import { FONT_SIZES, FONT_WEIGHTS, COLORS } from '../00-core/tokens-constants';

type TextSize = keyof typeof FONT_SIZES;
type TextWeight = keyof typeof FONT_WEIGHTS;
type TextColor = keyof typeof COLORS | string;
type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextVariant =
  | 'heading-2xl'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'caption'
  | 'code';

type CommonTextProps = {
  variant?: TextVariant;
  /** @deprecated Use `variant` prop instead for semantic typography */
  size?: TextSize; // Giữ lại để không breaking change
  /** @deprecated Use `variant` prop instead for semantic typography */
  weight?: TextWeight; // Giữ lại để không breaking change
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  lineHeight?: string | number;
  sx?: CSSObject;
};

export type TextProps<T extends React.ElementType> = CommonTextProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CommonTextProps | 'as'>;