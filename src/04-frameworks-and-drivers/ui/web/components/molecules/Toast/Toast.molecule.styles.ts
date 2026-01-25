import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS, TRANSITIONS } from '../../atoms/00-core/tokens-constants';

const hide = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(calc(100% + 32px)); }
  to { transform: translateX(0); }
`;

const swipeOut = keyframes`
  from { transform: translateX(var(--radix-toast-swipe-end-x)); }
  to { transform: translateX(calc(100% + 32px)); }
`;

export const viewportStyles = css`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2000;
  outline: none;
`;

export const getRootStyles = (variant: 'success' | 'error' | 'info' | 'warning' | 'default' = 'default') => css`
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.md};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  box-shadow: ${SHADOWS.lg};
  padding: 16px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 16px;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all ${TRANSITIONS.fast};

  /* Decorative left border strip */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${
      variant === 'success' ? COLORS.SUCCESS :
      variant === 'error' ? COLORS.DANGER :
      variant === 'warning' ? COLORS.WARNING :
      variant === 'info' ? COLORS.INFO :
      COLORS.PRIMARY
    };
  }

  &[data-state='open'] { animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1); }
  &[data-state='closed'] { animation: ${hide} 100ms ease-in; }
  &[data-swipe='move'] { transform: translateX(var(--radix-toast-swipe-move-x)); }
  &[data-swipe='cancel'] { transform: translateX(0); transition: transform 200ms ease-out; }
  &[data-swipe='end'] { animation: ${swipeOut} 100ms ease-out; }
`;