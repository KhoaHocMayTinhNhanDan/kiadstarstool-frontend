import { Avatar } from './Avatar';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const AvatarPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        👤 Avatar Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Avatar size="xs" fallback="XS" />
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
            <Avatar size="2xl" fallback="2XL" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Image & Fallback</Text></Box>
          <Box display="flex" alignItems="center" gap="md">
            <Avatar 
              size="lg" 
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" 
              alt="Colm Tuite" 
              fallback="CT" 
            />
            <Avatar size="lg" fallback="JD" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Avatar size="lg" fallback="CS" sx={{ backgroundColor: '#8b5cf6', color: 'white', border: '2px solid white', boxShadow: '0 0 0 2px #8b5cf6' }} />
        </Box>

      </Box>
    </Box>
  );
};