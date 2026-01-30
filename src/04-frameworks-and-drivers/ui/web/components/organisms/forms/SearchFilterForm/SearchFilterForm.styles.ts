import { css } from '@emotion/react';
import { SPACING, COLORS, RADIUS, TRANSITIONS } from '../../../atoms/00-core/tokens-constants';

export const container = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
  width: 100%;
`;

export const searchBarWrapper = css`
  display: flex;
  gap: ${SPACING.sm};
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const searchInputContainer = css`
  flex: 1;
  position: relative;
`;

export const filtersContainer = (isOpen: boolean) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${SPACING.md};
  padding: ${isOpen ? SPACING.md : 0};
  background-color: ${COLORS.LIGHT};
  border-radius: ${RADIUS.md};
  border: ${isOpen ? `1px solid ${COLORS.NEUTRAL_LIGHT}` : 'none'};
  
  max-height: ${isOpen ? '500px' : '0'};
  opacity: ${isOpen ? 1 : 0};
  overflow: hidden;
  transition: all ${TRANSITIONS.normal};
`;

export const activeFiltersWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.xs};
  align-items: center;
  min-height: 32px;
`;

export const clearAllButton = css`
  font-size: 12px;
  color: ${COLORS.DANGER};
  cursor: pointer;
  margin-left: auto;
`;