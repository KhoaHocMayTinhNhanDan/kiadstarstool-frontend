import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { ThemeToggle } from './ThemeToggle.molecule';
import { useTheme } from '../../providers/ThemeProvider';

export const ThemeToggleTest = () => {
  const { theme } = useTheme();

  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        🎨 ThemeToggle Demo
      </Text>

      <Box display="flex" alignItems="center" gap="16px">
        <ThemeToggle />
        <Text>
          Current theme is: <Text as="span" weight="bold">{theme}</Text>
        </Text>
      </Box>
    </Box>
  );
};