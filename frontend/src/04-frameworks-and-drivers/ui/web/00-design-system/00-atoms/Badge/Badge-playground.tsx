import { Badge } from './Badge';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const BadgePlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🏷️ Badge Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Variants</Text></Box>
          <Box display="flex" gap="md">
            <Badge variant="filled">Filled</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Colors</Text></Box>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="neutral">Neutral</Badge>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Badge 
            sx={{ 
              backgroundColor: '#8b5cf6', 
              boxShadow: '0 0 0 2px #ddd6fe' 
            }}
          >Custom Purple</Badge>
        </Box>

      </Box>
    </Box>
  );
};