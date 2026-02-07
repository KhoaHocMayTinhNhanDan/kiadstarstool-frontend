// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppSidebar/AppSidebar.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AppSidebar } from './AppSidebar.organism';
import { Box, Text, Avatar } from '../../../00-atoms';
import { IconButton } from '../../../00-atoms/IconButton';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  HelpCircle,
  LogOut
} from 'lucide-react';

export const AppSidebarPlayground = () => {
  const [activeId, setActiveId] = useState('dashboard');

  const items = [
    {
      id: 'main',
      label: 'Main Menu',
      items: [
        { 
          id: 'dashboard', 
          label: 'Dashboard', 
          icon: <LayoutDashboard size={20} />, 
          isActive: activeId === 'dashboard',
          onClick: () => setActiveId('dashboard')
        },
        { 
          id: 'users', 
          label: 'Users', 
          icon: <Users size={20} />, 
          isActive: activeId === 'users',
          onClick: () => setActiveId('users'),
          badge: 5
        },
        { 
          id: 'reports', 
          label: 'Reports', 
          icon: <FileText size={20} />, 
          isActive: activeId === 'reports',
          onClick: () => setActiveId('reports')
        },
      ]
    },
    {
      id: 'settings',
      label: 'Configuration',
      items: [
        { 
          id: 'settings-general', 
          label: 'Settings', 
          icon: <Settings size={20} />, 
          isActive: activeId === 'settings-general',
          onClick: () => setActiveId('settings-general')
        },
        { 
          id: 'help', 
          label: 'Help & Support', 
          icon: <HelpCircle size={20} />, 
          isActive: activeId === 'help',
          onClick: () => setActiveId('help')
        },
      ]
    }
  ];

  const UserFooter = (
    <Box display="flex" alignItems="center" gap="sm" overflow="hidden" width="100%">
      <Avatar name="Admin User" size="sm" />
      <Box flex={1} overflow="hidden">
        <Text size="sm" weight="bold" truncate>Admin User</Text>
        <Text size="xs" color="SECONDARY" truncate>admin@example.com</Text>
      </Box>
      <IconButton variant="ghost" size="sm" icon={<LogOut size={16} />} aria-label="Logout" />
    </Box>
  );

  return (
    <Box p="xl" display="flex" gap="xl" height="600px" bg="NEUTRAL_LIGHT">
      <AppSidebar 
        logo={
          <Box display="flex" alignItems="center" gap="sm" height="100%">
            <Box 
              width="32px" 
              height="32px" 
              bg="PRIMARY" 
              radius="md" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              color="WHITE"
            >
              K
            </Box>
            <Text variant="heading-md" weight="bold">KiadStars</Text>
          </Box>
        }
        items={items}
        footer={UserFooter}
      />
      
      <Box flex={1} p="xl" bg="WHITE" radius="md" border="1px solid #e2e8f0">
        <Text variant="heading-lg">Main Content Area</Text>
        <Text color="SECONDARY" size="md">
          The sidebar is collapsible and responsive. Try clicking the toggle button on the sidebar edge.
        </Text>
        <Text size="lg">Active Item: <strong>{activeId}</strong></Text>
      </Box>
    </Box>
  );
};