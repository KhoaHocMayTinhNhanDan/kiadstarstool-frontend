/** @jsxImportSource @emotion/react */
import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useMemo,
  useState,
  useEffect,
  useRef 
} from 'react';
import { css } from '@emotion/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDown, X, Search, Check } from 'lucide-react';
import { DropdownBase } from '../DropdownBase/DropdownBase.molecule';
import { useDropdownBaseContext } from '../DropdownBase/DropdownBase.molecule';
import { useDropdown } from '../../../../01-ui-core/hooks/useDropdown';
import {
  selectTrigger,
  selectTriggerError,
  selectTriggerOpen,
  selectValueContainer,
  selectPlaceholder,
  selectClearButton,
  selectDropdown,
  selectSearchInput,
  selectOption,
  selectOptionSelected,
  selectOptionDisabled,
  selectLoading,
  selectEmpty,
  selectErrorMessage,
  spinAnimation, // Import spin animation
} from './DropdownSelect.molecule.styles';
import { SPACING, COLORS, TYPOGRAPHY } from '../../../../01-ui-core/constants/tokens-constants';
import type {
  DropdownSelectProps,
  DropdownSelectOption,
} from './DropdownSelect.types';

/* ==========================================================================
 * CONTEXT
 * ========================================================================== */

interface DropdownSelectContextValue {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const DropdownSelectContext = createContext<DropdownSelectContextValue>({
  selectedValue: undefined,
  onSelect: () => {},
});

const useDropdownSelectContext = () => useContext(DropdownSelectContext);

/* ==========================================================================
 * SUB-COMPONENTS
 * ========================================================================== */

interface DropdownSelectOptionComponentProps {
  option: DropdownSelectOption;
  isSelected: boolean;
}

export const DropdownSelectOptionComponent: React.FC<DropdownSelectOptionComponentProps> = React.memo(({ 
  option,
  isSelected 
}) => {
  const { onSelect } = useDropdownSelectContext();
  const { size } = useDropdownBaseContext();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!option.disabled) {
      onSelect(option.value);
    }
  }, [option, onSelect]);
  
  const optionStyles = [
    selectOption,
    isSelected && selectOptionSelected,
    option.disabled && selectOptionDisabled,
    size === 'sm' && css`height: 32px; font-size: ${TYPOGRAPHY.FONT_SIZE.xs};`,
    size === 'lg' && css`height: 40px; font-size: ${TYPOGRAPHY.FONT_SIZE.md};`,
  ];
  
  return (
    <DropdownMenuPrimitive.Item
      css={optionStyles}
      onClick={handleClick}
      disabled={option.disabled}
      data-testid={`select-option-${option.id}`}
      data-state={isSelected ? 'selected' : undefined} // Radix uses 'selected' for single select
    >
      {option.icon && (
        <span css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '16px',
          height: '16px',
          flexShrink: 0,
          marginRight: SPACING.sm,
          opacity: option.disabled ? 0.4 : 0.8,
        }}>
          {option.icon}
        </span>
      )}
      <span css={{ flex: 1 }}>{option.label}</span>
      {isSelected && (
        <Check size={16} css={{ color: COLORS.PRIMARY, flexShrink: 0 }} />
      )}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownSelectOptionComponent.displayName = 'DropdownSelectOption';

/* ==========================================================================
 * SEARCH INPUT COMPONENT
 * ========================================================================== */

interface DropdownSelectSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DropdownSelectSearchInput: React.FC<DropdownSelectSearchInputProps> = React.memo(({
  value,
  onChange,
  placeholder = 'Search...'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div css={selectSearchInput} data-testid="select-search-input">
      <Search size={16} css={{ color: COLORS.TEXT_MUTED, flexShrink: 0 }} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        css={css`
          flex: 1;
          border: none; /* Override default input border */
          outline: none;
          background: transparent;
          font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
          color: ${COLORS.TEXT_PRIMARY};
          
          &::placeholder {
            color: ${COLORS.TEXT_MUTED};
          }
        `}
      />
    </div>
  );
});

DropdownSelectSearchInput.displayName = 'DropdownSelectSearchInput';

/* ==========================================================================
 * MAIN COMPONENT
 * ========================================================================== */

export const DropdownSelect: React.FC<DropdownSelectProps & { disabled?: boolean }> = React.memo(({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  clearable = false,
  searchable = false,
  loading = false,
  error = false,
  errorMessage,
  trigger: customTrigger,
  disabled,
  ...baseProps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, setIsOpen, close } = useDropdown({
    defaultOpen: baseProps.open,
    onOpenChange: baseProps.onOpenChange,
  });
  
  const selectedOption = useMemo(() => 
    options.find(opt => opt.value === value),
    [options, value]
  );
  
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchable, searchQuery]);
  
  const handleSelect = useCallback((selectedValue: string) => {
    onChange?.(selectedValue);
    setSearchQuery('');
    if (baseProps.closeOnSelect !== false) {
      close();
    }
  }, [onChange, baseProps.closeOnSelect, close]);
  
  const handleClear = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onChange?.('');
  }, [onChange]);
  
  const selectContextValue = useMemo<DropdownSelectContextValue>(() => ({
    selectedValue: value,
    onSelect: handleSelect,
  }), [value, handleSelect]);
  
  // Default trigger
  const defaultTrigger = (
    <button
      disabled={disabled}
      css={[
        selectTrigger,
        error && selectTriggerError,
        isOpen && selectTriggerOpen,
        disabled && css`opacity: 0.5; cursor: not-allowed;`,
        baseProps.size === 'sm' && css`height: 32px; font-size: ${TYPOGRAPHY.FONT_SIZE.xs};`,
        baseProps.size === 'lg' && css`height: 40px; font-size: ${TYPOGRAPHY.FONT_SIZE.md};`,
      ]}
      data-testid="select-trigger"
    >
      <div css={selectValueContainer}>
        {selectedOption ? (
          <>
            {selectedOption.icon && (
              <span css={{ marginRight: SPACING.sm, display: 'flex' }}>
                {selectedOption.icon}
              </span>
            )}
            <span>{selectedOption.label}</span>
          </>
        ) : (
          <span css={selectPlaceholder}>{placeholder}</span>
        )}
      </div>
      <div css={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
        {clearable && value && (
          <span
            role="button"
            tabIndex={0}
            css={selectClearButton}
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClear(e);
              }
            }}
            aria-label="Clear selection"
          >
            <X size={14} />
          </span>
        )}
        <ChevronDown 
          size={16} 
          css={{ 
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'none'
          }} 
        />
      </div>
    </button>
  );
  
  const trigger = customTrigger || defaultTrigger;
  
  return (
    <DropdownSelectContext.Provider value={selectContextValue}>
      <DropdownBase
        trigger={trigger}
        open={isOpen}
        onOpenChange={setIsOpen}
        {...baseProps}
      >
        <div css={selectDropdown}>
          {searchable && (
            <DropdownSelectSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${options.length} options...`}
            />
          )}
          
          {loading ? (
            <div css={selectLoading}>
              <div css={spinAnimation(COLORS.PRIMARY)} />
              <span>Loading...</span>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div css={selectEmpty}>
              {searchQuery ? 'No results found' : 'No options available'}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <DropdownSelectOptionComponent
                key={option.id}
                option={option}
                isSelected={option.value === value}
              />
            ))
          )}
          
          {error && errorMessage && (
            <div css={selectErrorMessage}>
              {errorMessage}
            </div>
          )}
        </div>
      </DropdownBase>
    </DropdownSelectContext.Provider>
  );
});

DropdownSelect.displayName = 'DropdownSelect';