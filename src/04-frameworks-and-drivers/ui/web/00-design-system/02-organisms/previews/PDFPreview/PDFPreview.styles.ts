// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/PDFPreview/PDFPreview.styles.ts
import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  TRANSITIONS,
  TYPOGRAPHY
} from '../../../../03-ui-shared/constants/tokens-constants';

export const container = css`
  position: relative;
  background-color: ${COLORS.BACKGROUND_NEUTRAL};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.xs} ${SPACING.md};
  background-color: ${COLORS.BACKGROUND_PAPER};
  border-bottom: 1px solid ${COLORS.NEUTRAL_BORDER};
  min-height: 40px;
`;

export const title = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  color: ${COLORS.TEXT_PRIMARY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

export const actions = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
`;

export const actionButton = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${RADIUS.sm};
  color: ${COLORS.TEXT_SECONDARY};
  cursor: pointer;
  transition: all ${TRANSITIONS.FAST};

  &:hover {
    background-color: ${COLORS.NEUTRAL_HOVER};
    color: ${COLORS.PRIMARY};
  }
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
  }
`;

export const content = css`
  position: relative;
  flex: 1;
  background-color: ${COLORS.NEUTRAL_LIGHT};
`;

export const iframe = (isLoading: boolean) => css`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  opacity: ${isLoading ? 0 : 1};
  transition: opacity ${TRANSITIONS.NORMAL};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const loader = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.BACKGROUND_NEUTRAL};
  z-index: 1;
`;

export const spinner = css`
  width: 32px;
  height: 32px;
  border: 3px solid ${COLORS.NEUTRAL_BORDER};
  border-top-color: ${COLORS.PRIMARY};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const errorState = css`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.md};
  background-color: ${COLORS.BACKGROUND_PAPER};
  color: ${COLORS.TEXT_SECONDARY};
  padding: ${SPACING.lg};
  text-align: center;
`;