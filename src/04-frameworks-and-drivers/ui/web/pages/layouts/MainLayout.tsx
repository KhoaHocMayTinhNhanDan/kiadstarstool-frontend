// src/04-frameworks-and-drivers/ui/web/pages/layouts/MainLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { LayoutDashboard, Users, Settings } from 'lucide-react';
import { AppHeader } from '../../components/02-organisms/navigation/AppHeader';
import { AppSidebar } from '../../components/02-organisms/navigation/AppSidebar';
import { Box, Text, Icon } from '../../components/00-atoms';
import { COLORS } from '../../components/00-atoms/00-core/tokens-constants';

const SIDEBAR_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Icon size="sm"><LayoutDashboard /></Icon>,
    isActive: true,
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: <Icon size="sm"><Users /></Icon>,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Icon size="sm"><Settings /></Icon>,
  },
];

export const MainLayout = () => {
  return (
    <Box css={css`
      display: flex;
      height: 100vh;
      background-color: ${COLORS.BACKGROUND_NEUTRAL || '#f7fafc'};
    `}>
      <AppSidebar 
        logo={
          <Box display="flex" alignItems="center" gap="sm" px="md">
            <Text variant="heading-md" weight="bold">KiadStars</Text>
          </Box>
        }
        items={SIDEBAR_ITEMS}
      />
      <Box css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `}>
        <AppHeader showSearch />
        <main css={css`
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        `}>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};
