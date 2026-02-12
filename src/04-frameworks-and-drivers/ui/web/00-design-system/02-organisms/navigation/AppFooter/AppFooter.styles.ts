// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppFooter/AppFooter.styles.ts
import { css } from '@emotion/react';
import {
  SPACING,
  COLORS,
  FONT_SIZES,
  TRANSITIONS,
  RADIUS
} from '../../../00-atoms/00-core/tokens-constants';

export const footer = css`
  background-color: ${COLORS.BACKGROUND_NEUTRAL};
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  padding: ${SPACING.lg} ${SPACING.xl};
  margin-top: auto; /* Đẩy footer xuống đáy trong flex container */
  color: ${COLORS.TEXT_MUTED};
  font-size: ${FONT_SIZES.sm};
  
  @media (max-width: 768px) {
    padding: ${SPACING.md} ${SPACING.lg};
  }
`;

export const container = css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${SPACING.md};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${SPACING.lg};
  }
`;

export const copyright = css`
  flex: 1;
  min-width: 200px;
  
  strong {
    color: ${COLORS.PRIMARY};
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const nav = css`
  display: flex;
  gap: ${SPACING.lg};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${SPACING.md};
    width: 100%;
    border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
    padding-top: ${SPACING.md};
  }
`;

export const link = css`
  color: ${COLORS.SECONDARY};
  text-decoration: none;
  cursor: pointer;
  transition: color ${TRANSITIONS.FAST};
  padding: ${SPACING.xs} ${SPACING.sm};
  border-radius: ${RADIUS.sm};
  
  &:hover {
    color: ${COLORS.PRIMARY};
    background-color: ${COLORS.BACKGROUND_SUBTLE};
  }
  
  &:focus {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

export const secondaryContent = css`
  margin-top: ${SPACING.lg};
  width: 100%;
  text-align: center;
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DISABLED};
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  padding-top: ${SPACING.md};
`;

export const linkIcon = css`
  margin-right: ${SPACING.xs};
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
`;