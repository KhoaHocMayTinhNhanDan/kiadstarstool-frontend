// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Input } from '../../00-atoms/Input';
import { Icon } from '../../00-atoms/Icon';
import { IconButton } from '../../00-atoms/IconButton';
import { SPACING } from '../../00-atoms/00-core/tokens-constants';
import type { SearchInputProps } from './SearchInput.types';

// Default icons
const DefaultSearchIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const DefaultClearIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

/**
 * SearchInput - Đơn giản cho web tĩnh
 * 
 * Features:
 * ✅ Basic search với local filtering
 * ✅ Clear button đơn giản
 * ✅ Accessibility cơ bản
 * ✅ Clean & maintainable
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    value: externalValue,
    onSearch,
    showClearButton = true,
    searchIcon = DefaultSearchIcon,
    clearIcon = DefaultClearIcon,
    placeholder = 'Search...',
    sx,
    className,
    onChange,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(externalValue || '');
    
    // Sync với external value
    React.useEffect(() => {
      if (externalValue !== undefined) {
        setInternalValue(externalValue);
      }
    }, [externalValue]);
    
    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
      onSearch?.(newValue);
    };
    
    // Handle clear
    const handleClear = () => {
      setInternalValue('');
      onSearch?.('');
      
      // Trigger change event
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      
      // Focus lại input
      if (ref && typeof ref !== 'function') {
        ref.current?.focus();
      }
    };
    
    const hasValue = internalValue.length > 0;
    const showClear = showClearButton && hasValue;
    
    return (
      <div 
        css={[
          css`
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
          `,
          sx
        ]} 
        className={className}
      >
        <Input
          ref={ref}
          type="search"
          role="searchbox"
          aria-label="Search"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          leftIcon={<Icon size="sm">{searchIcon}</Icon>}
          css={css`
            padding-right: ${showClear ? '40px' : undefined};
          `}
          {...props}
        />
        
        {/* Clear button */}
        {showClear && (
          <IconButton
            type="button"
            variant="ghost"
            size="xs"
            css={css`
              position: absolute;
              right: ${SPACING.sm};
              top: 50%;
              transform: translateY(-50%);
              padding: ${SPACING.xs};
            `}
            onClick={handleClear}
            aria-label="Clear search"
            icon={clearIcon}
          />
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';