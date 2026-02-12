// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppSidebar/AppSidebar.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TRANSITIONS,
  Z_INDEX,
  SHADOWS,
  TYPOGRAPHY,
  RADIUS
} from '../../../00-atoms/00-core/tokens-constants';

export const sidebarWidth = 260;
export const sidebarCollapsedWidth = 72;

export const container = (collapsed: boolean) => css`
  width: ${collapsed ? sidebarCollapsedWidth : sidebarWidth}px;
  height: 100%;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border-right: 1px solid ${COLORS.NEUTRAL_BORDER};
  display: flex;
  flex-direction: column;
  transition: width ${TRANSITIONS.NORMAL};
  z-index: ${Z_INDEX.sticky};
  position: relative;
  flex-shrink: 0;
`;

export const header = css`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 ${SPACING.lg};
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
  flex-shrink: 0;
  overflow: hidden;
  white-space: nowrap;
`;

export const content = css`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${SPACING.md} ${SPACING.sm};
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.NEUTRAL_BORDER};
    border-radius: ${RADIUS.full};
  }
`;

export const footer = css`
  padding: ${SPACING.md};
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  flex-shrink: 0;
  overflow: hidden;
`;

export const groupLabel = (collapsed: boolean) => css`
  padding: ${SPACING.sm} ${SPACING.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.bold};
  color: ${COLORS.TEXT_MUTED};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: ${SPACING.sm};
  margin-bottom: ${SPACING.xs};
  white-space: nowrap;
  opacity: ${collapsed ? 0 : 1};
  transition: opacity ${TRANSITIONS.FAST};
  height: ${collapsed ? 0 : 'auto'};
  overflow: hidden;
`;

export const item = (isActive: boolean, collapsed: boolean, disabled: boolean) => css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${SPACING.sm} ${SPACING.md};
  margin-bottom: 2px;
  border-radius: ${RADIUS.md};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  text-decoration: none;
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  background-color: ${isActive ? COLORS.PRIMARY_LIGHT + '20' : 'transparent'};
  transition: all ${TRANSITIONS.FAST};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${isActive ? TYPOGRAPHY.FONT_WEIGHT.medium : TYPOGRAPHY.FONT_WEIGHT.normal};
  opacity: ${disabled ? 0.5 : 1};
  position: relative;

  &:hover {
    background-color: ${isActive ? COLORS.PRIMARY_LIGHT + '30' : COLORS.NEUTRAL_HOVER};
    color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY};
  }

  ${collapsed && css`
    justify-content: center;
    padding: ${SPACING.sm};
  `}
`;

export const itemIcon = (collapsed: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: ${collapsed ? 0 : SPACING.md};
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const itemLabel = (collapsed: boolean) => css`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${collapsed ? 0 : 1};
  width: ${collapsed ? 0 : 'auto'};
  transition: opacity ${TRANSITIONS.FAST}, width ${TRANSITIONS.FAST};
`;

export const badge = css`
  background-color: ${COLORS.DANGER};
  color: ${COLORS.WHITE};
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: ${RADIUS.full};
  margin-left: auto;
`;

export const collapseButton = css`
  position: absolute;
  right: -12px;
  top: 24px;
  width: 24px;
  height: 24px;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: ${COLORS.TEXT_SECONDARY};
  box-shadow: ${SHADOWS.sm};
  transition: all ${TRANSITIONS.FAST};

  &:hover {
    color: ${COLORS.PRIMARY};
    border-color: ${COLORS.PRIMARY};
  }
`;