// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.types.ts
import type { ChangeEvent } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface SearchInputProps {
  /** Giá trị của input (Controlled mode) */
  value?: string;
  
  /** Giá trị mặc định (Uncontrolled mode) */
  defaultValue?: string;
  
  /** Callback khi giá trị thay đổi */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  
  /** Callback khi người dùng nhấn Enter hoặc click nút Clear */
  onSearch?: (value: string) => void;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Kích thước input */
  size?: 'sm' | 'md' | 'lg';
  
  /** Trạng thái disabled */
  disabled?: boolean;
  
  /** Tự động focus khi mount */
  autoFocus?: boolean;
  
  /** Custom class name (được Emotion inject) */
  className?: string;
  
  /** Emotion styles override */
  sx?: SerializedStyles;
  
  /** Test ID cho testing */
  testId?: string;
}
