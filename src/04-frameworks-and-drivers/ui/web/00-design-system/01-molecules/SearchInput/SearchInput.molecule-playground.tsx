// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { SearchInput } from './SearchInput.molecule';
import { Box, Text } from '../../00-atoms';

export const SearchInputPlayground = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🔍 SearchInput Demo
      </Text>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">Sizes</Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="md" maxWidth="400px">
          <SearchInput size="sm" placeholder="Small search..." />
          <SearchInput size="md" placeholder="Medium search..." />
          <SearchInput size="lg" placeholder="Large search..." />
        </Box>
      </Box>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">Interactive (Controlled)</Text>
        </Box>
        <Box maxWidth="400px">
          <SearchInput 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(val) => setSearchResult(val)}
            placeholder="Type and press Enter..."
          />
          <Box mt="md" p="sm" bg="NEUTRAL_LIGHT" radius="sm">
            <Text size="sm">Current Value: <strong>{searchValue}</strong></Text>
            <Text size="sm">Last Search (Enter/Clear): <strong>{searchResult}</strong></Text>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">Disabled</Text>
        </Box>
        <Box maxWidth="400px">
          <SearchInput value="Cannot edit this" disabled />
        </Box>
      </Box>
    </Box>
  );
};