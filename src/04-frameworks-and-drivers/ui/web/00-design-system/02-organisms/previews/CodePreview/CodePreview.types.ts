// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/CodePreview/CodePreview.types.ts
import type { SerializedStyles } from '@emotion/react';

export interface CodePreviewProps {
  /** Mã nguồn cần hiển thị */
  code: string;
  /** Ngôn ngữ (vd: 'typescript', 'json') */
  language?: string;
  /** Tiêu đề hoặc tên file */
  title?: string;
  /** Hiển thị số dòng */
  showLineNumbers?: boolean;
  /** Chiều cao tối đa trước khi scroll */
  maxHeight?: string | number;
  /** Cho phép copy */
  copyable?: boolean;
  /** Custom className */
  className?: string;
  /** Emotion styles */
  sx?: SerializedStyles;
  /** Test ID */
  testId?: string;
}