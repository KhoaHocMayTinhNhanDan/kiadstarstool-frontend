import { Radio, RadioGroup } from './Radio';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const RadioPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🔘 Radio Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <RadioGroup defaultValue="md" sx={{ flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
            <Radio value="sm" size="sm" />
            <Radio value="md" size="md" />
            <Radio value="lg" size="lg" />
          </RadioGroup>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States</Text></Box>
          <RadioGroup defaultValue="disabled" sx={{ flexDirection: 'row', gap: '16px' }}>
            <Radio value="default" />
            <Radio value="disabled" disabled />
          </RadioGroup>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <RadioGroup defaultValue="custom">
            <Box display="flex" alignItems="center" gap="sm">
              <Radio 
                value="custom" 
                sx={{ 
                  borderColor: '#f59e0b', 
                  '&[data-state="checked"]': { borderColor: '#d97706' },
                  '& span::after': { backgroundColor: '#d97706' }
                }} 
              />
              <Text>Custom Amber</Text>
            </Box>
          </RadioGroup>
        </Box>

      </Box>
    </Box>
  );
};