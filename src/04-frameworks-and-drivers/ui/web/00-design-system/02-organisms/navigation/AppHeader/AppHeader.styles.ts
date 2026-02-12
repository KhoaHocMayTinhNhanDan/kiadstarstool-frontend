// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.styles.ts
import { css } from '@emotion/react';
import {
  SPACING,
  COLORS,
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

export const navItem = (isActive: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${isActive ? 600 : 500};
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  background-color: ${isActive ? COLORS.PRIMARY_LIGHT : 'transparent'};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${isActive ? COLORS.PRIMARY_LIGHT : COLORS.BACKGROUND_SUBTLE};
    color: ${COLORS.PRIMARY};
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
`;