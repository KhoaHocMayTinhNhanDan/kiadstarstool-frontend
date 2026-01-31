import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, FONT_SIZES, TRANSITIONS } from '../00-core/tokens-constants';
import type { SelectProps } from './Select.types';

const heightMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const fontSizeMap = {
  sm: '0.875rem',  // 14px
  md: '1rem',  // 16px
  lg: '1.125rem',     // 18px
};

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const selectWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

interface SelectStyleProps {
  error?: boolean | string;
  disabled?: boolean;
  size?: SelectProps['size'];
}

export const getSelectStyles = ({ error, disabled, size = 'md' }: SelectStyleProps) => css`
  appearance: none;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  height: ${heightMap[size]};
  padding: 0 ${SPACING.xl} 0 ${SPACING.md}; /* Extra padding-right for arrow */
  
  font-size: ${fontSizeMap[size] || '0.875rem'};
  color: ${COLORS.TEXT};
  background-color: ${COLORS.WHITE};
  
  border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.md};
  
  transition: all ${TRANSITIONS.fast};
  outline: none;
  cursor: pointer;
  
  /* Custom Arrow */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${SPACING.sm} center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;

  &:hover:not(:disabled) {
    border-color: ${error ? COLORS.DANGER_DARK : COLORS.PRIMARY_LIGHT};
  }

  &:focus:not(:disabled) {
    border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
    box-shadow: 0 0 0 2px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
  }

  ${disabled && css`
    background-color: ${COLORS.LIGHT};
    color: ${COLORS.SECONDARY};
    cursor: not-allowed;
    border-color: ${COLORS.NEUTRAL_LIGHT};
  `}
`;

export const labelStyles = css`
  font-size: ${FONT_SIZES.sm};
  font-weight: 500;
  color: ${COLORS.TEXT};
`;

export const errorTextStyles = css`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
  margin-top: 2px;
`;