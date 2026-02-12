// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppFooter/AppFooter.organism.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Text } from '../../../00-atoms';
import { Link as RouterLink } from 'react-router-dom';
import * as styles from './AppFooter.styles';
import type { AppFooterProps, FooterLink } from './AppFooter.types';

// Simple, type-safe solution
const FooterLinkItem: React.FC<{ link: FooterLink }> = ({ link }) => {
  const isInternal = link.href.startsWith('/');
  const rel = link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined);
  
  if (isInternal) {
    return (
      <RouterLink
        to={link.href}
        target={link.target}
        rel={rel}
        aria-label={link.ariaLabel || link.label}
        css={styles.link}
      >
        {link.icon && <span css={styles.linkIcon}>{link.icon}</span>}
        {link.label}
      </RouterLink>
    );
  }
  
  return (
    <a
      href={link.href}
      target={link.target}
      rel={rel}
      aria-label={link.ariaLabel || link.label}
      css={styles.link}
    >
      {link.icon && <span css={styles.linkIcon}>{link.icon}</span>}
      {link.label}
    </a>
  );
};

/**
 * AppFooter - Production Ready Component
 * 
 * Features:
 * ✅ Type-safe 100% - không cần @ts-ignore
 * ✅ Clean and simple
 * ✅ Dễ maintain
 */
export const AppFooter: React.FC<AppFooterProps> = React.memo(({
  copyright,
  links = [],
  children,
  testId = 'app-footer',
  className,
  sx,
}) => {
  const defaultCopyright = (
    <Text>
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </Text>
  );
  
  const copyrightContent = copyright || defaultCopyright;
  
  return (
    <Box
      as="footer"
      css={[styles.footer, sx]}
      className={className}
      role="contentinfo"
      aria-label="Site footer"
      data-testid={testId}
    >
      <div css={styles.container}>
        <div css={styles.copyright}>
          {copyrightContent}
        </div>
        
        {links.length > 0 && (
          <Box as="nav" css={styles.nav} aria-label="Footer navigation">
            {links.map((link, index) => (
              <Text as="span" key={`${link.href}-${index}`}>
                <FooterLinkItem link={link} />
              </Text>
            ))}
          </Box>
        )}
      </div>
      
      {children && <div css={styles.secondaryContent}>{children}</div>}
    </Box>
  );
});

AppFooter.displayName = 'AppFooter';

export { FooterLinkItem };