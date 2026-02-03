// src/04-frameworks-and-drivers/ui/web/components/01-molecules/IconButtonBadge/IconButtonBadge.playground.tsx
/** @jsxImportSource @emotion/react */
import { IconButtonBadge } from './IconButtonBadge';
import { Box, Text } from '../../00-atoms';

export const IconButtonBadgePlayground = () => {
  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🎯 IconButtonBadge Demo
      </Text>
      
      <Box display="flex" flexDirection="column" gap="lg">
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Notification Badge
          </Text>
          <Box display="flex" gap="md" alignItems="center">
            <IconButtonBadge
              badge={3}
              aria-label="Notifications"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
              }
            />
            <Text size="sm">Badge: 3 notifications</Text>
          </Box>
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Shopping Cart
          </Text>
          <Box display="flex" gap="md" alignItems="center">
            <IconButtonBadge
              badge={12}
              badgePosition="top-left"
              badgeBgColor="#10b981"
              aria-label="Shopping cart"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              }
            />
            <Text size="sm">Badge: 12 items in cart</Text>
          </Box>
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Different States
          </Text>
          <Box display="flex" gap="md" alignItems="center" flexWrap="wrap">
            <IconButtonBadge badge={0} aria-label="No notifications" icon="📧" />
            <IconButtonBadge badge={1} aria-label="One message" icon="💬" />
            <IconButtonBadge badge={99} aria-label="Many notifications" icon="🔔" />
            <IconButtonBadge badge={150} maxCount={99} aria-label="Overflow" icon="⚠️" />
            <IconButtonBadge badge="!" badgeSize="xs" aria-label="Alert" icon="🚨" />
          </Box>
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Custom Positions & Colors
          </Text>
          <Box display="flex" gap="md" alignItems="center" flexWrap="wrap">
            <IconButtonBadge
              badge={5}
              badgePosition="bottom-right"
              badgeBgColor="#3b82f6"
              aria-label="Messages"
              icon="💬"
            />
            <IconButtonBadge
              badge="New"
              badgePosition="top-left"
              badgeBgColor="#10b981"
              badgeColor="#fff"
              aria-label="New items"
              icon="🆕"
            />
            <IconButtonBadge
              badge={2}
              badgePosition="bottom-left"
              badgeBgColor="#8b5cf6"
              badgeSize="md"
              aria-label="Updates"
              icon="🔄"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};