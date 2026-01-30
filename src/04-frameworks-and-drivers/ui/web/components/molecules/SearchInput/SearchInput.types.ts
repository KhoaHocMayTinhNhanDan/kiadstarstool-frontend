import type { CSSObject } from '@emotion/react';
import type { InputProps } from '../../atoms/Input/Input.types';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  onSearch?: (value: string) => void;
  /**
   * Custom styles using Emotion CSSObject
   */
  sx?: CSSObject;
}