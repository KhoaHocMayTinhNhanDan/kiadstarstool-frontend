import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, TRANSITIONS } from '../00-core/tokens-constants';
import { type TextareaSize } from './Textarea';

const SIZES = {
  sm: { padding: '8px 12px', fontSize: '14px' },
  md: { padding: '12px 16px', fontSize: '16px' },
  lg: { padding: '16px 20px', fontSize: '18px' },
};

export const getTextareaWrapperStyles = (fullWidth: boolean) => css`
  display: flex;
  flex-direction: column;
  width: ${fullWidth ? '100%' : 'auto'};
`;

export const getTextareaStyles = (size: TextareaSize, error: boolean, resize: 'none' | 'vertical' | 'horizontal' | 'both') => {
  const sizeConfig = SIZES[size];

  return css`
    width: 100%;
    min-height: 80px;
    padding: ${sizeConfig.padding};
    
    font-family: inherit;
    font-size: ${sizeConfig.fontSize};
    color: ${COLORS.TEXT};
    background-color: ${COLORS.WHITE};
    
    border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_RING};
    border-radius: ${RADIUS.md};
    
    outline: none;
    transition: border-color ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast};
    resize: ${resize};

    &::placeholder {
      color: ${COLORS.SECONDARY};
      opacity: 0.7;
    }

    &:hover:not(:disabled) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
    }

    &:focus:not(:disabled) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
      box-shadow: 0 0 0 3px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
    }

    &:disabled {
      background-color: ${COLORS.NEUTRAL_LIGHT};
      color: ${COLORS.SECONDARY};
      cursor: not-allowed;
      border-color: ${COLORS.NEUTRAL_RING};
    }
  `;
};

export const getErrorMessageStyles = () => css`
  margin-top: ${SPACING.xs};
  color: ${COLORS.DANGER};
  font-size: 12px;
`;