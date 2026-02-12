// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  'data-testid'?: string;
}

export interface UserMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isDivider?: boolean;
  danger?: boolean;
}

export interface UserProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface AppHeaderProps {
  /** Logo component hoặc ReactNode */
  logo?: ReactNode;
  
  /** Navigation items */
  navItems?: NavItem[];
  
  /** User profile - null nếu chưa đăng nhập */
  userProfile?: UserProfile | null;
  
  /** User menu items */
  userMenuItems?: UserMenuItem[];
  
  /** Custom actions (thay thế default actions) */
  actions?: ReactNode;
  
  /** Show search input */
  showSearch?: boolean;
  
  /** Search placeholder */
  searchPlaceholder?: string;
  
  /** Callback khi search */
  onSearch?: (query: string) => void;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
  
  /** On logo click */
  onLogoClick?: () => void;
}