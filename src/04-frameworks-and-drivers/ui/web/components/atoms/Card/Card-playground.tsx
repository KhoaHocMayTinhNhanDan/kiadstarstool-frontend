import { Card } from './Card';
import { Text } from '../Text';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';

export const CardTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>🃏 Card Demo</Text>
      
      <Box display="flex" gap="24px" flexWrap="wrap">
        <Card variant="elevated" style={{ width: 300 }}>
          <Text size="lg" weight="bold" style={{ marginBottom: 8 }}>Elevated Card</Text>
          <Text color="SECONDARY" style={{ marginBottom: 16 }}>This is the default card style with a subtle shadow.</Text>
          <Button size="sm">Action</Button>
        </Card>

        <Card variant="outlined" style={{ width: 300 }}>
          <Text size="lg" weight="bold" style={{ marginBottom: 8 }}>Outlined Card</Text>
          <Text color="SECONDARY" style={{ marginBottom: 16 }}>Useful for secondary content areas or grouped lists.</Text>
          <Button size="sm" variant="outline">View Details</Button>
        </Card>

        <Card variant="flat" style={{ width: 300, backgroundColor: '#f8f9fa' }}>
          <Text size="lg" weight="bold" style={{ marginBottom: 8 }}>Flat Card</Text>
          <Text color="SECONDARY" style={{ marginBottom: 16 }}>No shadow or border. Good for background grouping.</Text>
        </Card>
      </Box>
    </Box>
  );
};