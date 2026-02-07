// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/VideoPreview/VideoPreview.types.ts
import type { SerializedStyles } from '@emotion/react';

export interface VideoPreviewProps {
  /** Đường dẫn video */
  src: string;
  
  /** Ảnh thumbnail hiển thị trước khi phát */
  poster?: string;
  
  /** Chiều rộng container */
  width?: string | number;
  
  /** Chiều cao container */
  height?: string | number;
  
  /** Tự động phát (yêu cầu muted để autoplay trên một số trình duyệt) */
  autoplay?: boolean;
  
  /** Hiển thị trình điều khiển mặc định của trình duyệt */
  controls?: boolean;
  
  /** Lặp lại video */
  loop?: boolean;
  
  /** Tắt tiếng */
  muted?: boolean;
  
  /** Tiêu đề video (accessibility) */
  title?: string;
  
  className?: string;
  sx?: SerializedStyles;
  testId?: string;
}