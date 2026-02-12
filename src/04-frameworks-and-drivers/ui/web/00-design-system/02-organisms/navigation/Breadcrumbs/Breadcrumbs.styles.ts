// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Breadcrumbs/Breadcrumbs.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
  RADIUS
} from '../../../00-atoms/00-core/tokens-constants';

export const nav = css`
  display: flex;
  align-items: center;
  font-family: inherit || 'sans-serif'};
`;

export const list = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: ${SPACING.xs};
`;

export const listItem = css`
  display: inline-flex;
  align-items: center;
`;

export const itemContent = (isLast: boolean, isInteractive: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  text-decoration: none;
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  line-height: ${TYPOGRAPHY.LINE_HEIGHT.NORMAL};
  color: ${isLast ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY};
  font-weight: ${isLast ? TYPOGRAPHY.FONT_WEIGHT.medium : TYPOGRAPHY.FONT_WEIGHT.normal};
  cursor: ${isInteractive ? 'pointer' : 'default'};
  transition: color ${TRANSITIONS.FAST};
  padding: 2px 4px;
  border-radius: ${RADIUS.sm};

  ${isInteractive && css`
    &:hover {
      color: ${COLORS.PRIMARY};
      background-color: ${COLORS.NEUTRAL_HOVER};
    }
  `}
`;

export const separator = css`
  display: flex;
  align-items: center;
  color: ${COLORS.TEXT_MUTED};
  margin: 0 2px;
  user-select: none;
`;

export const ellipsisButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.TEXT_SECONDARY};
  width: 24px;
  height: 24px;
`;