import { Divider } from './Divider';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const DividerPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        ➖ Divider Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Text weight="semibold" sx={{ marginBottom: '8px' }}>Horizontal (Default)</Text>
          <Text>Content above</Text>
          <Divider my="md" />
          <Text>Content below</Text>
        </Box>

        <Box>
          <Text weight="semibold" sx={{ marginBottom: '8px' }}>Variants & Colors</Text>
          <Divider variant="dashed" color="PRIMARY" my="sm" />
          <Divider variant="dotted" color="DANGER" thickness={2} my="sm" />
        </Box>

        <Box>
          <Text weight="semibold" sx={{ marginBottom: '8px' }}>Vertical</Text>
          <Box display="flex" alignItems="center" h="40px" border="1px solid #e2e8f0" p="sm">
            <Text>Item 1</Text>
            <Divider orientation="vertical" mx="md" />
            <Text>Item 2</Text>
            <Divider orientation="vertical" mx="md" color="PRIMARY" thickness={2} />
            <Text>Item 3</Text>
          </Box>
        </Box>

        <Box>
          <Text weight="semibold" sx={{ marginBottom: '8px' }}>Custom Style (sx)</Text>
          <Divider sx={{ borderColor: 'purple', opacity: 0.5 }} my="md" />
        </Box>

      </Box>
    </Box>
  );
};