// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box, Text } from '../../00-atoms';
import { SearchInput } from './SearchInput.molecule';

export const SearchInputPlayground = () => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = (value: string) => {
    console.log('Searching locally for:', value);
    // Ở đây bạn có thể filter local data
    // Ví dụ: filterStudents(value);
  };
  
  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🔍 SearchInput - Web Tĩnh
      </Text>
      
      <Box display="flex" flexDirection="column" gap="lg">
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Search
          </Text>
          <SearchInput
            placeholder="Search students..."
            onSearch={handleSearch}
          />
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Controlled Component
          </Text>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type to search..."
          />
          <Text 
            size="sm" 
            color="TEXT_MUTED" 
            sx={{ marginTop: '8px' }}  // hoặc dùng tokens
          >
            Current value: "{searchValue}"
          </Text>
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Custom Icons
          </Text>
          <SearchInput
            placeholder="Search with custom icons..."
            searchIcon="🔍"
            clearIcon="❌"
          />
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Disabled State
          </Text>
          <SearchInput
            placeholder="Disabled search..."
            disabled
          />
        </Box>
        
        <Box>
          <Text as="h3" variant="heading-md" weight="semibold">
            5. Usage in AppHeader
          </Text>
          <Box 
            border="1px solid #e2e8f0" 
            p="md" 
            radius="md"
            css={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>App</div>
            <div style={{ flex: 1 }}>
              <SearchInput
                placeholder="Global search..."
                size="sm"
                showClearButton
              />
            </div>
            <button style={{ padding: '8px 16px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '6px' }}>
              Search
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};