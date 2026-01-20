// src/04-frameworks-and-drivers/ui/web/components/atoms/Chip/Chip.styles.ts
import styled, { css } from 'styled-components';
import type { ChipVariant, ChipSize } from './Chip.constants';
import { CHIP_SIZE_CONFIG, CHIP_VARIANT_CONFIG } from './Chip.constants';

export interface StyledChipProps {
  $variant: ChipVariant;
  $size: ChipSize;
  $disabled: boolean;
  $selected: boolean;
  $clickable: boolean;
  $removable: boolean;
}

export const StyledChip = styled.div<StyledChipProps>`
  // ===== LAYOUT =====
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  gap: 6px;
  
  // ===== TYPOGRAPHY =====
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  
  // ===== INTERACTION =====
  cursor: ${props => {
    if (props.$disabled) return 'not-allowed';
    if (props.$clickable) return 'pointer';
    return 'default';
  }};
  user-select: none;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  
  // ===== STATES =====
  ${props => props.$disabled && css`
    opacity: 0.6;
    pointer-events: none;
  `}
  
  ${props => props.$clickable && !props.$disabled && css`
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  // ===== SIZE-BASED STYLES =====
  ${props => {
    const size = props.$size;
    const sizeStyle = CHIP_SIZE_CONFIG[size];
    
    return css`
      height: ${sizeStyle.height}px;
      font-size: ${sizeStyle.fontSize}px;
      padding: ${sizeStyle.paddingY}px ${sizeStyle.paddingX}px;
      padding-right: ${props.$removable ? sizeStyle.paddingX + sizeStyle.removeIconSize + 4 : sizeStyle.paddingX}px;
      border-radius: ${sizeStyle.borderRadius}px;
      gap: ${sizeStyle.paddingY}px;
    `;
  }}
  
  // ===== VARIANT-BASED STYLES =====
  ${props => {
    const variant = props.$variant;
    const variantStyle = CHIP_VARIANT_CONFIG[variant];
    
    return css`
      color: ${props.$selected ? variantStyle.selectedColor : variantStyle.color};
      background-color: ${props.$selected ? variantStyle.selectedBackgroundColor : variantStyle.backgroundColor};
      border: 1px solid ${variantStyle.borderColor || 'transparent'};
      
      ${!props.$disabled && css`
        &:hover {
          color: ${variantStyle.hoverColor || variantStyle.color};
          background-color: ${variantStyle.hoverBackgroundColor};
        }
      `}
    `;
  }}
`;

// Remove button
export const RemoveButton = styled.button<{ $size: ChipSize }>`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 2px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.15s ease;
  border-radius: 50%;
  
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
  
  ${props => {
    const size = CHIP_SIZE_CONFIG[props.$size];
    return css`
      width: ${size.removeIconSize}px;
      height: ${size.removeIconSize}px;
      font-size: ${size.removeIconSize}px;
    `;
  }}
`;

// Icon wrapper
export const IconWrapper = styled.span<{ $size: ChipSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => {
    const size = CHIP_SIZE_CONFIG[props.$size];
    return css`
      width: ${size.iconSize}px;
      height: ${size.iconSize}px;
      font-size: ${size.iconSize}px;
    `;
  }}
`;

// Chip group container
export const ChipGroupContainer = styled.div<{ $spacing: number | string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${props => typeof props.$spacing === 'number' ? `${props.$spacing}px` : props.$spacing};
`;