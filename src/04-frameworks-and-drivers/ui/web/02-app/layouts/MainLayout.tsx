/** @jsxImportSource @emotion/react */
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../01-ui-core/hooks/useTheme';
import { useMode } from '../../01-ui-core/hooks/useMode';
import { AppHeader } from '../../00-design-system/02-organisms/navigation/AppHeader/AppHeader.organism';
import { AppSidebar } from '../../00-design-system/02-organisms/navigation/AppSidebar/AppSidebar.organism';
import { Box } from '../../00-design-system/00-atoms/Box';
import { Icon } from '../../00-design-system/00-atoms/Icon';
import { IconButton } from '../../00-design-system/00-atoms/IconButton';
import { Breadcrumbs } from '../../00-design-system/02-organisms/navigation/Breadcrumbs/Breadcrumbs.organism';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  ClipboardCheck, Building, Settings, User, LogOut, DollarSign,
  Menu, X, ChevronLeft, ChevronRight, Bell, HelpCircle
} from 'lucide-react';
import { useAuth } from '../hooks/user/useAuth';
import { useToast } from '../../01-ui-core/hooks/useToast';
import { useState, useEffect } from 'react';
import { IronmanLayout } from './dynamic/IronmanLayout';
import { CosmicLayout } from './dynamic/CosmicLayout';
import { useI18n } from '@/shared/i18n/useI18n';
import { type LanguageOption } from '../../00-design-system/01-molecules/LanguageSelector';

// Định nghĩa page titles cho từng route
const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/branches': 'Quản lý Chi nhánh',
  '/classes': 'Quản lý Lớp học',
  '/students': 'Quản lý Học viên',
  '/attendance': 'Điểm danh',
  '/finance': 'Quản lý Tài chính',
  '/users': 'Quản lý Người dùng',
  '/settings/theme': 'Cài đặt Giao diện',
  '/profile': 'Hồ sơ cá nhân',
};

