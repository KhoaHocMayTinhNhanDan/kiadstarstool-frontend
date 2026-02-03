// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.types.ts
import type { CSSObject } from '@emotion/react';
import type { InputProps } from '../../00-atoms/Input/Input.types';

// Override value type to only accept string for SearchInput
type StringInputProps = Omit<InputProps, 'value' | 'onChange' | 'leftIcon' | 'rightIcon'> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface SearchInputProps extends StringInputProps {
  /** Callback khi giá trị thay đổi */
  onSearch?: (value: string) => void;
  /** Hiển thị clear button */
  showClearButton?: boolean;
  /** Custom search icon */
  searchIcon?: React.ReactNode;
  /** Custom clear icon */
  clearIcon?: React.ReactNode;
  /** Custom styles */
  sx?: CSSObject;
}