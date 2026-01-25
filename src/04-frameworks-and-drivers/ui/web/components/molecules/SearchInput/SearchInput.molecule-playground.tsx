import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { SearchInput } from './SearchInput.molecule';

export const SearchInputTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        🔍 SearchInput Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="32px" maxW="400px">
        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Default</Text>
          <SearchInput />
        </section>

        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Sizes</Text>
          <Box display="flex" flexDirection="column" gap="16px">
            <SearchInput size="sm" placeholder="Small search..." />
            <SearchInput size="md" placeholder="Medium search..." />
            <SearchInput size="lg" placeholder="Large search..." />
          </Box>
        </section>

        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Disabled</Text>
          <SearchInput disabled placeholder="Cannot search..." />
        </section>
      </Box>
    </Box>
  );
};