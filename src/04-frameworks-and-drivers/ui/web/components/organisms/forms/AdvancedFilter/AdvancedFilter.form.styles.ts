// src/04-frameworks-and-drivers/ui/web/components/organisms/forms/AdvancedFilter/AdvancedFilter.form.styles.ts
import { css, type CSSObject } from '@emotion/react';
import { SPACING, COLORS, RADIUS, SHADOWS, FONT_SIZES, TRANSITIONS } from '../../../atoms/00-core/tokens-constants';
import type { FilterType } from './AdvancedFilter.form.types';

export const container = css`
  background-color: ${COLORS.WHITE};
  padding: ${SPACING.lg};
  border-radius: ${RADIUS.md};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  box-shadow: ${SHADOWS.sm};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

export const grid = css`
  display: grid;
  grid-template-columns: 1fr; /* Mobile default: 1 column */
  gap: ${SPACING.md};
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr); /* Tablet/Desktop: 12 columns */
  }
`;

export const gridItem = (type: FilterType): CSSObject => {
  return {
    gridColumn: '1 / -1', // Mobile: full width
    '@media (min-width: 768px)': {
      gridColumn: type === 'text' ? 'span 6' : 
                  type === 'checkbox' ? '1 / -1' : 
                  'span 4',
    },
    '@media (min-width: 1024px)': {
      gridColumn: type === 'text' ? 'span 6' : 
                  type === 'checkbox' ? '1 / -1' : 
                  'span 3',
    }
  };
};

export const actions = css`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.sm};
  margin-top: ${SPACING.sm};
  padding-top: ${SPACING.md};
  border-top: 1px solid ${COLORS.LIGHT};
`;

export const select = css`
  width: 100%;
  height: 40px;
  padding: 0 ${SPACING.md};
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.TEXT};
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.md};
  outline: none;
  transition: all ${TRANSITIONS.fast};

  &:focus {
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 2px ${COLORS.PRIMARY_LIGHT}40;
  }
`;