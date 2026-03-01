import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  sx?: CSSObject;
}