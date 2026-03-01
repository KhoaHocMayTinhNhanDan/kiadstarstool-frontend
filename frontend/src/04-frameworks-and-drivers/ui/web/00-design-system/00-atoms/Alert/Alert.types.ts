import { type ReactNode } from 'react';
import { type BoxProps } from '../Box';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<BoxProps, 'title'> {
  status?: AlertStatus;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}