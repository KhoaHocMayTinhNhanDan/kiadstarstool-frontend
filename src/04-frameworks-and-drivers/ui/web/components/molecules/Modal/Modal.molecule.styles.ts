import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS, Z_INDEX } from '../../atoms/00-core/tokens-constants';

const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const overlayStyles = css`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: ${Z_INDEX.modal};
  backdrop-filter: blur(2px);
`;

export const contentStyles = css`
  background-color: white;
  border-radius: ${RADIUS.lg};
  box-shadow: ${SHADOWS.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 24px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: ${Z_INDEX.modal + 1};
  overflow-y: auto;
  
  &:focus { outline: none; }
`;

export const closeButtonStyles = css`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${COLORS.SECONDARY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: ${RADIUS.full};
  transition: background-color 0.2s;

  &:hover { 
    color: ${COLORS.TEXT}; 
    background-color: ${COLORS.NEUTRAL_LIGHT};
  }
`;