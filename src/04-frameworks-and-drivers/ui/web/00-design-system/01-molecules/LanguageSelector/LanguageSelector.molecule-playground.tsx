/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector.molecule';
import { Box, Text } from '../../00-atoms';

export const LanguageSelectorPlayground = () => {
  const [lang, setLang] = useState('vi');

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h2" size="2xl" weight="bold">
        🌐 LanguageSelector Demo
      </Text>

      <Box p="lg" border="1px solid #e2e8f0" radius="md">
        <Box mb="md">
          <Text weight="semibold">Default Variant</Text>
        </Box>
        <LanguageSelector
          value={lang}
          onChange={setLang}
        />
      </Box>

      <Box p="lg" border="1px solid #e2e8f0" radius="md">
        <Box mb="md">
          <Text weight="semibold">Icon Only Variant</Text>
        </Box>
        <LanguageSelector
          value={lang}
          onChange={setLang}
          variant="icon-only"
        />
      </Box>

      <Box p="lg" border="1px solid #e2e8f0" radius="md">
        <Box mb="md">
          <Text weight="semibold">Custom Options</Text>
        </Box>
        <LanguageSelector
          value={lang}
          onChange={setLang}
          options={[
            { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
            { code: 'en', label: 'English', flag: '🇺🇸' },
            { code: 'jp', label: '日本語', flag: '🇯🇵' },
            { code: 'kr', label: '한국어', flag: '🇰🇷' },
          ]}
        />
      </Box>

      <Box mt="md">
        <Text>Selected Language Code: <strong>{lang}</strong></Text>
      </Box>
    </Box>
  );
};