// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch.styles.ts
import styled, { css } from 'styled-components';
import type { SwitchSize, SwitchVariant, SwitchLabelPosition } from './Switch.types';
import { SWITCH_SIZE_CONFIG, SWITCH_VARIANT_CONFIG } from './Switch.constants';

// ===== ANIMATIONS =====
const loadingAnimation = css`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const pulseAnimation = css`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// ===== COMMON STYLES =====
const focusVisible = css`
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    border-radius: 6px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

// ===== SWITCH WRAPPER =====
export interface SwitchWrapperProps {
  $disabled: boolean;
  $loading: boolean;
}

export const SwitchWrapper = styled.div<SwitchWrapperProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled, $loading }) => $disabled || $loading ? 'not-allowed' : 'pointer'};
  user-select: none;
  outline: none;
  position: relative;
  transition: opacity 0.2s ease;
  
  ${focusVisible}
  
  ${({ $loading }) => $loading && css`
    cursor: wait;
    opacity: 0.8;
  `}
  
  ${({ $disabled }) => $disabled && css`
    opacity: 0.6;
  `}
`;

// ===== SWITCH TRACK =====
export interface SwitchTrackProps {
  $size: SwitchSize;
  $variant: SwitchVariant;
  $checked: boolean;
  $disabled: boolean;
  $loading: boolean;
  $checkedColor?: string;
  $uncheckedColor?: string;
}

export const SwitchTrack = styled.div<SwitchTrackProps>`
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 9999px;
  overflow: hidden;
  box-sizing: border-box;
  
  ${({ $size }) => {
    const { width, height } = SWITCH_SIZE_CONFIG[$size];
    return css`
      width: ${width}px;
      height: ${height}px;
      min-width: ${width}px;
    `;
  }}
  
  ${({ $checked, $disabled, $loading, $variant, $checkedColor, $uncheckedColor }) => {
    const variantConfig = SWITCH_VARIANT_CONFIG[$variant];
    const bgColor = $disabled || $loading 
      ? variantConfig.disabledColor 
      : $checked 
        ? ($checkedColor || variantConfig.checkedColor)
        : ($uncheckedColor || variantConfig.uncheckedColor);
    
    return css`
      background-color: ${bgColor};
      border: 1px solid transparent;
      
      ${!$disabled && !$loading && css`
        &:hover {
          background-color: ${$checked 
            ? variantConfig.hoverCheckedColor
            : variantConfig.hoverUncheckedColor
          };
        }
      `}
      
      ${$disabled && css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.05) 2px,
            rgba(0, 0, 0, 0.05) 4px
          );
          opacity: 0.3;
          pointer-events: none;
        }
      `}
    `;
  }}
  
  ${({ $loading }) => $loading && css`
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 1;
    }
    
    ${loadingAnimation}
  `}
`;

// ===== SWITCH THUMB =====
export interface SwitchThumbProps {
  $size: SwitchSize;
  $variant: SwitchVariant;
  $checked: boolean;
  $disabled: boolean;
  $thumbColor?: string;
  $withIcons: boolean;
}

export const SwitchThumb = styled.div<SwitchThumbProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
  
  ${({ $size, $checked }) => {
    const { thumbSize, thumbOffset, width } = SWITCH_SIZE_CONFIG[$size];
    const distance = width - thumbSize - (thumbOffset * 2);
    
    return css`
      width: ${thumbSize}px;
      height: ${thumbSize}px;
      left: ${thumbOffset}px;
      transform: ${$checked 
        ? `translateX(${distance}px) translateY(-50%)` 
        : 'translateX(0) translateY(-50%)'
      };
    `;
  }}
  
  ${({ $variant, $thumbColor }) => {
    const variantConfig = SWITCH_VARIANT_CONFIG[$variant];
    return css`
      background-color: ${$thumbColor || variantConfig.thumbColor};
    `;
  }}
  
  ${({ $withIcons }) => $withIcons && css`
    svg {
      width: 60%;
      height: 60%;
      opacity: 1;
      transition: opacity 0.2s ease, transform 0.2s ease;
      transform: scale(1);
    }
  `}
  
  ${({ $withIcons }) => !$withIcons && css`
    svg {
      width: 0;
      height: 0;
      opacity: 0;
      transform: scale(0);
    }
  `}
  
  ${({ $disabled }) => $disabled && css`
    opacity: 0.7;
    filter: grayscale(0.3);
  `}
`;

