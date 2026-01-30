import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, FONT_SIZES, TRANSITIONS } from '../00-core/tokens-constants';
import type { TextareaProps } from './Textarea.types';

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const textareaWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

interface TextareaStyleProps {
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  resize?: TextareaProps['resize'];
}

export const getTextareaStyles = ({ error, disabled, readOnly, resize = 'vertical' }: TextareaStyleProps) => css`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  
  padding: ${SPACING.md};
  font-family: inherit;
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.TEXT};
  background-color: ${COLORS.WHITE};
  
  border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.md};
  
  outline: none;
  transition: all ${TRANSITIONS.fast};
  resize: ${resize};
  min-height: 80px;

  &::placeholder {
    color: ${COLORS.SECONDARY};
  }

  &:hover:not(:disabled):not(:read-only) {
    border-color: ${error ? COLORS.DANGER_DARK : COLORS.PRIMARY_LIGHT};
  }

  &:focus:not(:disabled):not(:read-only) {
    border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
    box-shadow: 0 0 0 2px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
  }

  &:disabled {
    background-color: ${COLORS.LIGHT};
    color: ${COLORS.SECONDARY};
    cursor: not-allowed;
    border-color: ${COLORS.NEUTRAL_LIGHT};
  }

  &:read-only {
    background-color: ${COLORS.NEUTRAL_LIGHT};
    cursor: default;
  }
`;

export const errorTextStyles = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;