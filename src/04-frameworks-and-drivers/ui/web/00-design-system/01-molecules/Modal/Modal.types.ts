import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}