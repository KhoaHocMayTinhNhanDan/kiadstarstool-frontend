import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  badge?: string | number;
  onClick?: () => void;
  'data-testid'?: string;
}

export interface SidebarGroup {
  id: string;
  label?: string;
  items: SidebarItem[];
}

export interface AppSidebarProps {
  /** Logo hoặc Brand element */
  logo?: ReactNode;
  
  /** Danh sách items hoặc groups */
  items: (SidebarItem | SidebarGroup)[];
  
  /** Trạng thái thu gọn */
  collapsed?: boolean;
  
  /** Callback khi toggle thu gọn */
  onCollapseChange?: (collapsed: boolean) => void;
  
  /** Nội dung footer */
  footer?: ReactNode;
  
  /** Border radius từ theme */
  borderRadius?: string;
  
  /** Sidebar width */
  width?: number | string;
  
  /** Collapsed width */
  collapsedWidth?: number | string;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;

  /** Chế độ hiển thị: 'sidebar' (cố định) hoặc 'drawer' (trượt/mobile) */
  variant?: 'sidebar' | 'drawer';

  /** Trạng thái mở (chỉ dùng cho variant='drawer') */
  isOpen?: boolean;

  /** Callback khi đóng sidebar (chỉ dùng cho variant='drawer') */
  onClose?: () => void;
}