// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Pagination/Pagination.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Pagination } from './Pagination.organism';
import { Box, Text } from '../../../00-atoms';

export const PaginationPlayground = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🔢 Pagination Demo
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Usage (Few Pages)
          </Text>
        </Box>
        <Box p="lg" border="1px solid #e2e8f0" radius="md" display="flex" flexDirection="column" alignItems="center" gap="md">
          <Text>Current Page: {page1}</Text>
          <Pagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
          />
        </Box>
      </Box>

      {/* 2. Many Pages (Dots Logic) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Many Pages (Complex Range)
          </Text>
          <Text color="SECONDARY" size="sm">
            Thử click vào các trang đầu, giữa và cuối để xem logic dấu "..." hoạt động.
          </Text>
        </Box>
        <Box p="lg" border="1px solid #e2e8f0" radius="md" display="flex" flexDirection="column" alignItems="center" gap="md">
          <Text>Current Page: {page2}</Text>
          <Pagination
            currentPage={page2}
            totalPages={50}
            onPageChange={setPage2}
            siblingCount={1}
          />
        </Box>
      </Box>

      {/* 3. Disabled State */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Disabled State
          </Text>
        </Box>
        <Box p="lg" border="1px solid #e2e8f0" radius="md" display="flex" flexDirection="column" alignItems="center" gap="md">
          <Pagination
            currentPage={page3}
            totalPages={5}
            onPageChange={setPage3}
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};