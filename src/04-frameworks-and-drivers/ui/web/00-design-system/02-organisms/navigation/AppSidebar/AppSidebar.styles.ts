/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { COLORS, SPACING, SHADOWS, TRANSITIONS, RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../../../01-ui-core/constants/tokens-constants';

export const container = (
  collapsed: boolean, 
  width?: number | string, 
  collapsedWidth?: number | string,
  variant: 'sidebar' | 'drawer' = 'sidebar',
  isOpen: boolean = true
) => css`
  width: ${collapsed 
    ? (collapsedWidth || '72px') 
    : (width || '260px')};
  height: 100vh;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border-right: 1px solid ${COLORS.NEUTRAL_BORDER};
  display: flex;
  flex-direction: column;
  
  /* Logic chuyển đổi giữa Sticky (Desktop) và Fixed (Mobile) */
  position: ${variant === 'drawer' ? 'fixed' : 'sticky'};
  top: 0;
  left: 0;
  z-index: 100;

  /* Animation cho Mobile Drawer */
  ${variant === 'drawer' && css`
    z-index: 1200; /* Cao hơn header */
    transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${SHADOWS.xl};
    transition: transform ${TRANSITIONS.NORMAL};
  `}

  /* Animation cho Desktop Sidebar */
  ${variant === 'sidebar' && css`
    transition: width ${TRANSITIONS.NORMAL}, background-color ${TRANSITIONS.NORMAL}, border-color ${TRANSITIONS.NORMAL};
  `}
`;

export const header = css`
  padding: ${SPACING.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
`;

export const collapseButton = css`
  position: absolute;
  right: -12px;
  top: 72px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  color: ${COLORS.SECONDARY};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  transition: all ${TRANSITIONS.FAST};
  box-shadow: ${SHADOWS.sm};
  
  &:hover {
    background-color: ${COLORS.PRIMARY};
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

export const content = css`
  flex: 1;
  overflow-y: auto;
  padding: ${SPACING.md} ${SPACING.xs};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export const groupLabel = (collapsed: boolean) => css`
  padding: ${collapsed 
    ? `${SPACING.md} 0 ${SPACING.xs} 0` 
    : `${SPACING.md} ${SPACING.md} ${SPACING.xs} ${SPACING.md}`};
  font-size: ${FONT_SIZES.xs};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.SECONDARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: ${collapsed ? 'center' : 'left'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const item = (
  isActive: boolean, 
  collapsed: boolean, 
  disabled: boolean,
  borderRadius?: string
) => css`
  display: flex;
  align-items: center;
  padding: ${collapsed ? `${SPACING.sm} 0` : `${SPACING.xs} ${SPACING.md}`};
  margin: 2px 0;
  border-radius: ${borderRadius || RADIUS.md};
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY};
  background-color: ${isActive ? COLORS.PRIMARY_LIGHT : 'transparent'};
  font-weight: ${isActive ? FONT_WEIGHTS.medium : FONT_WEIGHTS.normal};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.5 : 1};
  text-decoration: none;
  transition: all ${TRANSITIONS.FAST};
  position: relative;

  &:hover {
    background-color: ${!disabled && !isActive ? COLORS.NEUTRAL_LIGHT : ''};
    color: ${!disabled && !isActive ? COLORS.PRIMARY : ''};
  }

  ${collapsed && css`
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const itemIcon = (collapsed: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${!collapsed && `margin-right: ${SPACING.sm};`}
  font-size: 20px;
`;

export const itemLabel = (collapsed: boolean) => css`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${FONT_SIZES.sm};
  ${collapsed && 'display: none;'}
`;

export const badge = css`
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: ${FONT_WEIGHTS.bold};
  background-color: ${COLORS.DANGER};
  color: ${COLORS.WHITE};
  margin-left: ${SPACING.xs};
  min-width: 20px;
  text-align: center;
`;

export const footer = css`
  padding: ${SPACING.md};
  border-top: 1px solid ${COLORS.NEUTRAL_BORDER};
`;

export const overlay = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  opacity: ${isOpen ? 1 : 0};
  visibility: ${isOpen ? 'visible' : 'hidden'};
  transition: opacity ${TRANSITIONS.NORMAL}, visibility ${TRANSITIONS.NORMAL};
`;