// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input.styles.ts
import styled, { css } from 'styled-components';
import type { InputSize, InputVariant, InputRadius, InputState } from './Input.types';

// ===== TYPE DEFINITIONS =====
interface InputWrapperProps {
  $state: InputState;
  $disabled: boolean;
  $fullWidth: boolean;
}

interface InputContainerProps extends InputWrapperProps {
  $variant: InputVariant;
  $size: InputSize;
  $radius: InputRadius;
  $hasLeftElement: boolean;
  $hasRightElement: boolean;
  $isTextarea: boolean;
}

interface InputElementProps {
  $size: InputSize;
  $variant: InputVariant;
  $state: InputState;
  $hasLeftElement: boolean;
  $hasRightElement: boolean;
  $isTextarea: boolean;
}

// ===== BASE STYLES =====
const baseWrapperStyles = css<InputWrapperProps>`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => props.$disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

// ===== SIZE VARIANTS =====
const sizeStyles = {
  xs: css`
    height: 28px;
    padding: 0 10px;
    font-size: 12px;
    
    textarea& {
      padding: 6px 10px;
      min-height: 28px;
    }
  `,
  sm: css`
    height: 32px;
    padding: 0 12px;
    font-size: 13px;
    
    textarea& {
      padding: 8px 12px;
      min-height: 32px;
    }
  `,
  md: css`
    height: 40px;
    padding: 0 14px;
    font-size: 14px;
    
    textarea& {
      padding: 10px 14px;
      min-height: 40px;
    }
  `,
  lg: css`
    height: 48px;
    padding: 0 16px;
    font-size: 15px;
    
    textarea& {
      padding: 12px 16px;
      min-height: 48px;
    }
  `,
  xl: css`
    height: 56px;
    padding: 0 18px;
    font-size: 16px;
    
    textarea& {
      padding: 14px 18px;
      min-height: 56px;
    }
  `
};

// ===== RADIUS VARIANTS =====
const radiusStyles = {
  none: css` border-radius: 0; `,
  sm: css` border-radius: 4px; `,
  md: css` border-radius: 6px; `,
  lg: css` border-radius: 8px; `,
  full: css` border-radius: 9999px; `
};

// ===== VARIANT STYLES =====
const variantStyles = {
  default: css<{ $state: InputState }>`
    background-color: white;
    border: 1px solid ${props => {
      switch (props.$state) {
        case 'error': return '#ef4444';
        case 'success': return '#10b981';
        case 'focused': return '#3b82f6';
        default: return '#d1d5db';
      }
    }};
    color: #111827;
    
    &:hover:not(:disabled):not(:read-only) {
      border-color: ${props => {
        switch (props.$state) {
          case 'error': return '#dc2626';
          case 'success': return '#059669';
          default: return '#9ca3af';
        }
      }};
    }
    
    &:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `,
  
  filled: css<{ $state: InputState }>`
    background-color: ${props => {
      switch (props.$state) {
        case 'error': return '#fee2e2';
        case 'success': return '#d1fae5';
        case 'disabled': return '#f3f4f6';
        default: return '#f9fafb';
      }
    }};
    border: 1px solid transparent;
    color: #111827;
    
    &:hover:not(:disabled):not(:read-only) {
      background-color: ${props => {
        switch (props.$state) {
          case 'error': return '#fecaca';
          case 'success': return '#a7f3d0';
          default: return '#f3f4f6';
        }
      }};
    }
    
    &:focus-within {
      background-color: white;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `,
  
  outline: css<{ $state: InputState }>`
    background-color: transparent;
    border: 2px solid ${props => {
      switch (props.$state) {
        case 'error': return '#ef4444';
        case 'success': return '#10b981';
        case 'focused': return '#3b82f6';
        default: return '#d1d5db';
      }
    }};
    color: #111827;
    
    &:hover:not(:disabled):not(:read-only) {
      border-color: ${props => {
        switch (props.$state) {
          case 'error': return '#dc2626';
          case 'success': return '#059669';
          default: return '#9ca3af';
        }
      }};
    }
    
    &:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `,
  
  flushed: css<{ $state: InputState }>`
    background-color: transparent;
    border: none;
    border-bottom: 2px solid ${props => {
      switch (props.$state) {
        case 'error': return '#ef4444';
        case 'success': return '#10b981';
        case 'focused': return '#3b82f6';
        default: return '#d1d5db';
      }
    }};
    color: #111827;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    
    &:hover:not(:disabled):not(:read-only) {
      border-color: ${props => {
        switch (props.$state) {
          case 'error': return '#dc2626';
          case 'success': return '#059669';
          default: return '#9ca3af';
        }
      }};
    }
    
    &:focus-within {
      border-color: #3b82f6;
      box-shadow: none;
    }
  `,
  
  unstyled: css`
    background-color: transparent;
    border: none;
    color: #111827;
    padding: 0;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  `
};

// ===== COMPONENTS =====
export const InputWrapper = styled.div<InputWrapperProps>`
  ${baseWrapperStyles}
`;

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  display: flex;
  align-items: ${props => props.$isTextarea ? 'stretch' : 'center'};
  width: 100%;
  transition: all 0.2s ease;
  
  ${props => variantStyles[props.$variant]}
  ${props => props.$variant !== 'flushed' && props.$variant !== 'unstyled' && radiusStyles[props.$radius]}
  
  ${props => props.$disabled && css`
    cursor: not-allowed;
    
    & > * {
      cursor: not-allowed;
    }
  `}
`;

export const StyledInput = styled.input<InputElementProps>`
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  outline: none;
  padding: 0;
  
  ${props => sizeStyles[props.$size]}
  ${props => props.$hasLeftElement && css` padding-left: 8px; `}
  ${props => props.$hasRightElement && css` padding-right: 8px; `}
  
  &::placeholder {
    color: #9ca3af;
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:read-only {
    cursor: default;
  }
  
  /* Remove number input spinner */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type='number'] {
    -moz-appearance: textfield;
  }
  
  /* Remove search input clear button */
  &[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const StyledTextarea = styled.textarea<InputElementProps>`
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  outline: none;
  padding: 0;
  resize: ${props => props.$isTextarea ? 'vertical' : 'none'};
  min-height: ${props => {
    switch (props.$size) {
      case 'xs': return '28px';
      case 'sm': return '32px';
      case 'md': return '40px';
      case 'lg': return '48px';
      case 'xl': return '56px';
      default: return '40px';
    }
  }};
  
  ${props => sizeStyles[props.$size]}
  ${props => props.$hasLeftElement && css` padding-left: 8px; `}
  ${props => props.$hasRightElement && css` padding-right: 8px; `}
  
  &::placeholder {
    color: #9ca3af;
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:read-only {
    cursor: default;
  }
`;

export const LeftElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
  color: #6b7280;
  flex-shrink: 0;
`;

export const RightElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 12px;
  color: #6b7280;
  flex-shrink: 0;
`;

export const Label = styled.label<{ $required: boolean; $disabled: boolean }>`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$disabled ? '#9ca3af' : '#374151'};
  margin-bottom: 2px;
  
  &::after {
    content: ${props => props.$required ? "'*'" : "''"};
    color: #ef4444;
    margin-left: 2px;
  }
`;

export const HelperText = styled.div<{ $type: 'description' | 'error' | 'success' }>`
  font-size: 12px;
  line-height: 1.4;
  color: ${props => {
    switch (props.$type) {
      case 'error': return '#ef4444';
      case 'success': return '#10b981';
      default: return '#6b7280';
    }
  }};
  margin-top: 2px;
`;

export const CharacterCount = styled.div<{ $exceeded: boolean }>`
  font-size: 12px;
  color: ${props => props.$exceeded ? '#ef4444' : '#6b7280'};
  text-align: right;
  margin-top: 2px;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;