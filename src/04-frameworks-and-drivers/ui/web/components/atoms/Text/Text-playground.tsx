import { Text } from './Text';
import { Box } from '../Box/Box';

export const TextTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" color="DARK" style={{ marginBottom: 24 }}>
        🔤 Typography Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="16px">
        <Box>
          <Text size="xs" color="SECONDARY">Caption (xs)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="md">Body Text (md) - Default</Text>
          <Text size="lg">Large Text (lg)</Text>
          <Text size="xl" weight="medium">Heading (xl)</Text>
          <Text size="2xl" weight="bold">Display (2xl)</Text>
          <Text size="3xl" weight="bold" color="PRIMARY">Hero (3xl)</Text>
        </Box>

        <Box mt="24px">
          <Text weight="bold" style={{ marginBottom: 8 }}>Weights & Colors</Text>
          <Text color="DANGER">Danger Text</Text>
          <Text color="SUCCESS" weight="semibold">Success Semibold</Text>
          <Text color="#9c27b0" weight="bold">Custom Hex Color</Text>
        </Box>

        <Box mt="24px" w="200px" p="8px" bg="#f0f0f0">
          <Text weight="bold" size="sm">Truncation:</Text>
          <Text truncate>This is a very long text that should be truncated because the container is too small.</Text>
        </Box>
      </Box>
    </Box>
  );
};