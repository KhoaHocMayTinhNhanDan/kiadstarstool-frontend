import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * If true, the code will be displayed as a block element.
   */
  block?: boolean;
  sx?: CSSObject;
}