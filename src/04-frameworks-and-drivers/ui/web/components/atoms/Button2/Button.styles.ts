// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button.styles.ts
import styled, { css, keyframes } from 'styled-components';
import type { ButtonVariant, ButtonSize, ButtonRadius } from './Button.types';

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Base button styles
const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  position: relative;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  /* Loading state */
  &[data-loading="true"] {
    pointer-events: none;
    opacity: 0.8;
  }
`;

// Size variants
const sizeStyles = {
  xs: css`
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
    gap: 6px;
    
    svg {
      width: 12px;
      height: 12px;
    }
  `,
  sm: css`
    height: 32px;
    padding: 0 14px;
    font-size: 13px;
    gap: 6px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  `,
  md: css`
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
    gap: 8px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  lg: css`
    height: 48px;
    padding: 0 20px;
    font-size: 15px;
    gap: 8px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  `,
  xl: css`
    height: 56px;
    padding: 0 24px;
    font-size: 16px;
    gap: 10px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  `
};

// Radius variants
const radiusStyles = {
  none: css` border-radius: 0; `,
  sm: css` border-radius: 4px; `,
  md: css` border-radius: 6px; `,
  lg: css` border-radius: 8px; `,
  full: css` border-radius: 9999px; `
};

// Color variants
const variantStyles = {
  primary: css`
    background-color: #3b82f6;
    color: white;
    border: 1px solid #3b82f6;
    
    &:hover:not(:disabled) {
      background-color: #2563eb;
      border-color: #2563eb;
    }
    
    &:active:not(:disabled) {
      background-color: #1d4ed8;
      border-color: #1d4ed8;
    }
  `,
  
  secondary: css`
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    
    &:hover:not(:disabled) {
      background-color: #e2e8f0;
      border-color: #cbd5e1;
    }
    
    &:active:not(:disabled) {
      background-color: #cbd5e1;
      border-color: #94a3b8;
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: #3b82f6;
    border: 1px solid #cbd5e1;
    
    &:hover:not(:disabled) {
      background-color: #f8fafc;
      border-color: #94a3b8;
    }
    
    &:active:not(:disabled) {
      background-color: #f1f5f9;
      border-color: #64748b;
    }
  `,
  
  danger: css`
    background-color: #ef4444;
    color: white;
    border: 1px solid #ef4444;
    
    &:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
    }
    
    &:active:not(:disabled) {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  `,
  
  success: css`
    background-color: #10b981;
    color: white;
    border: 1px solid #10b981;
    
    &:hover:not(:disabled) {
      background-color: #059669;
      border-color: #059669;
    }
    
    &:active:not(:disabled) {
      background-color: #047857;
      border-color: #047857;
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: #64748b;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: #f8fafc;
      color: #475569;
    }
    
    &:active:not(:disabled) {
      background-color: #f1f5f9;
    }
  `
};

// Loading spinner
const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 0.8s linear infinite;
`;

// Full width
const fullWidthStyles = css`
  width: 100%;
`;

// Styled button component
export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $radius: ButtonRadius;
  $fullWidth: boolean;
}>`
  ${baseStyles}
  ${props => variantStyles[props.$variant]}
  ${props => sizeStyles[props.$size]}
  ${props => radiusStyles[props.$radius]}
  ${props => props.$fullWidth && fullWidthStyles}
  
  /* Smooth transition for all states */
  transition-property: background-color, border-color, color, transform, opacity;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Subtle press effect */
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

// Export loading spinner for use in Button.tsx
export { LoadingSpinner };