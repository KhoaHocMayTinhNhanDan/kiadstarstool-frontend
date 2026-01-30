import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, SPACING, SHADOWS, Z_INDEX, FONT_SIZES, FONT_WEIGHTS } from '../../atoms/00-core/tokens-constants';
import type { ModalSize } from './Modal.types';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const overlay = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: ${Z_INDEX.modal};
  animation: ${fadeIn} 0.2s ease-out;
`;

const sizeMap: Record<ModalSize, string> = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  full: '98vw',
};

export const content = (size: ModalSize) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${sizeMap[size]};
  max-height: 85vh;
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.lg};
  box-shadow: ${SHADOWS.xl};
  z-index: ${Z_INDEX.modal + 1};
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  outline: none;
`;

export const header = css`
  padding: ${SPACING.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
`;

export const title = css`
  margin: 0;
  font-size: ${FONT_SIZES.lg};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.TEXT};
`;

export const closeButton = css`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${RADIUS.full};
  color: ${COLORS.SECONDARY};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.LIGHT};
    color: ${COLORS.TEXT};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${COLORS.PRIMARY_LIGHT};
  }
`;

export const body = css`
  padding: ${SPACING.lg};
  overflow-y: auto;
  flex: 1;
`;

export const footer = css`
  padding: ${SPACING.md} ${SPACING.lg};
  background-color: ${COLORS.LIGHT};
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.md};
  border-bottom-left-radius: ${RADIUS.lg};
  border-bottom-right-radius: ${RADIUS.lg};
`;