import { useState } from 'react';
import { Slider } from './Slider';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const SliderPlayground = () => {
  const [value, setValue] = useState([50]);

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🎚️ Slider Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl" maxW="400px">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Basic</Text></Box>
          <Slider defaultValue={[50]} max={100} step={1} onValueChange={setValue} />
          <Box mt="sm"><Text size="sm">Value: {value}</Text></Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States & Error</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Slider disabled defaultValue={[30]} />
            <Slider error="Invalid range selected" defaultValue={[80]} />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Slider 
            defaultValue={[60]} 
            sx={{ 
              '& span[data-orientation="horizontal"]': { height: 8 }, // Thicker track
              '& span[role="slider"]': { backgroundColor: '#10b981', borderColor: '#059669' } // Green thumb
            }} 
          />
        </Box>

      </Box>
    </Box>
  );
};