// ===== SWITCH CONTAINER =====
export interface SwitchContainerProps {
  $labelPosition: SwitchLabelPosition;
  $size: SwitchSize;
  $hasLabel: boolean;
}

export const SwitchContainer = styled.div<SwitchContainerProps>`
  display: inline-flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
  
  ${({ $labelPosition, $size, $hasLabel }) => {
    const { labelGap } = SWITCH_SIZE_CONFIG[$size];
    
    switch ($labelPosition) {
      case 'left':
        return css`
          flex-direction: row-reverse;
          gap: ${$hasLabel ? labelGap : 0}px;
        `;
      case 'right':
        return css`
          flex-direction: row;
          gap: ${$hasLabel ? labelGap : 0}px;
        `;
      case 'top':
        return css`
          flex-direction: column-reverse;
          align-items: flex-start;
          gap: ${$hasLabel ? labelGap / 2 : 0}px;
        `;
      case 'bottom':
        return css`
          flex-direction: column;
          align-items: flex-start;
          gap: ${$hasLabel ? labelGap / 2 : 0}px;
        `;
      default:
        return css`
          flex-direction: row;
          gap: ${$hasLabel ? labelGap : 0}px;
        `;
    }
  }}
  
  // RTL support
  &[dir="rtl"] {
    .switch-track {
      direction: ltr;
    }
  }
`;

// ===== LABEL WRAPPER =====
export const LabelWrapper = styled.div<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  max-width: 300px;
  
  ${focusVisible}
`;

// ===== SWITCH LABEL =====
export interface SwitchLabelProps {
  $size: SwitchSize;
  $disabled: boolean;
  $required: boolean;
}

export const SwitchLabel = styled.span<SwitchLabelProps>`
  font-family: inherit;
  font-weight: 500;
  color: ${({ $disabled }) => $disabled ? '#9ca3af' : '#374151'};
  position: relative;
  line-height: 1.4;
  word-break: break-word;
  transition: color 0.2s ease;
  
  ${({ $size }) => {
    const { fontSize } = SWITCH_SIZE_CONFIG[$size];
    return css`
      font-size: ${fontSize}px;
    `;
  }}
  
  ${({ $required }) => $required && css`
    &::after {
      content: '*';
      color: #ef4444;
      margin-left: 2px;
      font-weight: bold;
    }
  `}
  
  ${({ $disabled }) => $disabled && css`
    text-decoration: line-through;
    text-decoration-color: #9ca3af;
    text-decoration-thickness: 1px;
  `}
`;

// ===== SWITCH DESCRIPTION =====
export interface SwitchDescriptionProps {
  $size: SwitchSize;
  $disabled: boolean;
}

export const SwitchDescription = styled.span<SwitchDescriptionProps>`
  font-family: inherit;
  font-weight: 400;
  color: ${({ $disabled }) => $disabled ? '#9ca3af' : '#6b7280'};
  line-height: 1.5;
  word-break: break-word;
  transition: color 0.2s ease;
  
  ${({ $size }) => {
    const { fontSize } = SWITCH_SIZE_CONFIG[$size];
    return css`
      font-size: ${fontSize * 0.85}px;
    `;
  }}
  
  ${({ $disabled }) => $disabled && css`
    opacity: 0.7;
    font-style: italic;
  `}
`;

// ===== REQUIRED INDICATOR (for screen readers) =====
export const RequiredIndicator = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  
  &:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`;