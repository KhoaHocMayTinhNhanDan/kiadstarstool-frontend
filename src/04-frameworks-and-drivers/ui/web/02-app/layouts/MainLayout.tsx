/** @jsxImportSource @emotion/react */
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../01-ui-core/hooks/useTheme';
import { useMode } from '../../01-ui-core/hooks/useMode';
import { AppHeader } from '../../00-design-system/02-organisms/navigation/AppHeader/AppHeader.organism';
import { AppSidebar } from '../../00-design-system/02-organisms/navigation/AppSidebar/AppSidebar.organism';
import { Box } from '../../00-design-system/00-atoms/Box';
import { Icon } from '../../00-design-system/00-atoms/Icon';
import { IconButton } from '../../00-design-system/00-atoms/IconButton';
import { Breadcrumb } from '../../00-design-system/02-organisms/navigation/Breadcrumbs/Breadcrumbs.organism';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  ClipboardCheck, Building, Settings, User, LogOut,
  Menu, X, ChevronLeft, ChevronRight, Bell, HelpCircle
} from 'lucide-react';
import { useAuth } from '../hooks/user/useAuth';
import { useToast } from '../../01-ui-core/hooks/useToast';
import { useState, useEffect } from 'react';

// Định nghĩa page titles cho từng route
const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/branches': 'Quản lý Chi nhánh',
  '/classes': 'Quản lý Lớp học',
  '/students': 'Quản lý Học viên',
  '/attendance': 'Điểm danh',
  '/users': 'Quản lý Người dùng',
  '/settings/theme': 'Cài đặt Giao diện',
  '/profile': 'Hồ sơ cá nhân',
};

export const MainLayout = () => {
  const { theme } = useTheme();
  const { mode, toggleMode } = useMode();
  const { user, logout } = useAuth();
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

  // Generate breadcrumbs from path
  const breadcrumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = '/' + array.slice(0, index + 1).join('/');
      return {
        label: pageTitles[path] || segment,
        href: path,
      };
    });

  // Navigation items - CHỈ ĐỂ TRONG SIDEBAR
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <Icon size="sm"><LayoutDashboard /></Icon> },
    { id: 'branches', label: 'Chi nhánh', href: '/branches', icon: <Icon size="sm"><Building /></Icon> },
    { id: 'classes', label: 'Lớp học', href: '/classes', icon: <Icon size="sm"><BookOpen /></Icon> },
    { id: 'students', label: 'Học viên', href: '/students', icon: <Icon size="sm"><GraduationCap /></Icon> },
    { id: 'attendance', label: 'Điểm danh', href: '/attendance', icon: <Icon size="sm"><ClipboardCheck /></Icon>, badge: '12' },
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

  // Theme colors
  const themeColors = {
    primary: theme.colors?.primary || mode.colors.text.primary,
    surface: mode.colors.surface.primary,
    background: mode.colors.background.tertiary,
    text: {
      primary: mode.colors.text.primary,
      secondary: mode.colors.text.secondary,
      tertiary: mode.colors.text.tertiary,
      inverse: mode.colors.text.inverse,
    },
    border: {
      default: mode.colors.border.default,
      light: mode.colors.border.light,
    },
  };

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

  return (
    <Box
      css={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: mode.colors.background.primary,
        color: mode.colors.text.primary,
      }}
    >
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <Box
          css={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: sidebarWidth,
            zIndex: 1000,
            transition: 'width 0.3s ease',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          }}
        >
          <AppSidebar
            // Logo chỉ ở sidebar
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
            mode={mode.id}
            themeColors={themeColors}
            borderRadius={theme.layout.cards.borderRadius}
            width={theme.layout.sidebar.width}
            collapsedWidth={theme.layout.sidebar.collapsedWidth}
            collapsed={sidebarCollapsed}
            onCollapseChange={setSidebarCollapsed}
            footer={
              <div style={{
                padding: '16px',
                color: mode.colors.text.secondary,
                fontSize: '12px',
                textAlign: 'center',
                opacity: sidebarCollapsed ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }}>
                v1.0.0
              </div>
            }
          />
        </Box>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          {mobileOpen && (
            <Box
              css={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                onClick: () => setMobileOpen(false),
              }}
            />
          )}

          {/* Sidebar */}
          <Box
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              width: '280px',
              zIndex: 1000,
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-280px)',
              transition: 'transform 0.3s ease',
              boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            }}
          >
            <AppSidebar
              logo={<div style={{ fontSize: '20px', fontWeight: 700 }}>KiadStars</div>}
              items={navItems}
              mode={mode.id}
              themeColors={themeColors}
              borderRadius={theme.layout.cards.borderRadius}
              footer={
                <div style={{
                  padding: '16px',
                  color: mode.colors.text.secondary,
                  fontSize: '12px',
                  textAlign: 'center',
                }}>
                  v1.0.0
                </div>
              }
            />
          </Box>
        </>
      )}

      {/* Main Content */}
      <Box
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isMobile ? 0 : sidebarWidth,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth})`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Header - CHỈ LÀM NHIỆM VỤ HEADER */}
        <AppHeader
          // Left section: menu button + collapse button + page title
          leftContent={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {menuButton}
              {collapseButton}
              <div>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: 600,
                  margin: 0,
                  color: mode.colors.text.primary,
                }}>
                  {currentPageTitle}
                </h1>
                {breadcrumbs.length > 0 && (
                  <Breadcrumb
                    items={breadcrumbs}
                    separator="/"
                    size="sm"
                    css={{ marginTop: '2px' }}
                  />
                )}
              </div>
            </div>
          }
          
          // Right section: search + actions + user
          rightContent={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Search */}
              <Box
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: mode.colors.background.tertiary,
                  borderRadius: '8px',
                  padding: '0 12px',
                  height: '36px',
                  width: '240px',
                  '@media (max-width: 768px)': {
                    display: 'none',
                  },
                }}
              >
                <Icon size="sm" color={mode.colors.text.tertiary}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </Icon>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  css={{
                    border: 'none',
                    background: 'transparent',
                    padding: '8px 12px',
                    fontSize: '14px',
                    width: '100%',
                    color: mode.colors.text.primary,
                    '&::placeholder': {
                      color: mode.colors.text.tertiary,
                    },
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>

              {/* Theme Toggle */}
              <IconButton
                size="sm"
                variant="ghost"
                onClick={toggleMode}
                aria-label="Toggle theme"
                icon={
                  mode.id === 'dark' 
                    ? <Sun size={18} /> 
                    : <Moon size={18} />
                }
                css={{
                  border: `1px solid ${mode.colors.border.light}`,
                }}
              />

              {/* Custom Actions */}
              {headerActions}

              {/* User Menu */}
              {user && (
                <div css={{ position: 'relative', marginLeft: '4px' }}>
                  <button
                    onClick={() => {}} // Mở menu
                    css={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 8px 4px 4px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: `1px solid ${mode.colors.border.light}`,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: mode.colors.background.tertiary,
                      },
                    }}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        css={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div css={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: themeColors.primary,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}>
                        {(user.displayName || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span css={{
                      fontSize: '14px',
                      fontWeight: 500,
                      '@media (max-width: 1024px)': {
                        display: 'none',
                      },
                    }}>
                      {user.displayName || 'User'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          }
          
          mode={mode.id}
          themeColors={themeColors}
          sx={{
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