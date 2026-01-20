// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input.tsx
import React, { forwardRef, useId, useState, useCallback, useEffect, useRef } from 'react';
import {
  InputWrapper,
  InputContainer,
  StyledInput,
  StyledTextarea,
  LeftElement,
  RightElement,
  Label,
  HelperText,
  CharacterCount,
  LoadingSpinner
} from './Input.styles';
import type {  TextareaProps, InputComponentProps, InputState } from './Input.types';

// Type guard để check xem có phải textarea không
const isTextareaProps = (props: InputComponentProps): props is TextareaProps => {
  return props.type === 'textarea' || 'rows' in props || 'autosize' in props;
};

// Base props interface để destructuring an toàn
interface CommonInputProps {
  // Common props
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline' | 'flushed' | 'unstyled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showCount?: boolean;
  maxLength?: number;
  placeholder?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fullWidth?: boolean;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputComponentProps>(
  (props, ref) => {
    // Cast props để có thể destructuring
    const typedProps = props as CommonInputProps & Record<string, any>;
    
    const {
      // Common props
      label,
      description,
      error,
      success,
      required = false,
      disabled = false,
      readOnly = false,
      loading = false,
      leftElement,
      rightElement,
      variant = 'default',
      size = 'md',
      radius = 'md',
      className,
      inputClassName,
      labelClassName,
      showCount = false,
      maxLength,
      placeholder,
      style,
      id,
      name,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onPressEnter,
      fullWidth = false,
      type = 'text',
      
      // Textarea-specific props
      rows,
      autosize = false,
      minRows = 1,
      maxRows = 10,
    } = typedProps;

    const generatedId = useId();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Determine input state
    const getInputState = (): InputState => {
      if (disabled) return 'disabled';
      if (error) return 'error';
      if (success) return 'success';
      if (isFocused) return 'focused';
      return 'default';
    };
    
    const inputState = getInputState();
    
    // Handle value changes
    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    }, [value]);
    
    // Handle textarea auto-resize
    const resizeTextarea = useCallback(() => {
      if (!autosize || !textareaRef.current) return;
      
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;
      const scrollHeight = textarea.scrollHeight;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autosize, minRows, maxRows]);
    
    useEffect(() => {
      if (autosize && type === 'textarea') {
        resizeTextarea();
      }
    }, [currentValue, autosize, type, resizeTextarea]);
    
    // Event handlers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setCurrentValue(newValue);
      
      if (onChange) {
        // Call the onChange handler with custom signature
        onChange(newValue, event);
      }
    };
    
    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };
    
    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onKeyDown?.(event);
      
      if (event.key === 'Enter' && onPressEnter) {
        onPressEnter(event);
      }
    };
    
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onKeyUp?.(event);
    };
    
    // Character count
    const characterCount = currentValue.length;
    const isMaxLengthExceeded = maxLength ? characterCount > maxLength : false;
    
    // Helper text
    const hasHelperText = !!(description || error || success);
    const helperText = error || success || description;
    const helperTextType = error ? 'error' : success ? 'success' : 'description';
    
    // Determine if it's a textarea
    const isTextarea = type === 'textarea' || isTextareaProps(props);
    
    // Setup refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          if (isTextarea) {
            ref(textareaRef.current);
          } else {
            ref(inputRef.current);
          }
        } else {
          if (isTextarea) {
            ref.current = textareaRef.current;
          } else {
            ref.current = inputRef.current;
          }
        }
      }
    }, [ref, isTextarea]);
    
    // Common props cho cả input và textarea
    const commonProps = {
      id: inputId,
      name,
      value: value !== undefined ? value : currentValue,
      defaultValue: value === undefined ? defaultValue : undefined,
      placeholder,
      disabled: disabled || loading,
      readOnly,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      className: inputClassName,
      $size: size,
      $variant: variant,
      $state: inputState,
      $hasLeftElement: !!leftElement,
      $hasRightElement: !!rightElement || loading,
      $isTextarea: isTextarea,
    };

    // Render input/textarea element
    const renderInputElement = () => {
      if (isTextarea) {
        // Lấy các props textarea-specific một cách an toàn
        const textareaSpecificProps: any = {};
        if (rows !== undefined) textareaSpecificProps.rows = rows;
        if (autosize) textareaSpecificProps.style = { resize: 'none' };
        
        return (
          <StyledTextarea
            {...commonProps}
            ref={textareaRef}
            rows={rows || 3}
            {...textareaSpecificProps}
          />
        );
      }
      
      // Input element - loại bỏ 'textarea' từ type
      const inputType = type === 'textarea' ? 'text' : (type as React.HTMLInputTypeAttribute);
      
      return (
        <StyledInput
          {...commonProps}
          type={inputType}
          ref={inputRef}
        />
      );
    };
    
    // Render right element (loading spinner or custom)
    const renderRightElement = () => {
      if (loading) {
        return (
          <RightElement>
            <LoadingSpinner />
          </RightElement>
        );
      }
      
      if (rightElement) {
        return <RightElement>{rightElement}</RightElement>;
      }
      
      return null;
    };
    
    return (
      <InputWrapper
        className={`input-wrapper ${className || ''}`}
        $state={inputState}
        $disabled={disabled}
        $fullWidth={fullWidth}
        style={style}
      >
        {label && (
          <Label
            htmlFor={inputId}
            className={`input-label ${labelClassName || ''}`}
            $required={required}
            $disabled={disabled}
          >
            {label}
          </Label>
        )}
        
        <InputContainer
          $variant={variant}
          $size={size}
          $radius={radius}
          $state={inputState}
          $disabled={disabled}
          $fullWidth={fullWidth}
          $hasLeftElement={!!leftElement}
          $hasRightElement={!!rightElement || loading}
          $isTextarea={isTextarea}
        >
          {leftElement && <LeftElement>{leftElement}</LeftElement>}
          
          {renderInputElement()}
          
          {renderRightElement()}
        </InputContainer>
        
        {(hasHelperText || showCount) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {hasHelperText && (
              <HelperText $type={helperTextType}>
                {helperText}
              </HelperText>
            )}
            
            {showCount && maxLength && (
              <CharacterCount $exceeded={isMaxLengthExceeded}>
                {characterCount}/{maxLength}
              </CharacterCount>
            )}
          </div>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;