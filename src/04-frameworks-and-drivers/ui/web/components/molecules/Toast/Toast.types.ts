import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends ToastPrimitive.ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}