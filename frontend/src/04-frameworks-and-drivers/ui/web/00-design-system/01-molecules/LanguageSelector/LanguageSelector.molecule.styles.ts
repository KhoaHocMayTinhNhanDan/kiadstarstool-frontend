// src/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/LanguageSelector/LanguageSelector.molecule.styles.ts
import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, SHADOWS, TRANSITIONS, FONT_SIZES, FONT_WEIGHTS } from '../../../01-ui-core/constants/tokens-constants';

export const container = css`
  position: relative;
  display: inline-block;
`;

export const trigger = (isOpen: boolean, variant: string) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  padding: ${variant === 'icon-only' ? SPACING.xs : `${SPACING.xs} ${SPACING.sm}`};
  background-color: transparent;
  border: 1px solid ${isOpen ? COLORS.PRIMARY : COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  cursor: pointer;
  transition: all ${TRANSITIONS.FAST};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.medium};
  min-height: 36px;

  &:hover {
    background-color: ${COLORS.NEUTRAL_LIGHT};
    border-color: ${COLORS.NEUTRAL_DARK};
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

export const dropdown = (isOpen: boolean, align: 'left' | 'right') => css`
  position: absolute;
  top: calc(100% + ${SPACING.xs});
  /* Logic căn lề: 
     - align='right' (default): Căn phải, mở sang trái (right: 0)
     - align='left': Căn trái, mở sang phải (left: 0) 
  */
  ${align === 'right' ? 'right: 0; left: auto;' : 'left: 0; right: auto;'}
  min-width: 160px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOWS.md};
  padding: ${SPACING.xs};
  z-index: 1000;
  
  opacity: ${isOpen ? 1 : 0};
  visibility: ${isOpen ? 'visible' : 'hidden'};
  transform: translateY(${isOpen ? '0' : '-10px'});
  transform-origin: ${align === 'right' ? 'top right' : 'top left'};
  transition: all ${TRANSITIONS.FAST};
`;

export const option = (isActive: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${SPACING.sm} ${SPACING.md};
  border: none;
  background-color: ${isActive ? COLORS.PRIMARY_LIGHT : 'transparent'};
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${isActive ? FONT_WEIGHTS.medium : FONT_WEIGHTS.normal};
  text-align: left;
  cursor: pointer;
  border-radius: ${RADIUS.sm};
  transition: background-color ${TRANSITIONS.FAST};

  &:hover {
    background-color: ${isActive ? COLORS.PRIMARY_LIGHT : COLORS.NEUTRAL_LIGHT};
  }
`;

export const flag = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  margin-right: ${SPACING.xs};
`;