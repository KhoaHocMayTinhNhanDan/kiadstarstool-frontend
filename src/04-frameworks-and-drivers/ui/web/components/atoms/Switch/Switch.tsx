// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch.tsx
import React, { forwardRef } from 'react';
import { useI18n } from '@/shared/i18n';
import { 
  StyledSwitch, 
  StatusIndicator, 
  LoadingSpinner 
} from './Switch.styles';
import type { SwitchProps, SwitchWithStatusProps } from './Switch.types';
import { 
  SWITCH_CONFIG,
  SWITCH_I18N_KEYS 
} from './Switch.constants';

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      // Core props
      variant = SWITCH_CONFIG.defaults.variant,
      size = SWITCH_CONFIG.defaults.size,
      children,
      label,
      
      // State props
      disabled = false,
      loading = false,
      selected = false,
      
      // Visual props
      className,
      style,
      border = false,
      borderRadius,
      
      // Interaction props
      onClick,
      onMouseEnter,
      onMouseLeave,
      
      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      tabIndex = 0,
      
      // Icon support
      leftElement,
      rightElement,
      iconOnly = false,
      
      // Additional props
      ...props
    },
    ref
  ) => {
    const { t } = useI18n();
    
    // Get config from constants
    const variantStyle = SWITCH_CONFIG.getVariantStyle(variant);
    const sizeStyle = SWITCH_CONFIG.getSizeStyle(size);
    
    // Determine content
    const content = children || label || t(SWITCH_I18N_KEYS.defaultLabel, 'Switch');
    
    // Determine aria-label
    const resolvedAriaLabel = ariaLabel || 
      t(SWITCH_I18N_KEYS.ariaLabel, 'Switch');
    
    // Handle click
    const handleClick = (e: React.MouseEvent) => {
      if (disabled || loading || !onClick) return;
      onClick();
    };
    
    // Merge styles
    const mergedStyle = {
      ...style,
      ...(borderRadius && { borderRadius }),
      ...(iconOnly && { 
        padding: `${sizeStyle.padding.split(' ')[0]}`,
        aspectRatio: '1/1'
      }),
    };
    
    // Theme for styled component
    const theme = {
      ...variantStyle,
      ...sizeStyle,
    };

    return (
      <StyledSwitch
        ref={ref}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $selected={selected}
        $loading={loading}
        $border={border}
        className={`switch ${className || ''}`}
        style={mergedStyle}
        theme={theme}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={resolvedAriaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled}
        aria-busy={loading}
        tabIndex={disabled ? -1 : tabIndex}
        role={onClick ? 'button' : 'presentation'}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <LoadingSpinner $size={size} />
        )}
        
        {/* Left element */}
        {!loading && leftElement && (
          <span style={{ marginRight: 8, display: 'flex' }}>
            {leftElement}
          </span>
        )}
        
        {/* Content */}
        {!loading && !iconOnly && (
          <span style={{ 
            opacity: loading ? 0.5 : 1,
            fontSize: sizeStyle.fontSize,
            lineHeight: sizeStyle.lineHeight 
          }}>
            {content}
          </span>
        )}
        
        {/* Right element */}
        {!loading && rightElement && (
          <span style={{ marginLeft: 8, display: 'flex' }}>
            {rightElement}
          </span>
        )}
      </StyledSwitch>
    );
  }
);

// Extended component with status
export const SwitchWithStatus = forwardRef<HTMLDivElement, SwitchWithStatusProps>(
  ({ status = 'none', statusPosition = 'top-right', ...props }, ref) => {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Switch ref={ref} {...props} />
        {status !== 'none' && (
          <StatusIndicator 
            $size={props.size || 'md'}
            $status={status}
            $position={statusPosition}
          />
        )}
      </div>
    );
  }
);

// Group component
export const SwitchGroup: React.FC<{
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: number | string;
  max?: number;
}> = ({ children, size = 'md', spacing = 8, max }) => {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const toShow = max ? childrenArray.slice(0, max) : childrenArray;
  const remaining = max ? total - max : 0;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: spacing 
    }}>
      {toShow.map((child, index) => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { size, key: index } as any)
          : child
      )}
      {remaining > 0 && (
        <div style={{
          width: SWITCH_CONFIG.getSizeStyle(size).size,
          height: SWITCH_CONFIG.getSizeStyle(size).size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5e7eb',
          borderRadius: '50%',
          fontSize: SWITCH_CONFIG.getSizeStyle(size).fontSize * 0.8,
          color: '#6b7280',
          fontWeight: 600,
        }}>
          +{remaining}
        </div>
      )}
    </div>
  );
};

Switch.displayName = 'Switch';
SwitchWithStatus.displayName = 'SwitchWithStatus';

export default Switch;
