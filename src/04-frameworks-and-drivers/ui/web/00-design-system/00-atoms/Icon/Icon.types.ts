import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { SIZES } from '../../../01-ui-core/constants/tokens-constants';

export type IconSize = keyof typeof SIZES | 'inherit';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: IconSize;
  className?: string;
  sx?: CSSObject;
}