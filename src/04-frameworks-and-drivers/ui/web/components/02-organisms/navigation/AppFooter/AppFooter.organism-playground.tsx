/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AppFooter } from './AppFooter.organism';
import { Box, Text, Icon } from '../../../00-atoms';

// Tạo các icon components demo
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.5 3.5 0 0 0-3.433 4.188l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z"/>
  </svg>
);

export const AppFooterPlayground = () => {
  return (
    <Box p="lg" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🦶 AppFooter Demo với Icon Components
      </Text>

      {/* Section 1: Icon trong links */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" color="PRIMARY">
          1. Footer với Icons trong Links
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppFooter
            copyright={
              <Text>
                © {new Date().getFullYear()} <strong>KiadStars</strong>
              </Text>
            }
            links={[
              { 
                label: 'GitHub', 
                href: 'https://github.com', 
                target: '_blank',
                icon: <Icon size="sm"><GithubIcon /></Icon>
              },
              { 
                label: 'Documentation', 
                href: 'https://docs.example.com', 
                target: '_blank',
                icon: <Icon size="sm"><ExternalLinkIcon /></Icon>
              },
              { 
                label: 'Support', 
                href: 'mailto:support@kiadstars.com',
                icon: <Icon size="sm"><MailIcon /></Icon>
              },
              { 
                label: 'Help Center', 
                href: '/help',
                icon: <Icon size="sm"><HelpIcon /></Icon>
              },
            ]}
          />
        </Box>
      </Box>

      {/* Section 2: Icon trong copyright */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" color="PRIMARY">
          2. Icon trong Copyright
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppFooter
            copyright={
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#2196f3">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </Icon>
                <Box>
                  <Text weight="bold">KiadStars Academy</Text>
                  <Text size="xs" color="TEXT_MUTED">
                    Education Management Platform
                  </Text>
                </Box>
              </Box>
            }
            links={[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ]}
          />
        </Box>
      </Box>

      {/* Section 3: Mixed Icons */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" color="PRIMARY">
          3. Mixed Icon Sizes
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppFooter
            copyright={`© ${new Date().getFullYear()} KiadStars`}
            links={[
              { 
                label: 'Small', 
                href: '#', 
                icon: <Icon size="xs">🔍</Icon>
              },
              { 
                label: 'Medium', 
                href: '#', 
                icon: <Icon size="sm">⚙️</Icon>
              },
              { 
                label: 'Large', 
                href: '#', 
                icon: <Icon size="md">⭐</Icon>
              },
            ]}
          >
            <Box display="flex" alignItems="center" justifyContent="center" gap="sm">
              <Icon size="xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#2e7d32">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </Icon>
              <Text variant="caption" color="TEXT_MUTED">
                All systems operational
              </Text>
            </Box>
          </AppFooter>
        </Box>
      </Box>

      {/* Section 4: Real-world với Icons */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" color="PRIMARY">
          4. Real-world Example: SaaS Dashboard
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppFooter
            copyright={
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#2196f3">
                    <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                  </svg>
                </Icon>
                <Box>
                  <Text weight="bold">KiadSaaS Pro</Text>
                  <Text size="xs" color="TEXT_MUTED">
                    Enterprise Plan • Active
                  </Text>
                </Box>
              </Box>
            }
            links={[
              { 
                label: 'Status', 
                href: 'https://status.kiadsaas.com', 
                target: '_blank',
                icon: <Icon size="sm"><ExternalLinkIcon /></Icon>
              },
              { 
                label: 'Support', 
                href: '/support',
                icon: <Icon size="sm"><HelpIcon /></Icon>
              },
              { 
                label: 'Changelog', 
                href: '/changelog',
                icon: <Icon size="sm">📋</Icon>
              },
            ]}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2e7d32">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </Icon>
                <Text variant="caption" color="TEXT_MUTED">
                  API: Healthy
                </Text>
              </Box>
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2e7d32">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </Icon>
                <Text variant="caption" color="TEXT_MUTED">
                  Database: Online
                </Text>
              </Box>
              <Box display="flex" alignItems="center" gap="sm">
                <Icon size="xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ed6c02">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </Icon>
                <Text variant="caption" color="TEXT_MUTED">
                  Cache: 92%
                </Text>
              </Box>
            </Box>
          </AppFooter>
        </Box>
      </Box>

      {/* Section 5: Accessibility demo với Icons */}
      <Box as="section">
        <Text as="h3" variant="heading-md" weight="semibold" color="PRIMARY">
          5. Accessibility: Icons với ARIA Labels
        </Text>
        <Box border="1px solid #e2e8f0" radius="md" overflow="hidden">
          <AppFooter
            copyright={`© ${new Date().getFullYear()} KiadStars`}
            links={[
              { 
                label: 'GitHub Repository', 
                href: 'https://github.com',
                target: '_blank',
                icon: <Icon size="sm" aria-hidden="true"><GithubIcon /></Icon>,
                ariaLabel: 'Visit our GitHub repository (opens in new tab)'
              },
              { 
                label: 'Email Support', 
                href: 'mailto:support@kiadstars.com',
                icon: <Icon size="sm" aria-hidden="true"><MailIcon /></Icon>,
                ariaLabel: 'Send email to support team'
              },
              { 
                label: 'Documentation', 
                href: 'https://docs.example.com',
                target: '_blank',
                icon: <Icon size="sm" aria-hidden="true"><ExternalLinkIcon /></Icon>,
                ariaLabel: 'View documentation (opens in new tab)'
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};