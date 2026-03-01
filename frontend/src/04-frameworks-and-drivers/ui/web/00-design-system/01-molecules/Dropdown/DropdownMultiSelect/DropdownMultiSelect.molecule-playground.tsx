// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/DropdownMultiSelect/DropdownMultiSelect.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { DropdownMultiSelect } from './DropdownMultiSelect.molecule';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { Avatar } from '../../../00-atoms/Avatar';
import { IconButton } from '../../../00-atoms/IconButton';
import type { DropdownItem, DropdownGroup } from './DropdownMultiSelect.types';

export const DropdownMultiSelectPlayground = () => {
  // State for different examples
  const [selectedIds1, setSelectedIds1] = useState<string[]>([]);
  const [selectedIds2, setSelectedIds2] = useState<string[]>(['slack', 'jira']);
  const [selectedIds3, setSelectedIds3] = useState<string[]>(['notif']);

  // 1. Basic Items
  const basicItems: DropdownItem[] = [
    { id: 'apple', label: 'Apple', icon: <Icon>🍎</Icon> },
    { id: 'banana', label: 'Banana', icon: <Icon>🍌</Icon> },
    { id: 'orange', label: 'Orange', icon: <Icon>🍊</Icon> },
    { id: 'grape', label: 'Grape', icon: <Icon>🍇</Icon> },
    { id: 'sep1', isDivider: true },
    { id: 'carrot', label: 'Carrot', icon: <Icon>🥕</Icon> },
  ];

  // 2. Grouped Items
  const groupedItems: DropdownGroup[] = [
    {
      id: 'work',
      label: 'Work Tools',
      items: [
        { id: 'slack', label: 'Slack', icon: <Icon>💬</Icon> },
        { id: 'jira', label: 'Jira', icon: <Icon>🎫</Icon> },
        { id: 'figma', label: 'Figma', icon: <Icon>🎨</Icon> },
      ]
    },
    {
      id: 'social',
      label: 'Social Media',
      items: [
        { id: 'twitter', label: 'Twitter', icon: <Icon>🐦</Icon> },
        { id: 'linkedin', label: 'LinkedIn', icon: <Icon>💼</Icon> },
      ]
    }
  ];

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        ☑️ DropdownMultiSelect Demo
      </Text>
      <Text color="SECONDARY">
        Component cho phép chọn nhiều item, hỗ trợ grouping, icons, và custom trigger.
        Trạng thái selection được control hoàn toàn từ bên ngoài (Controlled Component).
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Multi-Select (with Checkmarks)
          </Text>
        </Box>
        <Box display="flex" gap="md" alignItems="flex-start" flexDirection="column">
          <DropdownMultiSelect
            trigger={<Button>Select Fruits ({selectedIds1.length})</Button>}
            items={basicItems}
            selectedIds={selectedIds1}
            onSelectionChange={setSelectedIds1}
            showCheckmarks={true}
            minWidth={220}
          />
          <Box p="sm" bg="NEUTRAL_LIGHT" radius="sm" width="100%">
             <Text size="sm" sx={{ fontFamily: 'monospace' }}>
               Selected IDs: {JSON.stringify(selectedIds1)}
             </Text>
          </Box>
        </Box>
      </Box>

      {/* 2. Grouped Items & Pre-selection */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Grouped Items & Pre-selection
          </Text>
        </Box>
        <DropdownMultiSelect
          trigger={<Button variant="outline">Select Apps ({selectedIds2.length})</Button>}
          items={groupedItems}
          selectedIds={selectedIds2}
          onSelectionChange={setSelectedIds2}
          showCheckmarks={true}
          minWidth={240}
        />
      </Box>

      {/* 3. Custom Trigger & Variants */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Custom Trigger & Variants
          </Text>
        </Box>
        <Box display="flex" gap="xl" alignItems="center" flexWrap="wrap">
          {/* Icon Button Trigger - Minimal Variant */}
          <Box>
            <Box mb="xs"><Text size="sm" color="SECONDARY">Minimal Variant</Text></Box>
            <DropdownMultiSelect
              trigger={
                <IconButton 
                  icon={<Icon>⚙️</Icon>} 
                  variant="ghost" 
                  aria-label="Settings" 
                />
              }
              items={[
                { id: 'notif', label: 'Notifications' },
                { id: 'sound', label: 'Sound Effects' },
                { id: 'theme', label: 'Dark Mode' },
              ]}
              selectedIds={selectedIds3}
              onSelectionChange={setSelectedIds3}
              showCheckmarks={true}
              variant="minimal"
              align="start"
            />
          </Box>

          {/* Avatar Trigger - Compact Variant */}
          <Box>
             <Box mb="xs"><Text size="sm" color="SECONDARY">Compact Variant</Text></Box>
             <DropdownMultiSelect
              trigger={
                <Button variant="ghost" sx={{ borderRadius: '50%', padding: 0, width: 40, height: 40 }}>
                  <Avatar name="Team" size="md" />
                </Button>
              }
              items={groupedItems}
              selectedIds={selectedIds2}
              onSelectionChange={setSelectedIds2}
              showCheckmarks={true}
              variant="compact"
              align="center"
            />
          </Box>
        </Box>
      </Box>

      {/* 4. No Checkmarks (Toggle style) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. No Checkmarks (Highlight only)
          </Text>
        </Box>
        <DropdownMultiSelect
          trigger={<Button variant="secondary">Toggle Items</Button>}
          items={basicItems}
          selectedIds={selectedIds1}
          onSelectionChange={setSelectedIds1}
          showCheckmarks={false} // Highlight selected items instead of checkmark
        />
      </Box>

    </Box>
  );
};