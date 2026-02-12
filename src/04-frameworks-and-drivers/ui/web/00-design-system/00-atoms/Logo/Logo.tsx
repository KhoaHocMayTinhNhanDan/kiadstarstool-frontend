/** @jsxImportSource @emotion/react */
import React from 'react';
import { getLogoStyles, logoWrapper } from './Logo.styles';
import type { LogoProps } from './Logo.types';

const LogoSvg = () => (
  <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128 24L32 80V176L128 232L224 176V80L128 24Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M128 24V128L32 80L128 24Z" fill="currentColor"/>
    <path d="M128 128L224 80L128 24V128Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M32 80V176L128 232V128L32 80Z" fill="currentColor" fillOpacity="0.8"/>
    <path d="M224 176V80L128 128V232L224 176Z" fill="currentColor"/>
  </svg>
);

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ width = 100, height, className, sx, ...props }, ref) => {
    return (
      <div css={logoWrapper} className={className}>
        <div ref={ref} css={[getLogoStyles(width, height), sx]} {...props}>
          <LogoSvg />
        </div>
      </div>
    );
  }
);

Logo.displayName = 'Logo';