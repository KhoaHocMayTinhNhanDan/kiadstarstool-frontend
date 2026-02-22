// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/DropdownSelect/DropdownSelect.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { DropdownSelect } from './DropdownSelect.molecule';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { Avatar } from '../../../00-atoms/Avatar';
import { IconButton } from '../../../00-atoms/IconButton';
import type { DropdownSelectOption } from './DropdownSelect.types';
import { SPACING } from '../../../../03-ui-shared/constants/tokens-constants';

export const DropdownSelectPlayground = () => {
  // States for different examples
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  // Mock Options
  const fruitOptions: DropdownSelectOption[] = [
    { id: 'apple', label: 'Apple', value: 'apple', icon: <Icon>🍎</Icon> },
    { id: 'banana', label: 'Banana', value: 'banana', icon: <Icon>🍌</Icon> },
    { id: 'orange', label: 'Orange', value: 'orange', icon: <Icon>🍊</Icon> },
    { id: 'grape', label: 'Grape', value: 'grape', icon: <Icon>🍇</Icon> },
    { id: 'strawberry', label: 'Strawberry', value: 'strawberry', icon: <Icon>🍓</Icon> },
  ];

  const countryOptions: DropdownSelectOption[] = [
    { id: 'us', label: 'United States', value: 'us', icon: <Icon>🇺🇸</Icon> },
    { id: 'ca', label: 'Canada', value: 'ca', icon: <Icon>🇨🇦</Icon> },
    { id: 'mx', label: 'Mexico', value: 'mx', icon: <Icon>🇲🇽</Icon> },
    { id: 'gb', label: 'United Kingdom', value: 'gb', icon: <Icon>🇬🇧</Icon> },
    { id: 'fr', label: 'France', value: 'fr', icon: <Icon>🇫🇷</Icon> },
    { id: 'de', label: 'Germany', value: 'de', icon: <Icon>🇩🇪</Icon> },
    { id: 'jp', label: 'Japan', value: 'jp', icon: <Icon>🇯🇵</Icon> },
  ];

  const statusOptions: DropdownSelectOption[] = [
    { id: 'active', label: 'Active', value: 'active', icon: <Icon>🟢</Icon> },
    { id: 'pending', label: 'Pending', value: 'pending', icon: <Icon>🟡</Icon> },
    { id: 'inactive', label: 'Inactive', value: 'inactive', icon: <Icon>🔴</Icon> },
    { id: 'archived', label: 'Archived', value: 'archived', icon: <Icon>📦</Icon> },
  ];

  const userOptions: DropdownSelectOption[] = [
    { id: 'user1', label: 'Alice Smith', value: 'alice', icon: <Avatar name="Alice Smith" size="xs" /> },
    { id: 'user2', label: 'Bob Johnson', value: 'bob', icon: <Avatar name="Bob Johnson" size="xs" /> },
    { id: 'user3', label: 'Charlie Brown', value: 'charlie', icon: <Avatar name="Charlie Brown" size="xs" /> },
  ];

  const handleLoadOptions = () => {
    setIsLoadingOptions(true);
    setTimeout(() => {
      setIsLoadingOptions(false);
      // In a real app, you'd fetch options here
    }, 1500);
  };

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🔽 DropdownSelect Demo
      </Text>
      <Text color="SECONDARY">
        Component chọn một item duy nhất từ danh sách, hỗ trợ tìm kiếm, xóa, trạng thái loading/error và custom trigger.
        Sử dụng `DropdownBase` bên dưới để đảm bảo tính nhất quán.
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Select
          </Text>
        </Box>
        <DropdownSelect
          options={fruitOptions}
          value={selectedFruit}
          onChange={setSelectedFruit}
          placeholder="Select a fruit"
        />
        <Box p="sm" bg="NEUTRAL_LIGHT" radius="sm" mt="md">
          <Text size="sm" sx={{ fontFamily: 'monospace' }}>
            Selected Fruit: <strong>{selectedFruit || 'None'}</strong>
          </Text>
        </Box>
      </Box>

      {/* 2. Pre-selected Value & Clearable */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Pre-selected Value & Clearable
          </Text>
        </Box>
        <DropdownSelect
          options={countryOptions}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Select a country"
          clearable
        />
        <Box p="sm" bg="NEUTRAL_LIGHT" radius="sm" mt="md">
          <Text size="sm" sx={{ fontFamily: 'monospace' }}>
            Selected Country: <strong>{selectedCountry || 'None'}</strong>
          </Text>
        </Box>
      </Box>

      {/* 3. Searchable Select */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Searchable Select
          </Text>
        </Box>
        <DropdownSelect
          options={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder="Search status..."
          searchable
          minWidth={200}
        />
        <Box p="sm" bg="NEUTRAL_LIGHT" radius="sm" mt="md">
          <Text size="sm" sx={{ fontFamily: 'monospace' }}>
            Selected Status: <strong>{selectedStatus || 'None'}</strong>
          </Text>
        </Box>
      </Box>

      {/* 4. Custom Trigger & Options with Avatars */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Custom Trigger & Options with Avatars
          </Text>
        </Box>
        <Box display="flex" gap="md" alignItems="center">
          <DropdownSelect
            trigger={
              <IconButton
                icon={<Icon>👤</Icon>}
                variant="outline"
                aria-label="Select user"
              />
            }
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select user"
            minWidth={250}
            align="start"
          />
          <Text size="sm" color="SECONDARY">
            Selected User: <strong>{selectedUser || 'None'}</strong>
          </Text>
        </Box>
      </Box>

      {/* 5. Loading State */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            5. Loading State
          </Text>
        </Box>
        <Button onClick={handleLoadOptions} disabled={isLoadingOptions}>
          {isLoadingOptions ? 'Loading...' : 'Simulate Loading'}
        </Button>
        <DropdownSelect
          options={[]} // Empty options for loading demo
          value=""
          onChange={() => {}}
          placeholder="Loading options..."
          loading={isLoadingOptions}
          minWidth={200}
          sx={{ marginTop: SPACING.md }}
        />
      </Box>

      {/* 6. Error State */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            6. Error State
          </Text>
        </Box>
        <Button onClick={() => setErrorSelect(!errorSelect)} variant="outline">
          Toggle Error State
        </Button>
        <DropdownSelect
          options={fruitOptions}
          value={selectedFruit}
          onChange={setSelectedFruit}
          placeholder="Select a fruit"
          error={errorSelect}
          errorMessage={errorSelect ? 'This field is required.' : undefined}
          minWidth={250}
          sx={{ marginTop: SPACING.md }}
        />
      </Box>

      {/* 7. Different Sizes */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            7. Different Sizes
          </Text>
        </Box>
        <Box display="flex" gap="md" alignItems="flex-start" flexDirection="column">
          <DropdownSelect
            options={fruitOptions}
            value={selectedFruit}
            onChange={setSelectedFruit}
            placeholder="Small Select"
            size="sm"
            minWidth={180}
          />
          <DropdownSelect
            options={fruitOptions}
            value={selectedFruit}
            onChange={setSelectedFruit}
            placeholder="Medium Select"
            size="md"
            minWidth={200}
          />
          <DropdownSelect
            options={fruitOptions}
            value={selectedFruit}
            onChange={setSelectedFruit}
            placeholder="Large Select"
            size="lg"
            minWidth={220}
          />
        </Box>
      </Box>
    </Box>
  );
};