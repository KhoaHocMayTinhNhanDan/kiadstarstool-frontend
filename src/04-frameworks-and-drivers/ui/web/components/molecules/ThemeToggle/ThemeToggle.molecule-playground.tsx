import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { ThemeToggle } from './ThemeToggle.molecule';
import { useTheme, ThemeProvider } from '../../providers/ThemeProvider';

const ThemeToggleDemo = () => {
  const { theme } = useTheme();

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        🎨 ThemeToggle Demo
      </Text>

      <Box display="flex" alignItems="center" gap="md">
        <ThemeToggle />
        <Text>
          Current theme is: <Text as="span" weight="bold">{theme}</Text>
        </Text>
      </Box>
    </Box>
  );
};

export const ThemeTogglePlayground = () => {
  return (
    <ThemeProvider>
      <ThemeToggleDemo />
    </ThemeProvider>
  );
};