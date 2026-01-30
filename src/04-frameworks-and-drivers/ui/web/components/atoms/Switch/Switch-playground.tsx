import { useState } from 'react';
import { Switch } from './Switch';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const SwitchPlayground = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🎚️ Switch Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Basic</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Switch checked={checked} onCheckedChange={setChecked} />
            <Text>Toggle me: {checked ? 'ON' : 'OFF'}</Text>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States & Error</Text></Box>
          <Box display="flex" gap="xl" alignItems="flex-start">
            <Box display="flex" alignItems="center" gap="sm">
              <Switch disabled />
              <Text>Disabled Off</Text>
            </Box>
            <Box display="flex" alignItems="center" gap="sm">
              <Switch disabled defaultChecked />
              <Text>Disabled On</Text>
            </Box>
            <Switch error="This field is required." />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Switch defaultChecked sx={{ backgroundColor: '#10b981', '&[data-state="checked"]': { backgroundColor: '#059669' } }} />
            <Text>Custom Green</Text>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};