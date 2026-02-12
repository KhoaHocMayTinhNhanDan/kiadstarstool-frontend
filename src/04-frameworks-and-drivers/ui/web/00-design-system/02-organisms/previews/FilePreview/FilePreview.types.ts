// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/FilePreview/FilePreview.types.ts
import type { SerializedStyles } from '@emotion/react';

export type FilePreviewVariant = 'card' | 'list' | 'minimal';

export interface FilePreviewProps {
  /** URL của file hoặc File object (để tạo object URL) */
  src?: string | File;
  
  /** Tên file hiển thị */
  name: string;
  
  /** Kích thước file (bytes) */
  size?: number;
  
  /** Loại file (MIME type hoặc extension) để hiển thị icon phù hợp */
  type?: string;
  
  /** Trạng thái đang tải */
  loading?: boolean;
  
  /** Trạng thái lỗi (vd: upload fail) */
  error?: boolean;
  
  /** Callback khi click nút xóa */
  onRemove?: () => void;
  
  /** Callback khi click nút download */
  onDownload?: () => void;
  
  /** Callback khi click vào vùng preview (vd: xem ảnh full) */
  onClick?: () => void;
  
  /** Kiểu hiển thị (Mặc định: 'list') */
  variant?: FilePreviewVariant;
  
  className?: string;
  sx?: SerializedStyles;
  testId?: string;
}