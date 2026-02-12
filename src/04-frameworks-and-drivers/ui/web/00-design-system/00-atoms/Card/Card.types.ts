import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}