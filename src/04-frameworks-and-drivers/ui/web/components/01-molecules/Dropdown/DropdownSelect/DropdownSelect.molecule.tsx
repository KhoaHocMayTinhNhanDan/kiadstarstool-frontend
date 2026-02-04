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
} from './DropdownSelect.molecule.styles';
import { SPACING, COLORS, TYPOGRAPHY } from '../../00-atoms/00-core/tokens-constants';
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

const DropdownSelectOptionComponent: React.FC<DropdownSelectOptionComponentProps> = React.memo(({ 
  option,
  isSelected 
}) => {
  const { onSelect } = useDropdownSelectContext();
  const { size } = useDropdownBaseContext();
  
  const handleClick = useCallback((e: Event) => {
    e.preventDefault();
    if (!option.disabled) {
      onSelect(option.value);
    }
  }, [option, onSelect]);
  
  const optionStyles = [
    selectOption,
    isSelected && selectOptionSelected,
    option.disabled && selectOptionDisabled,
    size === 'sm' && css`height: 32px; font-size: ${TYPOGRAPHY.fontSize.xs};`,
    size === 'lg' && css`height: 40px; font-size: ${TYPOGRAPHY.fontSize.md};`,
  ];
  
  return (
    <DropdownMenuPrimitive.Item
      css={optionStyles}
      onClick={handleClick}
      disabled={option.disabled}
      data-testid={`select-option-${option.id}`}
      data-state={isSelected ? 'checked' : undefined}
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
        <Check size={16} css={{ color: COLORS.PRIMARY[500], flexShrink: 0 }} />
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

const DropdownSelectSearchInput: React.FC<DropdownSelectSearchInputProps> = React.memo(({
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
    <div css={selectSearchInput}>
      <Search size={16} css={{ color: COLORS.TEXT.TERTIARY, flexShrink: 0 }} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        css={css`
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: ${TYPOGRAPHY.fontSize.sm};
          color: ${COLORS.TEXT.PRIMARY};
          
          &::placeholder {
            color: ${COLORS.TEXT.TERTIARY};
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

export const DropdownSelect: React.FC<DropdownSelectProps> = React.memo(({
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
  ...baseProps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
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
      setIsOpen(false);
    }
  }, [onChange, baseProps.closeOnSelect]);
  
  const handleClear = useCallback((e: React.MouseEvent) => {
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
      css={[
        selectTrigger,
        error && selectTriggerError,
        isOpen && selectTriggerOpen,
        baseProps.size === 'sm' && css`height: 32px; font-size: ${TYPOGRAPHY.fontSize.xs};`,
        baseProps.size === 'lg' && css`height: 40px; font-size: ${TYPOGRAPHY.fontSize.md};`,
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
          <button
            css={selectClearButton}
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <X size={14} />
          </button>
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
              <div css={css`
                width: 20px;
                height: 20px;
                border: 2px solid ${COLORS.PRIMARY[500]};
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `} />
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