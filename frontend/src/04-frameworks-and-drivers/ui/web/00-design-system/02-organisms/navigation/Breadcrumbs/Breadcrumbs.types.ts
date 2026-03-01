// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Breadcrumbs/Breadcrumbs.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface BreadcrumbItem {
  /** Unique ID cho item */
  id: string;
  /** Label hiển thị */
  label: string;
  /** Link đích (nếu không có sẽ render text thường) */
  href?: string;
  /** Icon hiển thị trước label */
  icon?: ReactNode;
  /** Hành động click custom (nếu không dùng href) */
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /** Danh sách các items */
  items: BreadcrumbItem[];
  
  /** Số lượng items tối đa trước khi thu gọn (Mặc định: 4) */
  maxItems?: number;
  
  /** Số lượng items hiển thị ở cuối khi thu gọn (Mặc định: 1) */
  itemsAfterCollapse?: number;
  
  /** Số lượng items hiển thị ở đầu khi thu gọn (Mặc định: 1) */
  itemsBeforeCollapse?: number;
  
  /** Custom separator (Mặc định: ChevronRight) */
  separator?: ReactNode;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Class name */
  className?: string;
}