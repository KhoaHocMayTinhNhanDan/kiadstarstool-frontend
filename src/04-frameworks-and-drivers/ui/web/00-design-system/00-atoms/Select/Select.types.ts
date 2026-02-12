import type { CSSObject } from '@emotion/react';
import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: boolean | string;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}