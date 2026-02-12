import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  sx?: CSSObject;
  orientation?: 'vertical' | 'horizontal';
}
