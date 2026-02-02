import { Textarea } from './Textarea';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const TextareaPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        📝 Textarea Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl" maxW="500px">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Basic</Text></Box>
          <Textarea placeholder="Enter your bio..." />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Full Width & Rows</Text></Box>
          <Textarea fullWidth rows={4} placeholder="Type a long message..." />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">States</Text></Box>
          <Box display="flex" flexDirection="column" gap="md">
            <Textarea disabled placeholder="Disabled textarea" />
            <Textarea error placeholder="Error state" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Resize Options</Text></Box>
          <Box display="flex" gap="md">
            <Textarea resize="none" placeholder="No resize" />
            <Textarea resize="both" placeholder="Resize both" />
          </Box>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Textarea 
            placeholder="Custom styled textarea"
            sx={{
              backgroundColor: '#f0f9ff',
              border: '2px dashed #3b82f6',
              borderRadius: '12px',
              '&:focus': {
                backgroundColor: '#fff',
              }
            }}
          />
        </Box>

      </Box>
    </Box>
  );
};