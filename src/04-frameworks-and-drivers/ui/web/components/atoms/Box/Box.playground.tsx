// Box/Box.playground.tsx
import { Box } from './Box';
import { SPACING, COLORS } from '..//00-core/tokens-constants';


export const BoxPlayground = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Box Component Playground</h1>
      
      <h2>Spacing Examples</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {Object.keys(SPACING).map((spacingKey) => (
          <Box
            key={spacingKey}
            p={spacingKey as any}
            bg="NEUTRAL"
            color="TEXT"
            borderWidth="thin"
            borderColor="NEUTRAL"
            borderColorShade={300}
          >
            p="{spacingKey}" ({SPACING[spacingKey as keyof typeof SPACING]}px)
          </Box>
        ))}
      </div>
      
      <h2>Color Examples</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {Object.keys(COLORS).map((colorKey) => {
          if (typeof COLORS[colorKey as keyof typeof COLORS] === 'string') return null;
          
          return (
            <Box
              key={colorKey}
              p="md"
              bg={colorKey as any}
              color="TEXT"
              style={{ minWidth: '120px', textAlign: 'center' }}
            >
              {colorKey}
            </Box>
          );
        })}
      </div>
      
      <h2>Layout Examples</h2>
      <Box display="flex" gap="md" p="lg" bg="PRIMARY" bgShade={100}>
        <Box p="md" bg="PRIMARY" color="TEXT">Item 1</Box>
        <Box p="md" bg="PRIMARY" color="TEXT">Item 2</Box>
        <Box p="md" bg="PRIMARY" color="TEXT">Item 3</Box>
      </Box>
      
      <h2>Polymorphic Examples</h2>
      <Box as="section" p="xl" mt="lg" borderWidth="thin" borderColor="NEUTRAL">
        <Box as="h2" mb="md">Section Title</Box>
        <Box as="p" mb="sm">This is a paragraph inside a section.</Box>
        <Box as="button" p="md" bg="PRIMARY" color="TEXT" border="none">
          Click me
        </Box>
      </Box>
    </div>
  );
};