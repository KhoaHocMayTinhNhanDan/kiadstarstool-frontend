// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/FilePreview/FilePreview.styles.ts
import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
  RADIUS,
  SHADOWS
} from '../../../../01-ui-core/constants/tokens-constants';
import type { FilePreviewVariant } from './FilePreview.types';

export const container = (variant: FilePreviewVariant, error: boolean) => css`
  position: relative;
  display: flex;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  overflow: hidden;
  transition: all ${TRANSITIONS.FAST};

  ${variant === 'card' && css`
    flex-direction: column;
    width: 200px;
  `}

  ${variant === 'list' && css`
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: ${SPACING.sm};
    gap: ${SPACING.md};
  `}

  ${variant === 'minimal' && css`
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: ${SPACING.xs} ${SPACING.sm};
    gap: ${SPACING.sm};
    border: none;
    background-color: ${COLORS.NEUTRAL_LIGHT};
  `}

  &:hover {
    border-color: ${error ? COLORS.DANGER_DARK : COLORS.PRIMARY};
    box-shadow: ${SHADOWS.sm};
  }
`;

export const previewArea = (variant: FilePreviewVariant, hasImage: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.NEUTRAL_LIGHT};
  overflow: hidden;
  flex-shrink: 0;

  ${variant === 'card' && css`
    width: 100%;
    height: 140px;
    border-bottom: 1px solid ${COLORS.NEUTRAL_BORDER};
  `}

  ${variant === 'list' && css`
    width: 48px;
    height: 48px;
    border-radius: ${RADIUS.sm};
  `}

  ${variant === 'minimal' && css`
    width: 24px;
    height: 24px;
    border-radius: ${RADIUS.xs};
    background-color: transparent;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

export const infoArea = (variant: FilePreviewVariant) => css`
  flex: 1;
  min-width: 0; /* Text truncation fix */
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${variant === 'card' && css`
    padding: ${SPACING.sm};
  `}
`;

export const fileName = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  color: ${COLORS.TEXT_PRIMARY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const fileSize = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.TEXT_SECONDARY};
  margin-top: 2px;
`;

export const actions = (variant: FilePreviewVariant) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};

  ${variant === 'card' && css`
    position: absolute;
    top: ${SPACING.xs};
    right: ${SPACING.xs};
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: ${RADIUS.sm};
    padding: 2px;
    opacity: 0;
    transition: opacity ${TRANSITIONS.FAST};

    ${container('card', false)}:hover & {
      opacity: 1;
    }
  `}
`;

export const actionButton = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
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

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const spinner = css`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.PRIMARY};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;