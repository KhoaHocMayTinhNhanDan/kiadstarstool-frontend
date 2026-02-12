// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppSidebar/AppSidebar.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  /** Badge hiển thị số lượng hoặc trạng thái (vd: "New", "5") */
  badge?: string | number;
  onClick?: () => void;
  /** Test ID */
  'data-testid'?: string;
}

export interface SidebarGroup {
  id: string;
  label?: string;
  items: SidebarItem[];
}

export interface AppSidebarProps {
  /** Logo hoặc Brand element ở đầu sidebar */
  logo?: ReactNode;
  
  /** Danh sách items hoặc groups */
  items: (SidebarItem | SidebarGroup)[];
  
  /** Trạng thái thu gọn (Controlled) */
  collapsed?: boolean;
  
  /** Callback khi toggle thu gọn */
  onCollapseChange?: (collapsed: boolean) => void;
  
  /** Nội dung footer (vd: User Profile, Logout) */
  footer?: ReactNode;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
}