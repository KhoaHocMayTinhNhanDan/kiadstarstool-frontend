// src/04-frameworks-and-drivers/ui/web/components/atoms/Checkbox/Checkbox.tsx
import React, { forwardRef, useId } from 'react';
import {
  CheckboxWrapper,
  HiddenInput,
  CheckboxContainer,
  Label,
  Description
} from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      variant = 'default',
      size = 'md',
      checked = false,
      indeterminate = false,
      disabled = false,
      error = false,
      success = false,
      className,
      labelClassName,
      labelPosition = 'right',
      onChange,
      description,
      required = false,
      showCheckIcon = true,
      id,
      name,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const descriptionId = `${checkboxId}-description`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(event.target.checked, event);
    };

    // If indeterminate is true, override checked state for visual
    const visualChecked = indeterminate ? false : checked;

    return (
      <CheckboxWrapper
        $disabled={disabled}
        $labelPosition={labelPosition}
        className={className}
        htmlFor={checkboxId}
        data-disabled={disabled}
      >
        <HiddenInput
          ref={ref}
          id={checkboxId}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-invalid={error}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
        />
        
        <CheckboxContainer
          $size={size}
          $variant={variant}
          $checked={visualChecked && showCheckIcon}
          $indeterminate={indeterminate}
          $error={error}
          $success={success}
          $disabled={disabled}
          data-disabled={disabled}
          aria-hidden="true"
        />
        
        {(label || description) && (
          <div className={`checkbox-label-container ${labelClassName || ''}`}>
            {label && (
              <Label 
                $required={required}
                className="checkbox-label"
              >
                {label}
              </Label>
            )}
            
            {description && (
              <Description 
                id={descriptionId}
                className="checkbox-description"
              >
                {description}
              </Description>
            )}
          </div>
        )}
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;