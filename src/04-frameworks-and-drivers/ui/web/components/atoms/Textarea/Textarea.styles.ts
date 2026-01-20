// src/04-frameworks-and-drivers/ui/web/components/atoms/Textarea/Textarea.styles.ts
import styled, { css } from 'styled-components';
import type { TextareaVariant, TextareaSize } from './Textarea.constants';

export interface StyledTextareaProps {
  $variant: TextareaVariant;
  $size: TextareaSize;
  $disabled: boolean;
  $selected: boolean;
  $loading: boolean;
  $border: boolean;
}

// Base styles - TỔNG QUÁT CHO MỌI ATOM
export const StyledTextarea = styled.div<StyledTextareaProps>`
  // ===== LAYOUT =====
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  
  // ===== TYPOGRAPHY =====
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 500;
  line-height: ${props => props.theme?.lineHeight || 1.4};
  white-space: nowrap;
  text-decoration: none;
  
  // ===== INTERACTION =====
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    opacity: ${props => props.$disabled ? 1 : 0.9};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
  
  &:active:not(:disabled) {
    transform: ${props => props.$disabled ? 'none' : 'translateY(0)'};
  }
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  // ===== STATES =====
  ${props => props.$disabled && css`
    opacity: 0.6;
    pointer-events: none;
  `}
  
  ${props => props.$selected && css`
    box-shadow: 0 0 0 2px #3b82f6;
  `}
  
  ${props => props.$loading && css`
    pointer-events: none;
    opacity: 0.8;
  `}
  
  ${props => props.$border && css`
    border-style: solid;
    border-width: 1px;
  `}
  
  // ===== SIZE-BASED STYLES =====
  ${props => {
    const size = props.$size;
    return css`
      font-size: ${props.theme?.fontSize || '14px'};
      padding: ${props.theme?.padding || '6px 12px'};
      border-radius: ${props.theme?.borderRadius || '6px'};
      min-height: ${props.theme?.size || '40px'};
      min-width: ${props.theme?.size || '40px'};
    `;
  }}
  
  // ===== VARIANT-BASED STYLES =====
  ${props => {
    const variant = props.$variant;
    return css`
      color: ${props.theme?.color || '#374151'};
      background-color: ${props.theme?.bgColor || '#f3f4f6'};
      border-color: ${props.theme?.borderColor || 'transparent'};
    `;
  }}
`;

// Status indicator - TỔNG QUÁT, DÙNG CHO AVATAR, BADGE, ETC.
export const StatusIndicator = styled.div<{
  $size: TextareaSize;
  $status: 'online' | 'offline' | 'away' | 'busy';
  $position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}>`
  position: absolute;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 1;
  
  // Size-based
  ${props => {
    const statusSize = props.$size === 'xs' ? 6 : 
                       props.$size === 'sm' ? 8 : 
                       props.$size === 'md' ? 10 : 
                       props.$size === 'lg' ? 12 : 14;
    return css`
      width: ${statusSize}px;
      height: ${statusSize}px;
    `;
  }}
  
  // Position-based
  ${props => {
    const position = props.$position;
    const offset = props.$size === 'xs' ? 1 : 2;
    
    switch (position) {
      case 'top-right': return css` top: -${offset}px; right: -${offset}px; `;
      case 'bottom-right': return css` bottom: -${offset}px; right: -${offset}px; `;
      case 'top-left': return css` top: -${offset}px; left: -${offset}px; `;
      case 'bottom-left': return css` bottom: -${offset}px; left: -${offset}px; `;
      default: return css` top: -${offset}px; right: -${offset}px; `;
    }
  }}
  
  // Status color
  ${props => {
    const status = props.$status;
    switch (status) {
      case 'online': return css` background-color: #22c55e; `;
      case 'offline': return css` background-color: #94a3b8; `;
      case 'away': return css` background-color: #f59e0b; `;
      case 'busy': return css` background-color: #ef4444; `;
      default: return css` background-color: transparent; `;
    }
  }}
`;

// Loading spinner - TỔNG QUÁT
export const LoadingSpinner = styled.div<{ $size: TextareaSize }>`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  ${props => {
    const spinnerSize = props.$size === 'xs' ? 12 : 
                        props.$size === 'sm' ? 14 : 
                        props.$size === 'md' ? 16 : 
                        props.$size === 'lg' ? 18 : 20;
    return css`
      width: ${spinnerSize}px;
      height: ${spinnerSize}px;
    `;
  }}
`;
