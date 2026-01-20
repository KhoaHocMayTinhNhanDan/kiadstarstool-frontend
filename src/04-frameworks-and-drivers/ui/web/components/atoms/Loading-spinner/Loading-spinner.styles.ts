// src/04-frameworks-and-drivers/ui/web/components/atoms/Loading-spinner/Loading-spinner.styles.ts
import styled, { css, keyframes } from 'styled-components';
import type { 
  LoadingSpinnerSize, 
  LoadingSpinnerVariant,
  LoadingSpinnerType 
} from './Loading-spinner.constants';
import { 
  LOADING_SPINNER_SIZE_CONFIG, 
  LOADING_SPINNER_VARIANT_CONFIG,
  LOADING_SPINNER_ANIMATION_CONFIG 
} from './Loading-spinner.constants';

// Animation keyframes
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.5; }
`;

const ringSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dualRingSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ===== BASE SPINNER =====
export const SpinnerBase = styled.div<{
  $size: LoadingSpinnerSize;
  $variant: LoadingSpinnerVariant;
  $type: LoadingSpinnerType;
  $thickness: number;
  $color?: string;
}>`
  box-sizing: border-box;
  flex-shrink: 0;
  
  ${props => {
    const size = LOADING_SPINNER_SIZE_CONFIG[props.$size];
    const variant = LOADING_SPINNER_VARIANT_CONFIG[props.$variant];
    const color = props.$color || variant.primaryColor;
    const thickness = props.$thickness || size.borderWidth;
    
    switch (props.$type) {
      case 'spinner':
        return css`
          width: ${size.width}px;
          height: ${size.height}px;
          border: ${thickness}px solid ${variant.secondaryColor || 'transparent'};
          border-top-color: ${color};
          border-radius: 50%;
          animation: ${spin} ${props.$speed || 1}s linear infinite;
        `;
        
      case 'dots':
        return css`
          display: flex;
          gap: ${size.width * 0.2}px;
          width: ${size.width * 2}px;
          height: ${size.height}px;
          align-items: center;
          justify-content: center;
          
          &::before,
          &::after {
            content: '';
            width: ${size.width * 0.4}px;
            height: ${size.width * 0.4}px;
            background-color: ${color};
            border-radius: 50%;
            animation: ${pulse} 1.5s ease-in-out infinite;
          }
          
          &::before {
            animation-delay: -0.32s;
          }
          
          &::after {
            animation-delay: -0.16s;
          }
          
          & > span {
            width: ${size.width * 0.4}px;
            height: ${size.width * 0.4}px;
            background-color: ${color};
            border-radius: 50%;
            animation: ${pulse} 1.5s ease-in-out infinite;
          }
        `;
        
      case 'pulse':
        return css`
          width: ${size.width}px;
          height: ${size.height}px;
          background-color: ${color};
          border-radius: 50%;
          animation: ${pulseRing} 1.5s ease-in-out infinite;
        `;
        
      case 'ring':
        return css`
          width: ${size.width}px;
          height: ${size.height}px;
          display: inline-block;
          position: relative;
          
          div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: ${size.width}px;
            height: ${size.height}px;
            border: ${thickness}px solid ${variant.secondaryColor || 'transparent'};
            border-radius: 50%;
            animation: ${ringSpin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: ${color} transparent transparent transparent;
            
            &:nth-child(1) {
              animation-delay: -0.45s;
            }
            
            &:nth-child(2) {
              animation-delay: -0.3s;
            }
            
            &:nth-child(3) {
              animation-delay: -0.15s;
            }
          }
        `;
        
      case 'dual-ring':
        return css`
          width: ${size.width}px;
          height: ${size.height}px;
          border: ${thickness}px solid ${variant.secondaryColor || 'transparent'};
          border-radius: 50%;
          animation: ${dualRingSpin} 1.2s linear infinite;
          border-color: ${color} transparent;
        `;
        
      default:
        return css``;
    }
  }}
`;

// ===== CONTAINER =====
export const SpinnerContainer = styled.div<{
  $labelPosition: 'top' | 'bottom' | 'left' | 'right';
  $size: LoadingSpinnerSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => {
    const size = LOADING_SPINNER_SIZE_CONFIG[props.$size];
    
    switch (props.$labelPosition) {
      case 'top':
        return css`
          flex-direction: column-reverse;
          gap: ${size.labelGap}px;
        `;
      case 'bottom':
        return css`
          flex-direction: column;
          gap: ${size.labelGap}px;
        `;
      case 'left':
        return css`
          flex-direction: row-reverse;
          gap: ${size.labelGap}px;
        `;
      case 'right':
        return css`
          flex-direction: row;
          gap: ${size.labelGap}px;
        `;
      default:
        return css`
          flex-direction: column;
          gap: ${size.labelGap}px;
        `;
    }
  }}
`;

// ===== LABEL =====
export const SpinnerLabel = styled.span<{
  $size: LoadingSpinnerSize;
  $variant: LoadingSpinnerVariant;
  $color?: string;
}>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  color: ${props => props.$color || '#6b7280'};
  
  ${props => {
    const size = LOADING_SPINNER_SIZE_CONFIG[props.$size];
    return css`
      font-size: ${size.fontSize}px;
      line-height: 1.4;
    `;
  }}
`;

// ===== FULL SCREEN OVERLAY =====
export const FullScreenOverlay = styled.div<{
  $withBackdrop: boolean;
  $backdropColor?: string;
  $transparent: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  ${props => {
    if (props.$withBackdrop) {
      if (props.$transparent) {
        return css`
          background-color: transparent;
        `;
      } else {
        return css`
          background-color: ${props.$backdropColor || 'rgba(0, 0, 0, 0.5)'};
        `;
      }
    }
    return css`
      background-color: transparent;
    `;
  }}
`;

// ===== INLINE CONTAINER =====
export const InlineContainer = styled.div<{
  $inline: boolean;
}>`
  ${props => props.$inline && css`
    display: inline-flex;
  `}
  
  ${props => !props.$inline && css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `}
`;