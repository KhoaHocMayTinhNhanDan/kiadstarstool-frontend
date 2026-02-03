/** @jsxImportSource @emotion/react */
import { AppHeader } from './AppHeader.organism';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button'; // Giả định có component Button

const Logo = () => (
  <Box display="flex" alignItems="center" gap="sm">
    <Icon size="lg" color="PRIMARY">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </Icon>
    <Text weight="bold" size="lg">KiadStars</Text>
  </Box>
);

export const AppHeaderPlayground = () => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', isActive: true },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'reports', label: 'Reports', href: '/reports' },
  ];

  const userProfile = {
    name: 'Alice',
    email: 'alice@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
  };

  const userMenuItems = [
    { id: 'profile', label: 'My Profile', href: '/profile' },
    { id: 'settings', label: 'Settings', href: '/settings' },
    { id: 'divider', isDivider: true },
    { id: 'logout', label: 'Logout', onClick: () => alert('Logging out...') },
  ];

  return (
    <Box p="lg" display="flex" flexDirection="column" gap="xl" bg="BACKGROUND_SUBTLE">
      <Text as="h1" variant="heading-2xl" weight="bold">
        AppHeader Playground
      </Text>

      {/* Section 1: Header đầy đủ */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" sx={{ mb: 'md' }}>
          1. Full-featured Header
        </Text>
        <AppHeader
          logo={<Logo />}
          navItems={navItems}
          userProfile={userProfile}
          userMenuItems={userMenuItems}
          actions={
            <>
              <Button variant="ghost" size="sm">Notifications</Button>
              <Button variant="solid" size="sm">Create New</Button>
            </>
          }
        />
      </Box>

      {/* Section 2: Header tối giản */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" sx={{ mb: 'md' }}>
          2. Minimal Header (Logged out)
        </Text>
        <AppHeader
          logo={<Logo />}
          actions={
            <>
              <Button variant="outline" size="sm">Log In</Button>
              <Button variant="solid" size="sm">Sign Up</Button>
            </>
          }
        />
      </Box>

      {/* Section 3: Header chỉ có logo và user */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" sx={{ mb: 'md' }}>
          3. Simple Header (Logged in)
        </Text>
        <AppHeader
          logo={<Logo />}
          userProfile={userProfile}
          userMenuItems={userMenuItems}
        />
      </Box>
    </Box>
  );
};