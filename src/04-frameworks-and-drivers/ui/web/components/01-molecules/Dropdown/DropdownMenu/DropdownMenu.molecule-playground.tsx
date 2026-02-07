// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/DropdownMenu/DropdownMenu.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import { DropdownMenu } from './DropdownMenu.molecule';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { Avatar } from '../../../00-atoms/Avatar';
import { IconButton } from '../../../00-atoms/IconButton';
import type { DropdownMenuItem, DropdownMenuGroup } from './DropdownMenu.types';

export const DropdownMenuPlayground = () => {
  const handleItemClick = (label: string) => {
    console.log(`Clicked: ${label}`);
  };

  // 1. Dữ liệu cho Basic Menu
  const basicItems: DropdownMenuItem[] = [
    { 
      id: 'profile', 
      label: 'View Profile', 
      icon: <Icon>👤</Icon>, 
      onClick: () => handleItemClick('View Profile') 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Icon>⚙️</Icon>, 
      shortcut: '⌘S',
      onClick: () => handleItemClick('Settings')
    },
    { 
      id: 'shortcuts', 
      label: 'Keyboard Shortcuts', 
      icon: <Icon>⌨️</Icon>,
      onClick: () => handleItemClick('Keyboard Shortcuts')
    },
    { id: 'sep1', isDivider: true, label: 'separator' },
    { 
      id: 'logout', 
      label: 'Log out', 
      icon: <Icon>🚪</Icon>, 
      danger: true, 
      shortcut: '⇧⌘Q',
      onClick: () => handleItemClick('Log out')
    },
  ];

  // 2. Dữ liệu cho Grouped Menu
  const groupedItems: DropdownMenuGroup[] = [
    {
      id: 'account',
      label: 'My Account',
      items: [
        { id: 'profile', label: 'Profile', icon: <Icon>👤</Icon> },
        { id: 'billing', label: 'Billing', icon: <Icon>💳</Icon> },
        { id: 'settings', label: 'Settings', icon: <Icon>⚙️</Icon> },
      ]
    },
    {
      id: 'team',
      label: 'Team',
      items: [
        { id: 'members', label: 'Members', icon: <Icon>👥</Icon> },
        { id: 'permissions', label: 'Permissions', icon: <Icon>🔒</Icon> },
      ]
    },
    {
      id: 'actions',
      items: [
        { id: 'logout', label: 'Log out', icon: <Icon>🚪</Icon>, danger: true },
      ]
    }
  ];

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        📑 DropdownMenu (Data-Driven) Demo
      </Text>
      <Text color="SECONDARY">
        Component Menu được cấu hình thông qua props `items` (JSON), tự động xử lý Groups, Icons, Shortcuts và Styling.
        Sử dụng `DropdownBase` bên dưới để đảm bảo tính nhất quán.
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Menu
          </Text>
        </Box>
        <DropdownMenu
          trigger={<Button>Open Menu</Button>}
          items={basicItems}
        />
      </Box>

      {/* 2. Grouped Items */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Grouped Items with Labels
          </Text>
        </Box>
        <DropdownMenu
          trigger={<Button variant="outline">Grouped Menu</Button>}
          items={groupedItems}
          minWidth={240}
        />
      </Box>

      {/* 3. Custom Trigger (Avatar) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Avatar Trigger & Positioning
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between" p="md" border="1px solid #e2e8f0" radius="md" alignItems="center">
           <Text color="SECONDARY">Menu aligned to the end (right)</Text>
           <DropdownMenu
            trigger={
              <Button variant="ghost" sx={{ borderRadius: '50%', padding: 0, width: 40, height: 40 }}>
                <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              </Button>
            }
            items={basicItems}
            align="end"
          />
        </Box>
      </Box>

      {/* 4. Icon Button Trigger */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Icon Button Trigger (More Actions)
          </Text>
        </Box>
        <DropdownMenu
          trigger={
            <IconButton 
              icon={<Icon>⋮</Icon>} 
              variant="ghost" 
              aria-label="More options" 
            />
          }
          items={[
             { id: 'edit', label: 'Edit', icon: <Icon>✏️</Icon> },
             { id: 'dup', label: 'Duplicate', icon: <Icon>📄</Icon> },
             { id: 'sep', isDivider: true, label: 'separator' },
             { id: 'del', label: 'Delete', icon: <Icon>🗑️</Icon>, danger: true },
          ]}
          align="start"
        />
      </Box>

      {/* 5. Configuration Options */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            5. Configuration (No Icons, No Shortcuts)
          </Text>
        </Box>
        <DropdownMenu
          trigger={<Button variant="secondary">Minimal Menu</Button>}
          items={basicItems}
          showIcons={false}
          showShortcuts={false}
        />
      </Box>

    </Box>
  );
};
