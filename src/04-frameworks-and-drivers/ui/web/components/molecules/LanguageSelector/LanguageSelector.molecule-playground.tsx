import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { LanguageSelector } from './LanguageSelector.molecule';
import { I18nProvider } from '../../providers/I18nProvider';

export const LanguageSelectorPlayground = () => {
  return (
    <I18nProvider>
      <Box p="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
          🌐 LanguageSelector Demo
        </Text>

        <Box display="flex" flexDirection="column" gap="xl" maxW="400px">
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
    </I18nProvider>
  );
};