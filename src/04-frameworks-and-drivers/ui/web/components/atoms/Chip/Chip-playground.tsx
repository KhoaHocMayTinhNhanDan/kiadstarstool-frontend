import { Chip } from './Chip';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

const UserIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const ChipPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🏷️ Chip Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Variants</Text></Box>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Chip label="Filled" variant="filled" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Ghost" variant="ghost" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Colors</Text></Box>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Chip label="Primary" color="primary" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Danger" color="danger" />
            <Chip label="Neutral" color="neutral" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">With Icon & Delete</Text></Box>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Chip label="User" icon={<Icon>{UserIcon}</Icon>} />
            <Chip label="Deletable" onDelete={() => alert('Delete clicked')} />
            <Chip label="Clickable" onClick={() => alert('Chip clicked')} />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" gap="md">
            <Chip label="Custom" sx={{ backgroundColor: '#8b5cf6', color: 'white', fontWeight: 'bold' }} />
            <Chip label="Rounded" variant="outlined" sx={{ borderRadius: '4px', borderStyle: 'dashed' }} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};