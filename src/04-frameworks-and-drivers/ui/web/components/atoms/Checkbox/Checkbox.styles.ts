// src/04-frameworks-and-drivers/ui/web/components/atoms/Checkbox/Checkbox.styles.ts
import styled, { css } from 'styled-components';
import type { CheckboxSize, CheckboxVariant } from './Checkbox.types';

// ===== TYPE DEFINITIONS =====
interface VariantProps {
  $checked: boolean;
  $error: boolean;
  $success: boolean;
}

interface ContainerProps extends VariantProps {
  $size: CheckboxSize;
  $variant: CheckboxVariant;
  $indeterminate: boolean;
  $disabled: boolean;
}

interface WrapperProps {
  $disabled: boolean;
  $labelPosition: 'left' | 'right';
}

interface LabelProps {
  $required: boolean;
}

// ===== BASE STYLES =====
const baseWrapperStyles = css`
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  
  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// ===== SIZE VARIANTS =====
const sizeStyles = {
  sm: css`
    width: 16px;
    height: 16px;
  `,
  md: css`
    width: 20px;
    height: 20px;
  `,
  lg: css`
    width: 24px;
    height: 24px;
  `
};

// ===== VARIANT STYLES =====
const variantStyles = {
  default: css<VariantProps>`
    border: 2px solid ${props => {
      if (props.$error) return '#ef4444';
      if (props.$success) return '#10b981';
      if (props.$checked) return '#3b82f6';
      return '#d1d5db';
    }};
    background-color: ${props => props.$checked ? '#3b82f6' : 'white'};
    
    &:hover:not(:disabled) {
      border-color: ${props => {
        if (props.$error) return '#dc2626';
        if (props.$success) return '#059669';
        return '#93c5fd';
      }};
    }
  `,
  
  filled: css<VariantProps>`
    border: 2px solid transparent;
    background-color: ${props => {
      if (props.$error) return '#fee2e2';
      if (props.$success) return '#d1fae5';
      if (props.$checked) return '#3b82f6';
      return '#f3f4f6';
    }};
    
    &:hover:not(:disabled) {
      background-color: ${props => {
        if (props.$error) return '#fecaca';
        if (props.$success) return '#a7f3d0';
        return '#e5e7eb';
      }};
    }
  `,
  
  outline: css<VariantProps>`
    border: 2px solid ${props => {
      if (props.$error) return '#ef4444';
      if (props.$success) return '#10b981';
      if (props.$checked) return '#3b82f6';
      return '#d1d5db';
    }};
    background-color: transparent;
    
    &:hover:not(:disabled) {
      border-color: ${props => {
        if (props.$error) return '#dc2626';
        if (props.$success) return '#059669';
        return '#93c5fd';
      }};
    }
  `
};

// ===== COMPONENTS =====
export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

export const CheckboxContainer = styled.div<ContainerProps>`
  position: relative;
  flex-shrink: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => sizeStyles[props.$size]}
  ${props => variantStyles[props.$variant]}
  
  /* Focus styles for accessibility */
  input:focus-visible + & {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* Disabled state */
  ${props => props.$disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  /* Check/Indeterminate icon */
  &::after {
    content: '';
    display: ${props => (props.$checked || props.$indeterminate) ? 'block' : 'none'};
    position: absolute;
    transition: all 0.2s ease;
  }
  
  /* Check icon (✓) */
  ${props => props.$checked && !props.$indeterminate && css`
    &::after {
      width: ${props.$size === 'sm' ? '8px' : props.$size === 'md' ? '10px' : '12px'};
      height: ${props.$size === 'sm' ? '4px' : props.$size === 'md' ? '6px' : '8px'};
      border-left: 2px solid ${props.$variant === 'filled' && !props.$error && !props.$success ? 'white' : '#3b82f6'};
      border-bottom: 2px solid ${props.$variant === 'filled' && !props.$error && !props.$success ? 'white' : '#3b82f6'};
      transform: rotate(-45deg) translate(1px, -1px);
    }
  `}
  
  /* Indeterminate icon (-) */
  ${props => props.$indeterminate && css`
    &::after {
      width: ${props.$size === 'sm' ? '8px' : props.$size === 'md' ? '10px' : '12px'};
      height: 2px;
      background-color: ${props.$variant === 'filled' && !props.$error && !props.$success ? 'white' : '#3b82f6'};
      border-radius: 1px;
    }
  `}
`;

export const CheckboxWrapper = styled.label<WrapperProps>`
  ${baseWrapperStyles}
  flex-direction: ${props => props.$labelPosition === 'left' ? 'row-reverse' : 'row'};
  justify-content: ${props => props.$labelPosition === 'left' ? 'space-between' : 'flex-start'};
  width: fit-content;
  
  &:hover ${CheckboxContainer}:not([data-disabled="true"]) {
    transform: translateY(-1px);
  }
  
  &:active ${CheckboxContainer}:not([data-disabled="true"]) {
    transform: translateY(0);
  }
`;

export const Label = styled.span<LabelProps>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  
  &::after {
    content: ${props => props.$required ? "'*'" : "''"};
    color: #ef4444;
    margin-left: 2px;
  }
`;

export const Description = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.4;
`;

// ===== HELPER STYLES =====
export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  ${CheckboxContainer}.sm + & ${Label} {
    font-size: 13px;
    line-height: 16px;
  }
  
  ${CheckboxContainer}.md + & ${Label} {
    font-size: 14px;
    line-height: 20px;
  }
  
  ${CheckboxContainer}.lg + & ${Label} {
    font-size: 15px;
    line-height: 24px;
  }
`;