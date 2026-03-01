import { css } from '@emotion/react';
import type { ToastVariant } from './Toast.types';

export const container = (variant: ToastVariant) => {
  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
    error: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
  };

  const color = colors[variant];

  return css`
    display: flex;
    align-items: flex-start;
    padding: 16px;
    background-color: ${color.bg};
    border: 1px solid ${color.border};
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    min-width: 300px;
    max-width: 400px;
    color: ${color.text};
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
};

export const content = css`
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
`;

export const title = css`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const description = css`
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`;

export const closeButton = css`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin: -4px -4px 0 0;
  opacity: 0.5;
  transition: opacity 0.2s;
  color: currentColor;

  &:hover {
    opacity: 1;
  }
`;