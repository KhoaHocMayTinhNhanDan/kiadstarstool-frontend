import { Logo } from './Logo';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const LogoPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🔷 Logo Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Default</Text></Box>
          <Logo />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Box display="flex" gap="xl">
            <Logo sx={{ color: '#ef4444' }} />
            <Logo width={150} sx={{ opacity: 0.5 }} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};