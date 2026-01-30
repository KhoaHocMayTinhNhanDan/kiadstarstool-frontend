// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input.types.ts
import type { CSSObject } from '@emotion/react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  error?: boolean | string;
  fullWidth?: boolean; // vẫn giữ để backward-compatible
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Custom styles using Emotion CSSObject */
  sx?: CSSObject;
}
