// src/04-frameworks-and-drivers/ui/web/pages/layouts/MainLayout.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, Text, Icon } from '../../00-design-system/00-atoms';
import { AppHeader } from '../../00-design-system/02-organisms/navigation/AppHeader/AppHeader.organism';
import { AppSidebar } from '../../00-design-system/02-organisms/navigation/AppSidebar';
import { useAuth } from '../../app/hooks/user/useAuth';
import { useI18n } from '@/shared/i18n/useI18n';
import { LanguageSelector } from '../../00-design-system/01-molecules/LanguageSelector/LanguageSelector.molecule';
import { useResponsive } from '../../utils/responsive';
import { useToast } from '../../app/hooks/user/useToast';
import { COLORS, SPACING, SHADOWS, Z_INDEX } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { LayoutDashboard, Users, Settings, LogOut, Menu, BookOpen, GraduationCap, Building } from 'lucide-react';
import { Breadcrumbs } from '../../00-design-system/02-organisms/navigation/Breadcrumbs/index';

/**
 * MainLayout (Page Layer)
 * Layout chính cho phần Dashboard (sau khi đăng nhập).
 * Bao gồm: Sidebar, Header, và Content Area.
 */
export const MainLayout = () => {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const { toast } = useToast();
  const location = useLocation();
  const { isMobile } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);
  const hasShownWelcomeToast = useRef(false);
  
  const SIDEBAR_WIDTH = 260;
  const SIDEBAR_COLLAPSED_WIDTH = 72;
  const HEADER_HEIGHT = 64;

  // Tự động đóng sidebar khi chuyển sang chế độ mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Kiểm tra nếu user chưa có displayName (Profile trống) thì nhắc nhở
  useEffect(() => {
    if (user && !user.displayName && !hasShownWelcomeToast.current) {
      toast.warning('Chào mừng bạn mới! Vui lòng cập nhật hồ sơ để có trải nghiệm tốt nhất.', 'Cập nhật hồ sơ');
      hasShownWelcomeToast.current = true;
    }
  }, [user, toast]);

  // Navigation items (Sử dụng useMemo để tối ưu hiệu năng)
  const navItems = useMemo(() => [
    { id: 'dashboard', label: t('sidebar.dashboard'), href: '/dashboard', icon: <Icon size="sm"><LayoutDashboard /></Icon> },
    { id: 'branches', label: t('sidebar.branches'), href: '/branches', icon: <Icon size="sm"><Building /></Icon> },
    { id: 'classes', label: t('sidebar.classes'), href: '/classes', icon: <Icon size="sm"><BookOpen /></Icon> },
    { id: 'students', label: 'Học viên', href: '/students', icon: <Icon size="sm"><GraduationCap /></Icon> }, // TODO: Add translation key
    { id: 'users', label: t('sidebar.users'), href: '/users', icon: <Icon size="sm"><Users /></Icon>},
    { id: 'settings', label: t('sidebar.settings'), href: '/settings', icon: <Icon size="sm"><Settings /></Icon>},
  ], [t]);

  return (
    <Box css={css`
      display: flex;
      height: 100vh;
      background-color: ${COLORS.BACKGROUND_NEUTRAL || '#f7fafc'};
      overflow: hidden; // Ngăn scroll body
    `}>
      {/* OVERLAY cho Mobile: Bấm ra ngoài để đóng menu */}
      {isMobile && isSidebarOpen && (
        <Box
          onClick={() => setSidebarOpen(false)}
          css={css`
            position: fixed; inset: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: ${Z_INDEX.modal - 1}; // Thấp hơn Sidebar nhưng cao hơn Content
          `}
        />
      )}

      {/* 1. SIDEBAR AREA (Placeholder cho AppSidebar) */}
      <Box
        as="aside"
        css={css`
          width: ${isSidebarOpen ? `${SIDEBAR_WIDTH}px` : (isMobile ? '0px' : `${SIDEBAR_COLLAPSED_WIDTH}px`)};
          transition: width 0.3s ease;
          overflow: hidden;
          flex-shrink: 0;
          ${isMobile ? `
            position: fixed;
            top: 0; left: 0; bottom: 0;
            z-index: ${Z_INDEX.modal};
            box-shadow: ${isSidebarOpen ? SHADOWS.xl : 'none'};
          ` : ''}
        `}
      >
        <AppSidebar
          logo={<Text variant="heading-md" weight="bold" color="PRIMARY">KiadStars</Text>}
          items={navItems.map(item => ({
            ...item,
            isActive: location.pathname.startsWith(item.href),
            onClick: () => isMobile && setSidebarOpen(false)
          }))}
          collapsed={!isMobile && !isSidebarOpen}
          onCollapseChange={(collapsed) => setSidebarOpen(!collapsed)}
        />
      </Box>

      {/* 2. MAIN CONTENT AREA */}
      <Box css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0; // Fix flex child overflow issue
      `}>
        {/* 2.1 HEADER */}
        <Box css={css`
          height: ${HEADER_HEIGHT}px;
          background-color: ${COLORS.BACKGROUND_PAPER};
          border-bottom: 1px solid ${COLORS.NEUTRAL_BORDER};
          display: flex;
          align-items: center;
          padding: 0 ${SPACING.lg};
        `}>
           {/* Toggle Sidebar Button */}
           <Box mr="md" css={css`cursor: pointer; color: ${COLORS.SECONDARY};`} onClick={() => setSidebarOpen(!isSidebarOpen)}>
             <Icon><Menu /></Icon>
           </Box>
           
           {/* AppHeader Component tái sử dụng */}
           <Box flex="1">
             <AppHeader 
               actions={
                 <LanguageSelector />
               }
               userProfile={{
                 name: user?.displayName || 'User',
                 role: user?.role || 'Member',
                 avatarUrl: 'https://i.pravatar.cc/150?u=' + (user?.id || 'default'),
               }}
               userMenuItems={[
                 { id: 'logout', label: 'Logout', icon: <Icon size="sm"><LogOut /></Icon>, danger: true, onClick: logout }
               ]}
             />
           </Box>
        </Box>

        {/* 2.2 PAGE CONTENT (Scrollable) */}
        <Box css={css`
          flex: 1;
          overflow-y: auto;
          padding: ${SPACING.lg};
        `}>
          {/* Breadcrumbs Navigation */}
          <Breadcrumbs />
          
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
