// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/CodePreview/CodePreview.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  TRANSITIONS
} from '../../../../03-ui-shared/constants/tokens-constants';

export const container = css`
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  background-color: ${COLORS.BACKGROUND_NEUTRAL};
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
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.bold};
  color: ${COLORS.TEXT_SECONDARY};
  font-family: monospace;
`;

export const languageBadge = css`
  font-size: 10px;
  text-transform: uppercase;
  color: ${COLORS.TEXT_MUTED};
  background-color: ${COLORS.NEUTRAL_LIGHT};
  padding: 2px 6px;
  border-radius: ${RADIUS.sm};
  margin-right: ${SPACING.sm};
`;

export const content = (maxHeight?: string | number) => css`
  position: relative;
  overflow: auto;
  padding: ${SPACING.md};
  max-height: ${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight};
  background-color: #1e1e1e; /* Dark background for code */
  color: #d4d4d4;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #424242;
    border-radius: 4px;
  }
`;

export const pre = css`
  margin: 0;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  line-height: 1.5;
  tab-size: 2;
`;

export const code = css`
  display: block;
  width: 100%;
`;

export const lineNumbers = css`
  position: absolute;
  left: 0;
  top: ${SPACING.md};
  bottom: ${SPACING.md};
  width: 32px;
  text-align: right;
  padding-right: ${SPACING.sm};
  color: #858585;
  user-select: none;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  line-height: 1.5;
`;

export const codeWithLines = css`
  padding-left: 40px; /* Space for line numbers */
`;

export const copyButton = css`
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
`;