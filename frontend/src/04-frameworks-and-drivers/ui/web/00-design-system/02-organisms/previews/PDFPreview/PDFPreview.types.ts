// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/PDFPreview/PDFPreview.types.ts
import type { SerializedStyles } from '@emotion/react';

export interface PDFPreviewProps {
  /** Đường dẫn file PDF */
  src: string;
  
  /** Tiêu đề file (dùng cho accessibility và title attribute) */
  title?: string;
  
  /** Chiều rộng container (Mặc định: '100%') */
  width?: string | number;
  
  /** Chiều cao container (Mặc định: '500px') */
  height?: string | number;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
}