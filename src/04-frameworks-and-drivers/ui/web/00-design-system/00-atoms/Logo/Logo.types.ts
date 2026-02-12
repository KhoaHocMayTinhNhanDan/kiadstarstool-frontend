import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  sx?: CSSObject;
}