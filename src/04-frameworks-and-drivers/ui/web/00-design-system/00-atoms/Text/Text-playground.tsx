import { Text } from './Text';
import { Box } from '../Box/Box';

export const TextPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" color="DARK" style={{ marginBottom: 24 }}>
        🔤 Typography Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="md">
        <Box>
          <Text size="xs" color="SECONDARY">Caption (xs)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="md">Body Text (md) - Default</Text>
          <Text size="lg">Large Text (lg)</Text>
          <Text size="xl" weight="medium">Heading (xl)</Text>
          <Text size="2xl" weight="bold">Display (2xl)</Text>
          <Text size="3xl" weight="bold" color="PRIMARY">Hero (3xl)</Text>
        </Box>

        <Box mt="2xl">
          <Text weight="bold" style={{ marginBottom: 8 }}>Weights & Colors</Text>
          <Text color="DANGER">Danger Text</Text>
          <Text color="SUCCESS" weight="semibold">Success Semibold</Text>
          <Text weight="bold" style={{ color: '#9c27b0' }}>Custom Hex Color (via style)</Text>
          <Text
            sx={{
              color: '#e91e63',
              textDecoration: 'underline',
              '&:hover': { color: '#c2185b', cursor: 'pointer' }
            }}
            weight="bold"
          >
            Custom Style (via sx) - Hover me!
          </Text>
        </Box>

        <Box mt="2xl" w={200} p="sm" style={{ backgroundColor: '#f0f0f0' }}>
          <Text weight="bold" size="sm">Truncation:</Text>
          <Text truncate>This is a very long text that should be truncated because the container is too small.</Text>
        </Box>
      </Box>
    </Box>
  );
};