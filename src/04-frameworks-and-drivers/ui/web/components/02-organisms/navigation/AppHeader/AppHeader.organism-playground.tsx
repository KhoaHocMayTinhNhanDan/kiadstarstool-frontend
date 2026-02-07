// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AppHeader } from './AppHeader.organism';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { IconButtonBadge } from '../../../00-atoms/IconButtonBadge/IconButtonBadge';
import { 
  LayoutDashboard, 
  GraduationCap, 
  School, 
  User, 
  Settings, 
  LogOut, 
  AlertCircle, 
  BarChart2,
  Layers,
  Bell,
  HelpCircle,
  CreditCard,
  Users
} from 'lucide-react';

export const AppHeaderPlayground = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastAction, setLastAction] = useState('');

  const handleAction = (action: string) => {
    setLastAction(action);
    setTimeout(() => setLastAction(''), 3000);
  };

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🎯 AppHeader Demo
      </Text>
      
      {/* Demo 1: Với user đã login */}
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Admin Dashboard (Interactive)
          </Text>
          {lastAction && <Text size="sm" color="PRIMARY" weight="bold">Action: {lastAction}</Text>}
        </Box>
        
        <Text as="h3" variant="heading-md" weight="semibold">
          1. Admin Dashboard (có search)
        </Text>
        <Box border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-lg">KiadStars Admin</Text>}
            navItems={[
              { 
                id: 'dashboard', 
                label: 'Dashboard', 
                href: '/', 
                isActive: true,
                icon: <Icon size="sm"><LayoutDashboard /></Icon>
              },
              { 
                id: 'students', 
                label: 'Students', 
                href: '/students',
                icon: <Icon size="sm"><GraduationCap /></Icon>
              },
              { 
                id: 'classes', 
                label: 'Classes', 
                href: '/classes',
                icon: <Icon size="sm"><School /></Icon>
              },
            ]}
            userProfile={{
              name: 'John Doe',
              email: 'john@kiadstars.com',
              role: 'Administrator',
              avatarUrl: 'https://i.pravatar.cc/40',
            }}
            userMenuItems={[
              { 
                id: 'profile', 
                label: 'Profile', 
                icon: <Icon size="sm"><User /></Icon>,
                onClick: () => handleAction('Clicked Profile')
              },
              { 
                id: 'settings', 
                label: 'Settings', 
                icon: <Icon size="sm"><Settings /></Icon>,
                onClick: () => handleAction('Clicked Settings')
              },
              { id: 'divider-1', label: '', isDivider: true },
              { 
                id: 'logout', 
                label: 'Logout', 
                icon: <Icon size="sm"><LogOut /></Icon>,
                danger: true,
                onClick: () => handleAction('Clicked Logout')
              },
            ]}
            showSearch
            searchPlaceholder="Search students, classes..."
            onSearch={(query) => {
              setSearchQuery(query);
              handleAction(`Search: ${query}`);
            }}
            onLogoClick={() => handleAction('Clicked Logo')}
          />
          {searchQuery && <Box p="sm" bg="NEUTRAL_LIGHT"><Text size="sm">Current Search: <strong>{searchQuery}</strong></Text></Box>}
        </Box>
      </Box>
      
      {/* Demo 2: Với custom actions */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          2. Custom Actions
        </Text>
        <Box border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-lg">Analytics Platform</Text>}
            actions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  intent="warning"
                  leftIcon={<Icon size="sm"><AlertCircle /></Icon>}
                >
                  Alerts (5)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  intent="success"
                  leftIcon={<Icon size="sm"><BarChart2 /></Icon>}
                >
                  New Report
                </Button>
              </>
            }
            userProfile={{
              name: 'Analytics User',
              avatarUrl: 'https://i.pravatar.cc/40?img=2',
            }}
          />
        </Box>
      </Box>
      
      {/* Demo 3: Chưa login */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          3. Public Site (chưa login)
        </Text>
        <Box border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-lg">KiadStars Academy</Text>}
            navItems={[
              { id: 'home', label: 'Home', href: '/', isActive: true },
              { id: 'courses', label: 'Courses', href: '/courses' },
              { id: 'pricing', label: 'Pricing', href: '/pricing' },
              { id: 'about', label: 'About', href: '/about' },
            ]}
            showSearch
            searchPlaceholder="Search courses..."
            // Không có userProfile = hiển thị login/signup buttons
          />
        </Box>
      </Box>
      
      {/* Demo 4: Minimal */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          4. Minimal Header
        </Text>
        <Box border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-md">Minimal App</Text>}
            userProfile={{
              name: 'User',
              avatarUrl: 'https://i.pravatar.cc/40?img=3',
            }}
            // Không có navItems, không có search, default actions
          />
        </Box>
      </Box>

      {/* Demo 5: Real-world SaaS Platform */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          5. Real-world SaaS Platform (DevStack)
        </Text>
        <Box border="1px solid #e2e8f0" borderRadius="8px" overflow="hidden">
          <AppHeader
            logo={
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="md" sx={{ color: '#6366f1' }}><Layers /></Icon>
                <Text variant="heading-lg" weight="bold" sx={{ letterSpacing: '-0.5px' }}>DevStack</Text>
              </Box>
            }
            navItems={[
              { id: 'projects', label: 'Projects', href: '/projects', isActive: true },
              { id: 'deployments', label: 'Deployments', href: '/deployments' },
              { id: 'analytics', label: 'Analytics', href: '/analytics' },
              { id: 'docs', label: 'Docs', href: '/docs' },
            ]}
            actions={
              <>
                <Button variant="ghost" size="sm" leftIcon={<Icon size="sm"><HelpCircle /></Icon>}>
                  Help
                </Button>
                <IconButtonBadge 
                  badge={2} 
                  variant="ghost" 
                  size="sm" 
                  aria-label="Notifications" 
                  icon={<Icon size="sm"><Bell /></Icon>} 
                />
              </>
            }
            userProfile={{
              name: 'Sarah Wilson',
              email: 'sarah@devstack.io',
              role: 'Team Lead',
              avatarUrl: 'https://i.pravatar.cc/40?img=5',
            }}
            userMenuItems={[
              { id: 'profile', label: 'My Profile', icon: <Icon size="sm"><User /></Icon> },
              { id: 'billing', label: 'Billing & Plans', icon: <Icon size="sm"><CreditCard /></Icon> },
              { id: 'team', label: 'Team Settings', icon: <Icon size="sm"><Users /></Icon> },
              { id: 'divider-1', label: '', isDivider: true },
              { 
                id: 'logout', 
                label: 'Sign out', 
                icon: <Icon size="sm"><LogOut /></Icon>,
                danger: true 
              },
            ]}
            showSearch
            searchPlaceholder="Search projects..."
            onSearch={(q) => handleAction(`SaaS Search: ${q}`)}
          />
        </Box>
      </Box>
    </Box>
  );
};