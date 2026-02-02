import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const overlay = (fullScreen: boolean) => css`
  position: ${fullScreen ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  animation: ${fadeIn} 0.2s ease-in-out;
  backdrop-filter: blur(2px);
`;

export const content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const text = css`
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  animation: ${fadeIn} 0.3s ease-in-out 0.1s;
  animation-fill-mode: both;
`;