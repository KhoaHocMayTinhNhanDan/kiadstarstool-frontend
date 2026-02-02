import { IconButton } from './IconButton';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import type { ButtonSize, ButtonVariant } from '../Button';

const PlusIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const EditIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

export const IconButtonPlayground = () => {
  const variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'outline',
    'ghost',
  ];

  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🔘 IconButton Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="xl">
        {/* Variants */}
        <section>
          <Box mb="sm">
            <Text weight="semibold">Variants</Text>
          </Box>
          <Box display="flex" gap="md">
            {variants.map(variant => (
              <IconButton
                key={variant}
                variant={variant}
                icon={PlusIcon}
                aria-label={variant}
              />
            ))}
          </Box>
        </section>

        {/* Sizes */}
        <section>
          <Box mb="sm">
            <Text weight="semibold">Sizes</Text>
          </Box>
          <Box display="flex" gap="md">
            {sizes.map(size => (
              <IconButton
                key={size}
                size={size}
                icon={PlusIcon}
                aria-label={size}
              />
            ))}
          </Box>
        </section>

        {/* States */}
        <section>
          <Box mb="sm">
            <Text weight="semibold">States</Text>
          </Box>
          <Box display="flex" gap="md">
            <IconButton icon={PlusIcon} aria-label="Disabled" disabled />
            <IconButton icon={PlusIcon} aria-label="Loading" isLoading />
          </Box>
        </section>

        {/* Custom */}
        <section>
          <Box mb="sm">
            <Text weight="semibold">Custom styles</Text>
          </Box>
          <Box display="flex" gap="md">
            <IconButton
              icon={PlusIcon}
              aria-label="Gradient"
              sx={{
                background:
                  'linear-gradient(135deg,#6366f1 0%,#a855f7 100%)',
                color: 'white',
                boxShadow: '0 4px 14px rgba(139,92,246,.39)',
              }}
            />

            <IconButton
              icon={EditIcon}
              aria-label="Dashed"
              sx={{
                border: '2px dashed #f59e0b',
                background: 'transparent',
                color: '#d97706',
              }}
            />
          </Box>
        </section>
      </Box>
    </Box>
  );
};
