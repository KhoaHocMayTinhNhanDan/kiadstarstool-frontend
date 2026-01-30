import { Code } from './Code';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

const codeSnippet = `
function greet(name) {
  return \`Hello, \${name}!\`;
}
`.trim();

export const CodePlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        {'<>'} Code Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Inline Code</Text></Box>
          <Text>
            To start, run the <Code>npm install</Code> command. This will install all the necessary dependencies for the project. After that, you can run <Code>npm run dev</Code> to start the development server.
          </Text>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Block Code</Text></Box>
          <Code block>
            {codeSnippet}
          </Code>
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Code block sx={{ borderLeft: `4px solid #2196f3`, backgroundColor: '#f0f9ff' }}>
            {'// This is a code block with custom styles'}
          </Code>
        </Box>

      </Box>
    </Box>
  );
};