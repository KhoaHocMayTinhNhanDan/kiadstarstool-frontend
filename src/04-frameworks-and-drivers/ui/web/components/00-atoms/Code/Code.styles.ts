import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, RADIUS, SPACING } from '../00-core/tokens-constants';

export const getCodeStyles = (block?: boolean) => css`
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  font-size: ${FONT_SIZES.sm};
  background-color: ${COLORS.LIGHT};
  border-radius: ${RADIUS.sm};
  color: ${COLORS.DANGER_DARK};

  ${block
    ? css`
        display: block;
        padding: ${SPACING.md};
        white-space: pre-wrap;
        overflow-x: auto;
      `
    : css`
        display: inline;
        padding: 2px ${SPACING.xs};
      `}
`;