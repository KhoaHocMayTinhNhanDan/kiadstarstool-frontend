// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule.tsx
/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import * as styles from './SearchInput.molecule.styles';
import type { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({
  value: propValue,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  size = 'md',
  disabled = false,
  autoFocus = false,
  className,
  sx,
  testId = 'search-input',
}) => {
  // Handle Controlled vs Uncontrolled state
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  }, [isControlled, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value || '');
    }
  }, [onSearch, value]);

  const handleClear = useCallback(() => {
    // Create a synthetic event to mimic input change
    const emptyEvent = {
      target: { value: '' }
    } as ChangeEvent<HTMLInputElement>;
    
    if (!isControlled) {
      setInternalValue('');
    }
    
    onChange?.(emptyEvent);
    onSearch?.('');
    inputRef.current?.focus();
  }, [isControlled, onChange, onSearch]);

  // Adjust icon size based on input size
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  return (
    <div css={[styles.container, sx]} className={className} data-testid={testId}>
      <div css={styles.iconWrapper}>
        <Search size={iconSize} />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        css={styles.input(size, !!value && !disabled)}
        aria-label={placeholder}
      />

      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          css={styles.clearButton}
          aria-label="Clear search"
          tabIndex={0}
        >
          <X size={iconSize} />
        </button>
      )}
    </div>
  );
};
