import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { LanguageSelector } from './LanguageSelector.molecule';

export const LanguageSelectorTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        🌐 LanguageSelector Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="32px" maxW="400px">
        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Default</Text>
          <LanguageSelector />
        </section>

        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Custom Width</Text>
          <LanguageSelector className="w-full" />
        </section>
      </Box>
    </Box>
  );
};