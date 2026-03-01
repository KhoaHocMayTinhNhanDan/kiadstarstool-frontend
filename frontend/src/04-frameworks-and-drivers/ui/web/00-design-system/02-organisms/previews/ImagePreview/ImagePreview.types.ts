// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/ImagePreview/ImagePreview.types.ts
import type { SerializedStyles } from '@emotion/react';
import type { ReactNode } from 'react';

export interface ImagePreviewProps {
  /** Đường dẫn ảnh */
  src: string;
  /** Alt text cho ảnh */
  alt?: string;
  /** Chiều rộng container (vd: 300, '100%') */
  width?: string | number;
  /** Chiều cao container */
  height?: string | number;
  /** Cho phép click để phóng to (Lightbox) */
  zoomable?: boolean;
  /** Chú thích hiển thị trong Lightbox */
  caption?: ReactNode;
  /** Custom className */
  className?: string;
  /** Emotion styles */
  sx?: SerializedStyles;
  /** Test ID */
  testId?: string;
}