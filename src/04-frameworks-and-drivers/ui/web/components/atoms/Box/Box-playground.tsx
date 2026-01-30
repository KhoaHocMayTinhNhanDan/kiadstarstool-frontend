import { Box } from './Box';
import { Text } from '../Text/Text';

export const BoxPlayground = () => {
  return (
    <Box p="lg" style={{ fontFamily: 'system-ui' }}>
      <Box mb="3xl">
        <Text as="h2" size="2xl" weight="bold">
          📦 Box – Layout Primitive
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="3xl">
        
        {/* Basic Props */}
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">Basic Props (bg, p, radius, shadow)</Text>
          </Box>
          <Box 
            bg="WHITE" 
            p="xl" 
            radius="lg" 
            shadow="md" 
            border="1px solid #e2e8f0"
            w="300px"
          >
            <Text>I'm a card-like box</Text>
          </Box>
        </section>

        {/* Flexbox Layout */}
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">Flexbox Layout</Text>
          </Box>
          <Box display="flex" gap="md" alignItems="center">
            <Box w={60} h={60} bg="PRIMARY" radius="md" display="flex" alignItems="center" justifyContent="center">
              <Text color="WHITE" weight="bold">1</Text>
            </Box>
            <Box w={60} h={60} bg="SECONDARY" radius="md" display="flex" alignItems="center" justifyContent="center">
              <Text color="WHITE" weight="bold">2</Text>
            </Box>
            <Box w={60} h={60} bg="DANGER" radius="md" display="flex" alignItems="center" justifyContent="center">
              <Text color="WHITE" weight="bold">3</Text>
            </Box>
          </Box>
        </section>

        {/* Flex Prop */}
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">Flex Prop (flex=1)</Text>
          </Box>
          <Box display="flex" gap="md" w="100%" bg="NEUTRAL_LIGHT" p="md" radius="md">
            <Box flex={1} bg="WHITE" p="md" radius="sm" shadow="sm">
              <Text>Flex 1</Text>
            </Box>
            <Box flex={2} bg="WHITE" p="md" radius="sm" shadow="sm">
              <Text>Flex 2</Text>
            </Box>
          </Box>
        </section>

        {/* Custom Style (sx) */}
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">Custom Style (sx prop)</Text>
            <Text size="sm" color="SECONDARY">Supports pseudo-classes, media queries, and nested selectors.</Text>
          </Box>
          
          <Box 
            p="xl" 
            bg="INFO" 
            radius="md" 
            color="WHITE"
            sx={{
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#0277bd', // Darker INFO
              },
              '@media (max-width: 600px)': {
                backgroundColor: '#ef4444', // Red on mobile
                '&::after': {
                  content: '" (Mobile View)"',
                  fontSize: '0.8em',
                }
              }
            }}
          >
            <Text weight="bold" color="WHITE">Hover me! (Resize window to see media query)</Text>
          </Box>
        </section>

        {/* Polymorphism (as prop) */}
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">Polymorphism (as prop)</Text>
            <Text size="sm" color="SECONDARY">Box can be rendered as any HTML element.</Text>
          </Box>
          
          <Box display="flex" flexDirection="column" gap="md">
            <Box as="nav" p="md" bg="NEUTRAL_LIGHT" radius="md">
              <Text>This Box is a &lt;nav&gt; element.</Text>
            </Box>
            <Box as="section" p="md" bg="NEUTRAL_LIGHT" radius="md">
              <Text>This Box is a &lt;section&gt; element.</Text>
            </Box>
          </Box>
        </section>

      </Box>
    </Box>
  );
};