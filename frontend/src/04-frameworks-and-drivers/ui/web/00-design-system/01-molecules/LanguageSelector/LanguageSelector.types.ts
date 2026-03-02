import type { SerializedStyles } from '@emotion/react';

export interface LanguageOption {
  code: string;
  label: string;
  flag?: string; // Emoji hoặc URL hình ảnh
}

export interface LanguageSelectorProps {
  /** Mã ngôn ngữ đang chọn */
  value?: string;

  /** Callback khi thay đổi ngôn ngữ */
  onChange: (code: string) => void;

  /** Danh sách ngôn ngữ tùy chọn (Mặc định: VI, EN) */
  options?: LanguageOption[] | readonly LanguageOption[];

  /** Kiểu hiển thị */
  variant?: 'default' | 'icon-only' | 'text-only';

  /** 
   * Căn lề dropdown so với nút bấm
   * - 'right' (Mặc định): Căn phải -> Menu mở sang TRÁI
   * - 'left': Căn trái -> Menu mở sang PHẢI
   */
  dropdownAlign?: 'left' | 'right';

  className?: string;
  sx?: SerializedStyles;
  testId?: string;
}