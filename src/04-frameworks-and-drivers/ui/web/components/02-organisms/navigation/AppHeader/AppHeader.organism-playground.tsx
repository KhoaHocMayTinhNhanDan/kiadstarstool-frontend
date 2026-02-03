// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { AppHeader } from './AppHeader.organism';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';

export const AppHeaderPlayground = () => {
  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🎯 AppHeader Demo - Tái cấu trúc
      </Text>
      
      {/* Demo 1: Với user đã login */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          1. Admin Dashboard (có search)
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-lg">KiadStars Admin</Text>}
            navItems={[
              { 
                id: 'dashboard', 
                label: 'Dashboard', 
                href: '/', 
                isActive: true,
                icon: <Icon size="sm">📊</Icon>
              },
              { 
                id: 'students', 
                label: 'Students', 
                href: '/students',
                icon: <Icon size="sm">👨‍🎓</Icon>
              },
              { 
                id: 'classes', 
                label: 'Classes', 
                href: '/classes',
                icon: <Icon size="sm">🏫</Icon>
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
                icon: <Icon size="sm">👤</Icon>,
              },
              { 
                id: 'settings', 
                label: 'Settings', 
                icon: <Icon size="sm">⚙️</Icon>,
              },
              { id: 'divider-1', label: '', isDivider: true },
              { 
                id: 'logout', 
                label: 'Logout', 
                icon: <Icon size="sm">🚪</Icon>,
                danger: true,
              },
            ]}
            showSearch
            searchPlaceholder="Search students, classes..."
            onSearch={(query) => console.log('Searching:', query)}
            onLogoClick={() => console.log('Logo clicked')}
          />
        </Box>
      </Box>
      
      {/* Demo 2: Với custom actions */}
      <Box>
        <Text as="h3" variant="heading-md" weight="semibold">
          2. Custom Actions
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppHeader
            logo={<Text variant="heading-lg">Analytics Platform</Text>}
            actions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  intent="warning"
                  leftIcon={<Icon size="sm">⚠️</Icon>}
                >
                  Alerts (5)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  intent="success"
                  leftIcon={<Icon size="sm">📈</Icon>}
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
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
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
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
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
    </Box>
  );
};