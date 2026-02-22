import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { SIZES } from '../../../03-ui-shared/constants/tokens-constants';

export type IconSize = keyof typeof SIZES | 'inherit';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: IconSize;
  className?: string;
  sx?: CSSObject;
}