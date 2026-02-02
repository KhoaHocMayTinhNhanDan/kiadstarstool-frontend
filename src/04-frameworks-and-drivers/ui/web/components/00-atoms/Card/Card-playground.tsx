import { Card } from './Card';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Button } from '../Button';

export const CardPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🃏 Card Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Basic Card</Text></Box>
          <Card sx={{ maxWidth: 400 }}>
            <Box mb="sm"><Text weight="bold" size="lg">Card Title</Text></Box>
            <Box mb="md"><Text color="SECONDARY">
              This is a basic card component used to group related content. It has default padding, border radius, and shadow.
            </Text></Box>
            <Button size="sm">Action</Button>
          </Card>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Card sx={{ backgroundColor: '#f0f9ff', borderColor: '#bae6fd', maxWidth: 300 }}>
              <Text weight="bold" color="#0369a1">Info Card</Text>
              <Text size="sm" color="#0c4a6e">This card has custom background and border colors.</Text>
            </Card>

            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', maxWidth: 300 }}>
              <Text weight="bold" color="WHITE">Gradient Card</Text>
              <Text size="sm" color="WHITE" sx={{ opacity: 0.9 }}>
                Using sx prop for gradient background and white text.
              </Text>
            </Card>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};