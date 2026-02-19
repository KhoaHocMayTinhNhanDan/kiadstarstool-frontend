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

// Theme colors interface
export interface ThemeColors {
  primary: string;
  surface: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    default: string;
    light: string;
  };
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
  
  /** Current mode */
  mode?: 'light' | 'dark';
  
  /** Theme colors */
  themeColors?: ThemeColors;
  
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
}