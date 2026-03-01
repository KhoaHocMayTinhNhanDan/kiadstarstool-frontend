// src/04-frameworks-and-drivers/ui/web/components/01-molecules/IconButtonBadge/IconButtonBadge.types.ts
import type { IconButtonProps } from '../IconButton/IconButton.types';

export interface IconButtonBadgeProps extends Omit<IconButtonProps, 'aria-label'> {
  /** Số hiển thị trên badge (0 sẽ ẩn badge) */
  badge?: number | string;
  /** Màu chữ badge */
  badgeColor?: string;
  /** Màu nền badge */
  badgeBgColor?: string;
  /** Kích thước badge */
  badgeSize?: 'xs' | 'sm' | 'md';
  /** Vị trí badge */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Hiển thị badge ngay cả khi badge = 0 */
  showZero?: boolean;
  /** Giới hạn số hiển thị (vd: 99+) */
  maxCount?: number;
  /** Custom aria label (tự động thêm số count) */
  'aria-label'?: string;
}