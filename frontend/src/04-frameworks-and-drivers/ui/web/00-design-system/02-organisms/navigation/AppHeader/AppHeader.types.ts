import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { LanguageOption } from '../../../01-molecules/LanguageSelector';

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

export interface AppHeaderProps {
  /** Logo component */
  logo?: ReactNode;
  
  /** Navigation items */
  navItems?: NavItem[];
  
  /** User profile */
  userProfile?: UserProfile | null;
  
  /** User menu items */
  userMenuItems?: UserMenuItem[];
  
  /** Custom actions */
  actions?: ReactNode;
  
  /** Show search input */
  showSearch?: boolean;
  
  /** Search placeholder */
  searchPlaceholder?: string;
  
  /** Search callback */
  onSearch?: (query: string) => void;
  
  /** Theme toggle callback */
  onThemeToggle?: () => void;

  /** Mã ngôn ngữ hiện tại (ví dụ: 'vi', 'en') */
  currentLanguage?: string;

  /** Callback khi đổi ngôn ngữ */
  onLanguageChange?: (code: string) => void;

  /** Danh sách ngôn ngữ tùy chọn */
  languageOptions?: LanguageOption[];
  
  /** Current theme mode */
  mode?: 'light' | 'dark';
  
  /** Theme colors */
  themeColors?: ThemeColors;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
  
  /** Logo click handler */
  onLogoClick?: () => void;

  /** Left section content (for menu button, collapse button) */
  leftSectionContent?: ReactNode;

  /** Custom styles */
  style?: React.CSSProperties;
}