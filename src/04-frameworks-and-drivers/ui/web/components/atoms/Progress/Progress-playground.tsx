import { Progress } from './Progress';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const ProgressPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        📊 Progress Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl" maxW="500px">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Sizes</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Progress value={40} size="sm" />
            <Progress value={60} size="md" />
            <Progress value={80} size="lg" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Variants</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Progress value={70} variant="primary" />
            <Progress value={70} variant="success" />
            <Progress value={70} variant="danger" />
            <Progress value={70} variant="neutral" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Indeterminate</Text></Box>
          <Progress indeterminate />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Progress 
            value={50} 
            sx={{ 
              height: 20, 
              '& [data-state="loading"]': { backgroundColor: '#8b5cf6' } // Custom indicator color requires targeting inner element or adding prop support
            }} 
          />
        </Box>

      </Box>
    </Box>
  );
};