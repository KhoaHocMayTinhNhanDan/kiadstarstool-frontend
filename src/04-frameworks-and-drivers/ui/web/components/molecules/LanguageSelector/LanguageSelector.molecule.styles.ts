import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, TRANSITIONS } from '../../atoms/00-core/tokens-constants';

export const getSelectStyles = () => css`
  padding: 6px ${SPACING.md} 6px ${SPACING.sm};
  border-radius: ${RADIUS.md};
  border: 1px solid ${COLORS.NEUTRAL_RING};
  background-color: ${COLORS.WHITE};
  color: ${COLORS.TEXT};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all ${TRANSITIONS.fast};
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:hover {
    border-color: ${COLORS.PRIMARY};
    background-color: ${COLORS.NEUTRAL_LIGHT};
  }

  &:focus {
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 2px ${COLORS.PRIMARY_LIGHT};
  }
`;