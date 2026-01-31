import { useState } from 'react';
import { Select } from './Select';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3 (Disabled)', value: '3', disabled: true },
];

export const SelectPlayground = () => {
  const [fruit, setFruit] = useState('');

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🔽 Select Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl" maxW="400px">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Basic</Text></Box>
          <Select options={OPTIONS} />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">With Label & Full Width</Text></Box>
          <Select label="Choose an option" fullWidth options={OPTIONS} />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Select size="sm" options={[{ label: 'Small', value: 'sm' }]} />
            <Select size="md" options={[{ label: 'Medium', value: 'md' }]} />
            <Select size="lg" options={[{ label: 'Large', value: 'lg' }]} />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Select disabled label="Disabled" options={OPTIONS} />
            <Select error="This field is required" label="Error State" options={OPTIONS} />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Select 
            options={OPTIONS}
            sx={{
              backgroundColor: '#f0f9ff',
              borderColor: '#3b82f6',
            }}
          />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Arrow (Override)</Text></Box>
          <Select 
            label="Red Chevron"
            options={OPTIONS}
            sx={{
              // Demo thay đổi icon mũi tên (ví dụ: đổi sang màu đỏ)
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ef4444' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3e%3c/svg%3e")`,
            }}
          />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Interactive (Controlled)</Text></Box>
          <Select 
            label="Favorite Fruit"
            placeholder="Select a fruit..."
            value={fruit}
            onChange={(e) => setFruit(e.target.value)}
            options={[
              { label: '🍎 Apple', value: 'apple' },
              { label: '🍌 Banana', value: 'banana' },
              { label: '🍊 Orange', value: 'orange' },
              { label: '🍇 Grape', value: 'grape' },
            ]}
          />
          <Box mt="sm" p="sm" sx={{ background: '#f5f5f5', borderRadius: '4px' }}>
            <Text size="sm">Selected value: <strong>{fruit || '(none)'}</strong></Text>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Edge Case: Long Text</Text></Box>
          <Select 
            label="Truncation Test"
            options={[
              { label: 'Short option', value: 'short' },
              { label: 'This is a very long option label that might be truncated on smaller screens depending on the browser rendering engine', value: 'long' },
            ]}
          />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Edge Case: Many Options (50+)</Text></Box>
          <Select 
            label="Country Code"
            placeholder="Select country..."
            options={Array.from({ length: 50 }).map((_, i) => ({
              label: `Country Option ${i + 1}`,
              value: `country-${i + 1}`
            }))}
          />
        </Box>

      </Box>
    </Box>
  );
};