export const MainLayout = () => {
  const { theme } = useTheme();
  const { mode, toggleMode } = useMode();
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useI18n();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check mobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current page title
  const currentPageTitle = pageTitles[location.pathname] || 'Trang chủ';

  // Navigation items - CHỈ ĐỂ TRONG SIDEBAR
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <Icon size="sm"><LayoutDashboard /></Icon> },
    { id: 'branches', label: 'Chi nhánh', href: '/branches', icon: <Icon size="sm"><Building /></Icon> },
    { id: 'classes', label: 'Lớp học', href: '/classes', icon: <Icon size="sm"><BookOpen /></Icon> },
    { id: 'students', label: 'Học viên', href: '/students', icon: <Icon size="sm"><GraduationCap /></Icon> },
    { id: 'attendance', label: 'Điểm danh', href: '/attendance', icon: <Icon size="sm"><ClipboardCheck /></Icon>, badge: '12' },
    { id: 'finance', label: 'Tài chính', href: '/finance', icon: <Icon size="sm"><DollarSign /></Icon> },
    { id: 'users', label: 'Người dùng', href: '/users', icon: <Icon size="sm"><Users /></Icon> },
    { id: 'settings', label: 'Cài đặt', href: '/settings/theme', icon: <Icon size="sm"><Settings /></Icon> },
  ];

  // User menu items
  const userMenuItems = [
    { id: 'profile', label: 'Hồ sơ', icon: <Icon size="sm"><User /></Icon>, onClick: () => navigate('/profile') },
    { id: 'settings', label: 'Cài đặt', icon: <Icon size="sm"><Settings /></Icon>, onClick: () => navigate('/settings/theme') },
    { id: 'divider', label: '', isDivider: true },
    { 
      id: 'logout', 
      label: 'Đăng xuất', 
      icon: <Icon size="sm"><LogOut /></Icon>, 
      onClick: () => {
        logout();
        toast.success('Đăng xuất thành công!');
      },
      danger: true 
    },
  ];

  // Header actions - Các nút chức năng ngữ cảnh
  const headerActions = (
    <>
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Notifications"
        icon={<Bell size={18} />}
        badge={3}
        css={{
          border: `1px solid ${mode.colors.border.light}`,
        }}
      />
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Help"
        icon={<HelpCircle size={18} />}
        css={{
          border: `1px solid ${mode.colors.border.light}`,
        }}
      />
    </>
  );

  const sidebarWidth = sidebarCollapsed 
    ? (theme.layout.sidebar.collapsedWidth || '72px')
    : (theme.layout.sidebar.width || '260px');

  // Mobile menu button
  const menuButton = isMobile ? (
    <IconButton
      size="sm"
      variant="ghost"
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      icon={mobileOpen ? <X size={18} /> : <Menu size={18} />}
      css={{
        border: `1px solid ${mode.colors.border.light}`,
        marginRight: '12px',
      }}
    />
  ) : null;

  // Desktop collapse button (đặt trong header)
  const collapseButton = !isMobile ? (
    <IconButton
      size="sm"
      variant="ghost"
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      icon={sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      css={{
        border: `1px solid ${mode.colors.border.light}`,
        marginRight: '12px',
      }}
    />
  ) : null;

  // --- DYNAMIC LAYOUT SWITCHING ---
  // Nếu theme.id là 'ironman', trả về IronmanLayout
  if (theme.id === 'ironman') {
    return <IronmanLayout />;
  }
  // Nếu theme.id là 'cosmic', trả về CosmicLayout
  if (theme.id === 'cosmic') {
    return <CosmicLayout />;
  }

  return (
    <Box
      css={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: mode.colors.background.primary,
        color: mode.colors.text.primary,
      }}
    >
      {/* Unified Sidebar for both Desktop & Mobile */}
      <AppSidebar
        logo={
          <div style={{
            fontSize: '20px',
            fontWeight: 700,
            color: theme.colors?.primary || mode.colors.text.primary,
            whiteSpace: 'nowrap',
          }}>
            {sidebarCollapsed ? 'KS' : 'KiadStars'}
          </div>
        }
        items={navItems}
        // Removed: mode, themeColors (AppSidebar now uses internal tokens)
        borderRadius={theme.layout.cards.borderRadius}
        width={theme.layout.sidebar.width}
        collapsedWidth={theme.layout.sidebar.collapsedWidth}
        collapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
        
        // Responsive Props
        variant={isMobile ? 'drawer' : 'sidebar'}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}

        footer={
          <div style={{
            padding: '16px',
            color: mode.colors.text.secondary,
            fontSize: '12px',
            textAlign: 'center',
            opacity: (!isMobile && sidebarCollapsed) ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}>
            v1.0.0
          </div>
        }
      />

      {/* Main Content */}
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // AppSidebar 'sticky' sẽ tự chiếm chỗ trên desktop, 'fixed' sẽ nổi lên trên mobile
          // Không cần tính toán marginLeft thủ công nữa
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Header - CHỈ LÀM NHIỆM VỤ HEADER */}
        <AppHeader
          // Pass content to the correct props of AppHeader
          leftSectionContent={
            <>
              {menuButton}
              {collapseButton}
            </>
          }
          logo={
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
                {currentPageTitle}
              </h1>
              <Breadcrumbs />
            </div>
          }
          showSearch={true}
          searchPlaceholder="Tìm kiếm..."
          onSearch={(query) => console.log('Search:', query)}
          actions={headerActions}
          onThemeToggle={toggleMode}
          currentLanguage={language}
          onLanguageChange={changeLanguage}
          languageOptions={[
            { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
            { code: 'en', label: 'English', flag: '🇺🇸' },
          ]}
          userProfile={user ? {
            name: user.displayName || 'User',
            email: user.email || '',
            avatarUrl: user.photoURL || undefined,
            role: user.role,
          } : null}
          userMenuItems={userMenuItems}
          css={{
            borderBottom: `1px solid ${mode.colors.border.default}`,
            backgroundColor: mode.colors.surface.primary,
          }}
        />

        {/* Page Content */}
        <Box
          css={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '16px' : '24px',
            backgroundColor: mode.colors.background.secondary,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};