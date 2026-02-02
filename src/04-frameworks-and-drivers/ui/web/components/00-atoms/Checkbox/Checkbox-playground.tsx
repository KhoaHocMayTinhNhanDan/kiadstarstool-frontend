import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const CheckboxPlayground = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        ☑️ Checkbox Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Checkbox size="sm" defaultChecked />
            <Checkbox size="md" defaultChecked />
            <Checkbox size="lg" defaultChecked />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" alignItems="center" gap="sm">
            <Checkbox 
              defaultChecked 
              sx={{ borderRadius: '50%', '&[data-state="checked"]': { backgroundColor: '#10b981', borderColor: '#10b981' } }} 
            />
            <Text>Circular Green</Text>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};