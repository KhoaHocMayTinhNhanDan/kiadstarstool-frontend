import { useState } from 'react';
import { SearchFilterForm } from './SearchFilterForm';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';
import { Card } from '../../../atoms/Card';
import type { FilterConfig } from './SearchFilterForm.types';

const FILTER_CONFIGS: FilterConfig[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  {
    id: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
      { label: 'Editor', value: 'editor' },
    ],
  },
  {
    id: 'joinedDate',
    label: 'Joined Date',
    type: 'date',
  },
  {
    id: 'verified',
    label: 'Verified Only',
    type: 'checkbox',
  },
];

export const SearchFilterFormPlayground = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});

  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        🔍 SearchFilterForm Demo
      </Text>

      <Card sx={{ mb: '24px' }}>
        <SearchFilterForm
          filterConfigs={FILTER_CONFIGS}
          onSearch={setQuery}
          onFilterChange={setFilters}
          placeholder="Search users by name, email..."
        />
      </Card>

      <Box p="md" bg="LIGHT" radius="md">
        <Text weight="bold">Current State:</Text>
        <pre style={{ fontSize: '12px' }}>
          {JSON.stringify({ query, filters }, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};