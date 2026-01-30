import { LoadingSpinner } from './LoadingSpinner';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const LoadingSpinnerPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        ⏳ LoadingSpinner Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <LoadingSpinner size="xs" />
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Colors</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <LoadingSpinner color="#ef4444" />
            <LoadingSpinner color="#10b981" />
            <LoadingSpinner color="#f59e0b" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <LoadingSpinner sx={{ borderTopColor: '#8b5cf6', borderRightColor: '#8b5cf6' }} />
        </Box>

      </Box>
    </Box>
  );
};