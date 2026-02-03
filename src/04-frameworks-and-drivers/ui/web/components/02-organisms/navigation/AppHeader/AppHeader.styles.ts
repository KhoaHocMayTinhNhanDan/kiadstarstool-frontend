// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.styles.ts
import { css } from '@emotion/react';
import {
  SPACING,
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  TRANSITIONS,
  RADIUS,
  SHADOWS,
  Z_INDEX,
} from '../../../00-atoms/00-core/tokens-constants';

export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
} as const;

export const header = css`
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX.sticky};
  background-color: ${COLORS.WHITE};
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
  padding: 0 ${SPACING.xl};
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.lg};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0 ${SPACING.lg};
    height: 56px;
  }
`;

export const leftSection = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xl};
  flex: 1;
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    gap: ${SPACING.lg};
  }
`;

export const logoWrapper = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const nav = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;

export const navItem = (isActive: boolean, hasSubmenu: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${RADIUS.md};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${isActive ? FONT_WEIGHTS.semibold : FONT_WEIGHTS.medium};
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  background-color: ${isActive ? COLORS.PRIMARY_LIGHT : 'transparent'};
  text-decoration: none;
  transition: all ${TRANSITIONS.fast};
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background-color: ${isActive ? COLORS.PRIMARY_LIGHT : COLORS.BACKGROUND_SUBTLE};
    color: ${COLORS.PRIMARY};
  }
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
  
  ${hasSubmenu && css`
    &::after {
      content: '▼';
      font-size: 10px;
      margin-left: ${SPACING.xs};
      opacity: 0.7;
    }
  `}
`;

export const mobileMenuButton = css`
  display: none;
  background: none;
  border: none;
  padding: ${SPACING.sm};
  border-radius: ${RADIUS.sm};
  cursor: pointer;
  color: ${COLORS.TEXT_SECONDARY};
  
  &:hover {
    background-color: ${COLORS.BACKGROUND_SUBTLE};
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: block;
  }
`;

export const rightSection = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.lg};
  flex-shrink: 0;
`;

export const actionsWrapper = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: ${SPACING.sm};
  }
`;

export const searchWrapper = css`
  width: 240px;
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 200px;
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
`;

export const userMenuWrapper = css`
  position: relative;
`;

export const userMenuButton = css`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  border-radius: ${RADIUS.full};
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  transition: opacity ${TRANSITIONS.fast};
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

// Placeholder cho dropdown menu
export const dropdownMenu = css`
  position: absolute;
  top: calc(100% + ${SPACING.sm});
  right: 0;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOWS.lg};
  min-width: 200px;
  max-width: 320px;
  z-index: ${Z_INDEX.dropdown};
  padding: ${SPACING.sm} 0;
`;