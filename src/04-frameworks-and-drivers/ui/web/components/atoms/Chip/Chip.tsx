// src/04-frameworks-and-drivers/ui/web/components/atoms/Chip/Chip.tsx
import React, { forwardRef, useState } from 'react';
import { useI18n } from '@/shared/i18n';
import { 
  StyledChip, 
  RemoveButton, 
  IconWrapper,
  ChipGroupContainer 
} from './Chip.styles';
import type { ChipProps, ChipGroupProps } from './Chip.types';
import { 
  CHIP_CONFIG,
  CHIP_I18N_KEYS 
} from './Chip.constants';

// Default remove icon (X)
const DefaultRemoveIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      // Core props
      variant = CHIP_CONFIG.defaults.variant,
      size = CHIP_CONFIG.defaults.size,
      children,
      label,
      
      // Chip specific props
      removable = false,
      onRemove,
      removeIcon,
      
      // Icon props
      leftIcon,
      rightIcon,
      
      // State props
      disabled = false,
      selected = false,
      clickable = false,
      
      // Interaction props
      onClick,
      
      // Value for chip group
      value,
      
      // Visual props
      className,
      style,
      border = false,
      borderRadius,
      
      // Accessibility
      'aria-label': ariaLabel,
      
      ...props
    },
    ref
  ) => {
    const { t } = useI18n();
    const [isHovered, setIsHovered] = useState(false);
    
    // Get config from constants
    const variantStyle = CHIP_CONFIG.getVariantStyle(variant);
    const sizeStyle = CHIP_CONFIG.getSizeStyle(size);
    
    // Determine content
    const content = children || label || t(CHIP_I18N_KEYS.defaultLabel, 'Chip');
    
    // Determine aria-label
    const resolvedAriaLabel = ariaLabel || 
      t(selected ? CHIP_I18N_KEYS.selectedLabel : CHIP_I18N_KEYS.defaultLabel, 'Chip');
    
    // Handle click
    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      if (onClick) {
        e.stopPropagation();
        onClick();
      }
    };
    
    // Handle keyboard events
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick) onClick();
      }
      
      if (removable && onRemove && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        onRemove();
      }
    };
    
    // Handle remove
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onRemove && !disabled) {
        onRemove();
      }
    };
    
    // Handle mouse events for hover effects
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    // Merge styles
    const mergedStyle = {
      ...style,
      ...(borderRadius && { borderRadius }),
      cursor: clickable && !disabled ? 'pointer' : 'default',
    };
    
    // Determine if chip should have button role
    const role = clickable && !disabled ? 'button' : 'presentation';
    const tabIndex = clickable && !disabled ? 0 : -1;
    
    return (
      <StyledChip
        ref={ref}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $selected={selected}
        $clickable={clickable}
        $removable={removable}
        className={`chip ${selected ? 'chip--selected' : ''} ${className || ''}`}
        style={mergedStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={resolvedAriaLabel}
        aria-disabled={disabled}
        aria-selected={selected}
        role={role}
        tabIndex={tabIndex}
        data-value={value}
        {...props}
      >
        {/* Left icon */}
        {leftIcon && (
          <IconWrapper $size={size}>
            {leftIcon}
          </IconWrapper>
        )}
        
        {/* Content */}
        <span style={{ 
          opacity: disabled ? 0.6 : 1,
          fontSize: sizeStyle.fontSize,
        }}>
          {content}
        </span>
        
        {/* Right icon */}
        {rightIcon && (
          <IconWrapper $size={size} style={{ marginLeft: 2 }}>
            {rightIcon}
          </IconWrapper>
        )}
        
        {/* Remove button */}
        {removable && onRemove && !disabled && (
          <RemoveButton
            $size={size}
            onClick={handleRemove}
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
            aria-label={t(CHIP_I18N_KEYS.removeButtonLabel, 'Remove')}
            type="button"
            disabled={disabled}
          >
            {removeIcon || <DefaultRemoveIcon size={sizeStyle.removeIconSize} />}
          </RemoveButton>
        )}
      </StyledChip>
    );
  }
);

// Chip Group Component
export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  size = 'md',
  spacing = 8,
  max,
  selectable = 'none',
  onSelectionChange,
  className,
  style,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const toShow = max ? childrenArray.slice(0, max) : childrenArray;
  const remaining = max ? Math.max(0, total - max) : 0;
  
  const handleChipClick = (value: string) => {
    let newSelected: string[] = [];
    
    if (selectable === 'single') {
      newSelected = selectedValues.includes(value) ? [] : [value];
    } else if (selectable === 'multiple') {
      newSelected = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
    }
    
    setSelectedValues(newSelected);
    onSelectionChange?.(newSelected);
  };
  
  return (
    <ChipGroupContainer
      $spacing={spacing}
      className={`chip-group ${className || ''}`}
      style={style}
      role={selectable !== 'none' ? 'group' : undefined}
      aria-label={selectable !== 'none' ? 'Chip group' : undefined}
    >
      {toShow.map((child, index) => {
        if (React.isValidElement(child)) {
          const chipValue = child.props.value || `chip-${index}`;
          const isSelected = selectedValues.includes(chipValue);
          
          return React.cloneElement(child as React.ReactElement<ChipProps>, {
            size,
            key: child.key || `chip-${index}`,
            selected: isSelected,
            clickable: selectable !== 'none',
            onClick: () => handleChipClick(chipValue),
            'aria-checked': selectable !== 'none' ? isSelected : undefined,
          });
        }
        return child;
      })}
      
      {remaining > 0 && (
        <div
          style={{
            height: CHIP_CONFIG.getSizeStyle(size).height,
            minWidth: CHIP_CONFIG.getSizeStyle(size).height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e5e7eb',
            borderRadius: CHIP_CONFIG.getSizeStyle(size).borderRadius,
            fontSize: CHIP_CONFIG.getSizeStyle(size).fontSize * 0.9,
            color: '#6b7280',
            fontWeight: 600,
            padding: `0 ${CHIP_CONFIG.getSizeStyle(size).paddingX / 2}px`,
          }}
          title={`${remaining} more`}
          aria-label={`${remaining} more chips`}
        >
          +{remaining}
        </div>
      )}
    </ChipGroupContainer>
  );
};

Chip.displayName = 'Chip';
ChipGroup.displayName = 'ChipGroup';

export default Chip;