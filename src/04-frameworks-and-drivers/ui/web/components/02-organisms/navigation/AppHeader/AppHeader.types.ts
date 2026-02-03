// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.types.ts
import type { ReactNode, MouseEvent } from 'react';
import type { SerializedStyles } from '@emotion/react';

// Base interface cho tất cả các item
export interface BaseMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  'data-testid'?: string;
}

// Navigation item linh hoạt
export interface NavItem extends BaseMenuItem {
  href?: string;                    // Optional - có thể là onClick only
  to?: string;                      // React Router to prop
  target?: '_blank' | '_self' | '_parent' | '_top';
  isActive?: boolean;
  onClick?: (e: MouseEvent) => void;
  children?: NavItem[];             // Submenu support
}

// User menu item linh hoạt
export interface UserMenuItem extends BaseMenuItem {
  href?: string;                    // External link
  to?: string;                      // Internal route
  onClick?: (e: MouseEvent) => void;
  isDivider?: boolean;
  danger?: boolean;                 // Ví dụ: "Delete account" item đỏ
}

export interface UserProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;                    // Thêm role cho enterprise apps
}

// Props cho mobile menu (hamburger)
export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  userProfile?: UserProfile | null;
  userMenuItems?: UserMenuItem[];
}

export interface AppHeaderProps {
  /** Logo - có thể là text, image, hoặc component */
  logo?: ReactNode;
  
  /** Navigation items - linh hoạt cho mọi use case */
  navItems?: NavItem[];
  
  /** Thông tin user - null nếu chưa đăng nhập */
  userProfile?: UserProfile | null;
  
  /** User menu items */
  userMenuItems?: UserMenuItem[];
  
  /** Các action buttons (notification, search, etc.) */
  actions?: ReactNode;
  
  /** Custom render cho user menu button (nếu muốn override) */
  renderUserMenuButton?: (props: {
    userProfile: UserProfile;
    isMenuOpen: boolean;
    onClick: () => void;
  }) => ReactNode;
  
  /** Custom render cho mobile menu */
  renderMobileMenu?: (props: MobileMenuProps) => ReactNode;
  
  /** Hiển thị/hide search bar */
  showSearch?: boolean;
  
  /** Custom search component */
  searchComponent?: ReactNode;
  
  /** Callback khi search */
  onSearch?: (query: string) => void;
  
  /** Hiển thị breadcrumbs? */
  showBreadcrumbs?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** Emotion styles */
  sx?: SerializedStyles;
  
  /** Test ID */
  testId?: string;
  
  /** Event handlers */
  onLogoClick?: () => void;
}