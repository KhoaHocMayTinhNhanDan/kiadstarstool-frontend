import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  variant: ToastVariant;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}