import { Input } from './Input';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const InputPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        ⌨️ Input Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl" maxW="400px">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input (default)" />
            <Input size="lg" placeholder="Large input" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Input disabled placeholder="Disabled input" />
            <Input readOnly value="Read only input" />
            <Input error placeholder="Error state" />
            <Input error="Invalid email address" placeholder="Error with message" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">With Icons</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Input leftIcon={<Icon>{SearchIcon}</Icon>} placeholder="Search..." />
            <Input rightIcon={<Icon>{SearchIcon}</Icon>} placeholder="Search..." />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Input 
            placeholder="Custom styled input"
            sx={{
              backgroundColor: '#f0fdf4',
              borderColor: '#86efac',
              color: '#166534',
              '&:focus': { borderColor: '#15803d', boxShadow: '0 0 0 2px #bbf7d0' }
            }}
          />
        </Box>

      </Box>
    </Box>
  );
};