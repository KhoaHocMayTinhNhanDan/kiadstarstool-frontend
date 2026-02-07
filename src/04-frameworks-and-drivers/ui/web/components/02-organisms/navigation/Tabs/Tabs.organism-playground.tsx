// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Tabs/Tabs.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Tabs } from './Tabs.organism';
import { Box, Text } from '../../../00-atoms';
import { User, Settings, Bell, CreditCard } from 'lucide-react';

export const TabsPlayground = () => {
  const [activeTab, setActiveTab] = useState('account');

  const basicItems = [
    {
      id: 'account',
      label: 'Account',
      icon: <User size={16} />,
      content: (
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Text weight="bold">Account Settings</Text>
          <Text size="sm" color="SECONDARY">Manage your personal information.</Text>
        </Box>
      ),
    },
    {
      id: 'password',
      label: 'Password',
      content: (
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Text weight="bold">Change Password</Text>
          <Text size="sm" color="SECONDARY">Update your security credentials.</Text>
        </Box>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={16} />,
      badge: <Box bg="DANGER" color="WHITE" px="xs" radius="full" style={{ fontSize: 10 }}>3</Box>,
      content: (
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Text weight="bold">Notification Preferences</Text>
          <Text size="sm" color="SECONDARY">Choose what you want to be notified about.</Text>
        </Box>
      ),
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: <Box>Disabled Content</Box>,
    },
  ];

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        📑 Tabs Demo
      </Text>

      {/* 1. Basic Line Variant */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Line Variant (Default)
          </Text>
        </Box>
        <Tabs items={basicItems} />
      </Box>

      {/* 2. Pills Variant */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Pills Variant
          </Text>
        </Box>
        <Tabs 
          items={basicItems} 
          variant="pills" 
          defaultActiveTabId="notifications"
        />
      </Box>

      {/* 3. Enclosed Variant */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Enclosed Variant
          </Text>
        </Box>
        <Tabs 
          items={basicItems} 
          variant="enclosed" 
        />
      </Box>

      {/* 4. Vertical Orientation */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Vertical Orientation
          </Text>
        </Box>
        <Box border="1px solid #e2e8f0" p="md" radius="md">
          <Tabs 
            items={[
              { id: 'general', label: 'General', icon: <Settings size={16} />, content: <Text>General Settings Content</Text> },
              { id: 'billing', label: 'Billing', icon: <CreditCard size={16} />, content: <Text>Billing Information Content</Text> },
              { id: 'team', label: 'Team', icon: <User size={16} />, content: <Text>Team Management Content</Text> },
            ]} 
            orientation="vertical"
            variant="pills"
          />
        </Box>
      </Box>

      {/* 5. Full Width */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            5. Full Width (Controlled)
          </Text>
        </Box>
        <Tabs 
          items={basicItems.slice(0, 3)} 
          fullWidth 
          activeTabId={activeTab}
          onChange={setActiveTab}
        />
      </Box>
    </Box>
  );
};