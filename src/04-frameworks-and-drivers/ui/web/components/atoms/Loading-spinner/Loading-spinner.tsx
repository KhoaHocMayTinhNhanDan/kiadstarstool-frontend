// src/04-frameworks-and-drivers/ui/web/components/atoms/Loading-spinner/Loading-spinner.tsx
import React, { useState, useEffect, forwardRef } from 'react';
import { useI18n } from '@/shared/i18n';
import {
  SpinnerBase,
  SpinnerContainer,
  SpinnerLabel,
  FullScreenOverlay,
  InlineContainer,
} from './Loading-spinner.styles';
import type { 
  LoadingSpinnerProps,
  LoadingSpinnerSize,
  LoadingSpinnerVariant 
} from './Loading-spinner.types';
import {
  LOADING_SPINNER_CONFIG,
  LOADING_SPINNER_I18N_KEYS,
  LOADING_SPINNER_SIZE_CONFIG,
  LOADING_SPINNER_VARIANT_CONFIG,
} from './Loading-spinner.constants';

// Component for ring type spinner (multiple divs)
interface RingSpinnerProps {
  size: LoadingSpinnerSize;
  variant: LoadingSpinnerVariant;
  thickness: number;
  color?: string;
  speed?: number;
  style?: React.CSSProperties;
}

const RingSpinner = React.forwardRef<HTMLDivElement, RingSpinnerProps>(
  ({ size, variant, thickness, color, speed, style }, ref) => {
    const variantStyle = LOADING_SPINNER_VARIANT_CONFIG[variant];
    const colorValue = color || variantStyle.primaryColor;
    const sizeStyle = LOADING_SPINNER_SIZE_CONFIG[size];
    
    return (
      <div
        ref={ref}
        style={{
          width: sizeStyle.width,
          height: sizeStyle.height,
          display: 'inline-block',
          position: 'relative',
          ...style,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              boxSizing: 'border-box',
              display: 'block',
              position: 'absolute',
              width: sizeStyle.width,
              height: sizeStyle.height,
              border: `${thickness}px solid transparent`,
              borderRadius: '50%',
              animation: `ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
              animationDuration: speed ? `${speed}ms` : undefined,
              borderColor: `${colorValue} transparent transparent transparent`,
              animationDelay: i === 1 ? '-0.45s' : i === 2 ? '-0.3s' : '-0.15s',
            }}
          />
        ))}
      </div>
    );
  }
);

RingSpinner.displayName = 'RingSpinner';

// Main LoadingSpinner component
export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      // Core props
      size = LOADING_SPINNER_CONFIG.defaults.size,
      variant = LOADING_SPINNER_CONFIG.defaults.variant,
      type = LOADING_SPINNER_CONFIG.defaults.type,
      label,
      labelPosition = LOADING_SPINNER_CONFIG.defaults.labelPosition,
      
      // Layout props
      fullScreen = false,
      withBackdrop = true,
      backdropColor,
      transparentBackdrop = false,
      
      // Animation props
      delay = LOADING_SPINNER_CONFIG.defaults.delay,
      speed = LOADING_SPINNER_CONFIG.defaults.speed,
      thickness = LOADING_SPINNER_CONFIG.defaults.thickness,
      
      // Style props
      color,
      className,
      style,
      
      // Accessibility
      'aria-label': ariaLabel,
      
      ...props
    },
    ref
  ) => {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(delay === 0);
    
    // Handle delay
    useEffect(() => {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, delay);
        
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [delay]);
    
    // If not visible yet, don't render
    if (!isVisible) {
      return null;
    }
    
    // Determine label text
    const labelText = label || t(LOADING_SPINNER_I18N_KEYS.loading, 'Loading...');
    
    // Determine aria-label
    const resolvedAriaLabel = ariaLabel || 
      t(LOADING_SPINNER_I18N_KEYS.defaultLabel, 'Loading spinner');
    
    // Get styles from config
    const sizeStyle = LOADING_SPINNER_CONFIG.getSizeStyle(size);
    const variantStyle = LOADING_SPINNER_CONFIG.getVariantStyle(variant);
    
    // Create spinner element based on type
    const renderSpinner = () => {
      const commonProps = {
        $size: size,
        $variant: variant,
        $type: type,
        $thickness: thickness,
        $color: color,
        style: {
          ...(speed && { animationDuration: `${speed}ms` }),
          ...style,
        },
      };
      
      if (type === 'ring') {
        return (
          <RingSpinner
            ref={ref}
            size={size}
            variant={variant}
            thickness={thickness}
            color={color}
            speed={speed}
            style={style}
          />
        );
      }
      
      if (type === 'dots') {
        return (
          <SpinnerBase
            ref={ref}
            {...commonProps}
          >
            <span />
          </SpinnerBase>
        );
      }
      
      return (
        <SpinnerBase
          ref={ref}
          {...commonProps}
        />
      );
    };
    
    // Spinner with label
    const spinnerWithLabel = (
      <SpinnerContainer
        $labelPosition={labelPosition}
        $size={size}
        className={className}
        aria-label={resolvedAriaLabel}
        role="status"
        {...props}
      >
        {renderSpinner()}
        {labelText && (
          <SpinnerLabel
            $size={size}
            $variant={variant}
            $color={color}
          >
            {labelText}
          </SpinnerLabel>
        )}
      </SpinnerContainer>
    );
    
    // Full screen overlay
    if (fullScreen) {
      return (
        <FullScreenOverlay
          $withBackdrop={withBackdrop}
          $backdropColor={backdropColor}
          $transparent={transparentBackdrop}
          data-testid="loading-spinner-overlay"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: sizeStyle.labelGap,
            }}
          >
            {renderSpinner()}
            {labelText && (
              <SpinnerLabel
                $size={size}
                $variant={variant}
                $color={color}
                style={{ 
                  color: variant === 'light' ? '#ffffff' : undefined,
                  ...(color && { color }) 
                }}
              >
                {labelText}
              </SpinnerLabel>
            )}
          </div>
        </FullScreenOverlay>
      );
    }
    
    // Inline spinner
    return (
      <InlineContainer
        $inline={!fullScreen}
        data-testid="loading-spinner"
      >
        {spinnerWithLabel}
      </InlineContainer>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;