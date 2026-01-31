/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box } from '../../../../atoms/Box';
import { Button } from '../../../../atoms/Button';
import { Text } from '../../../../atoms/Text';
import { ErrorBoundary } from './ErrorBoundary';

const BuggyComponent = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('💥 Boom! Đây là lỗi giả lập để kiểm tra ErrorBoundary.');
  }

  return (
    <Box padding="md" sx={{ border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff' }}>
      <Text sx={{ marginBottom: '16px' }}>
        Component này hoạt động bình thường.
      </Text>
      <Button intent="danger" onClick={() => setShouldCrash(true)}>
        Bấm để gây lỗi (Crash)
      </Button>
    </Box>
  );
};

export const ErrorBoundaryPlayground = () => {
  return (
    <Box padding="lg" display="flex" flexDirection="column" gap="xl">
      <Box>
        <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
          🛡️ Error Boundary Demo
        </Text>
        <Text color="neutral" sx={{ marginBottom: '16px' }}>
          Bao bọc các component con và hiển thị giao diện thay thế khi có lỗi xảy ra.
        </Text>
      </Box>

      <Box>
        <Text weight="semibold" sx={{ marginBottom: '16px' }}>Interactive Demo</Text>
        <ErrorBoundary fallbackMessage="Đã có lỗi xảy ra với widget này.">
          <BuggyComponent />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};