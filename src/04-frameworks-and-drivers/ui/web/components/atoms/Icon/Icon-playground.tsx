import { Icon } from './Icon';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

const StarIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const IconPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        ⭐ Icon Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Icon size="xs">{StarIcon}</Icon>
            <Icon size="sm">{StarIcon}</Icon>
            <Icon size="md">{StarIcon}</Icon>
            <Icon size="lg">{StarIcon}</Icon>
            <Icon size="xl">{StarIcon}</Icon>
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Icon size="lg" sx={{ color: '#f59e0b' }}>{StarIcon}</Icon>
            <Icon size="lg" sx={{ color: '#ef4444', transform: 'rotate(45deg)' }}>{StarIcon}</Icon>
            <Icon size="lg" sx={{ color: '#3b82f6', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{StarIcon}</Icon>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};