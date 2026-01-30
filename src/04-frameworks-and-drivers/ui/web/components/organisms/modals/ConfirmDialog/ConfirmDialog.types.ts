import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmDialogVariant;
  isLoading?: boolean;
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}