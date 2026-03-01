import type { InputHTMLAttributes, ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: InputSize;
  error?: string | boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  sx?: SerializedStyles;
  className?: string;
}