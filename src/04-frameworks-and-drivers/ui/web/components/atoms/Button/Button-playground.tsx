/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from './Button';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

const StarIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const LongText =
  'This is a very very long button label to test overflow behavior';

export const ButtonPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ mb: '24px' }}>
        🔘 Button – Production Contract Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="2xl">

        {/* ================================================= */}
        {/* VARIANTS */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Variants
          </Text>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* SIZES – TYPOGRAPHY SCALE */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Sizes (text & icon scale together)
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            Button controls font-size. Icon uses 1em.
          </Text>
          <Box display="flex" gap="md" alignItems="center" flexWrap="wrap">
            <Button size="xs">
              <Icon>{StarIcon}</Icon>
              XS
            </Button>
            <Button size="sm">
              <Icon>{StarIcon}</Icon>
              SM
            </Button>
            <Button size="md">
              <Icon>{StarIcon}</Icon>
              MD
            </Button>
            <Button size="lg">
              <Icon>{StarIcon}</Icon>
              LG
            </Button>
            <Button size="xl">
              <Icon>{StarIcon}</Icon>
              XL
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* ICON AS CHILDREN (ORDER MATTERS) */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Icon as children (order matters)
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            Button does not know left/right icon – layout is children-driven.
          </Text>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Button>
              <Icon>{StarIcon}</Icon>
              Left icon
            </Button>

            <Button>
              Right icon
              <Icon>{StarIcon}</Icon>
            </Button>

            <Button>
              <Icon>{StarIcon}</Icon>
              Both
              <Icon>{StarIcon}</Icon>
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* ICON ONLY */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Icon only
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            aria-label required. Square hit-area recommended.
          </Text>
          <Box display="flex" gap="md">
            <Button
              aria-label="Favorite"
              sx={{ aspectRatio: '1 / 1', padding: 0 }}
            >
              <Icon>{StarIcon}</Icon>
            </Button>

            <Button
              size="lg"
              aria-label="Favorite large"
              sx={{ aspectRatio: '1 / 1', padding: 0 }}
            >
              <Icon>{StarIcon}</Icon>
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* STATES */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            States
          </Text>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Button isLoading>Loading</Button>
            <Button isLoading size="lg">
              Loading LG
            </Button>
            <Button disabled>Disabled</Button>
            <Button disabled>
              <Icon>{StarIcon}</Icon>
              Disabled + Icon
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* FULL WIDTH */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Full width
          </Text>
          <Box display="grid" gap="md" maxWidth="400px">
            <Button fullWidth>Full width</Button>
            <Button fullWidth size="lg">
              <Icon>{StarIcon}</Icon>
              Full width + Icon
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* LONG TEXT – LIMIT */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Long text (no truncate by default)
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            Truncation is a consumer decision, not Button’s responsibility.
          </Text>
          <Box maxWidth="300px">
            <Button>{LongText}</Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* POLYMORPHIC */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Polymorphic usage
          </Text>
          <Box display="flex" gap="md">
            <Button as="a" href="https://example.com">
              Link Button
            </Button>
            <Button as="div" role="button">
              Div Button
            </Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* ICON AS CHILDREN (ORDER MATTERS) */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Icon as children (order matters)
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            Button does not know left/right icon – layout is children-driven.
          </Text>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Button leftIcon={<Icon>{StarIcon}</Icon>}>Left icon</Button>

            <Button rightIcon={<Icon>{StarIcon}</Icon>}>Right icon</Button>

            <Button leftIcon={<Icon>{StarIcon}</Icon>} rightIcon={<Icon>{StarIcon}</Icon>}>Both</Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* INTENTS */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            Intents (semantic variants)
          </Text>
          <Text size="sm" color="TEXT_MUTED" sx={{ mb: '12px' }}>
            Describes the button's purpose. Overrides color for filled variants.
          </Text>
          <Box display="flex" gap="md" flexWrap="wrap">
            <Button intent="default">Default</Button>
            <Button intent="success">Success</Button>
            <Button intent="danger">Danger</Button>
            <Button intent="warning">Warning</Button>
          </Box>
        </section>

        {/* ================================================= */}
        {/* SX OVERRIDE – POWER & DANGER */}
        {/* ================================================= */}
        <section>
          <Text weight="semibold" sx={{ mb: '8px' }}>
            SX override (power & danger)
          </Text>
          <Box display="flex" gap="md">
            <Button
              sx={{
                borderRadius: '999px',
                fontSize: '20px',
                paddingInline: '32px',
              }}
            >
              Custom Shape
            </Button>

            <Button
              sx={{
                background: 'black',
                color: 'lime',
                '&:hover': { background: '#222' },
              }}
            >
              Hacker Mode
            </Button>
          </Box>
        </section>

      </Box>
    </Box>
  );
};
