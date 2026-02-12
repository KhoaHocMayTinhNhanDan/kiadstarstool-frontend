// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Pagination/Pagination.types.ts
import type { SerializedStyles } from '@emotion/react';

export interface PaginationProps {
  /** Trang hiện tại (bắt đầu từ 1) */
  currentPage: number;
  
  /** Tổng số trang */
  totalPages: number;
  
  /** Callback khi thay đổi trang */
  onPageChange: (page: number) => void;
  
  /** Số lượng trang liền kề hiển thị bên cạnh trang hiện tại (Mặc định: 1) */
  siblingCount?: number;
  
  /** Vô hiệu hóa toàn bộ pagination */
  disabled?: boolean;
  
  /** Class name tùy chỉnh */
  className?: string;
  
  /** Emotion styles tùy chỉnh */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
}