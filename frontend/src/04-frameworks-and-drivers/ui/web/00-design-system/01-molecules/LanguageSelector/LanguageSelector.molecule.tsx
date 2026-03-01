/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Box, Text, Icon } from '../../00-atoms';
import * as styles from './LanguageSelector.molecule.styles';
import type { LanguageSelectorProps, LanguageOption } from './LanguageSelector.types';

const DEFAULT_OPTIONS: LanguageOption[] = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export const LanguageSelector = ({
  value = 'vi',
  onChange,
  options = DEFAULT_OPTIONS,
  variant = 'default',
  className,
  sx,
  testId = 'language-selector',
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.code === value) || options[0];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      css={[styles.container, sx]}
      className={className}
      data-testid={testId}
    >
      <button
        type="button"
        css={styles.trigger(isOpen, variant)}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        {variant !== 'text-only' && (
          <span css={styles.flag}>
            {selectedOption.flag || <Icon size="sm"><Globe /></Icon>}
          </span>
        )}
        
        {variant !== 'icon-only' && (
          <Text size="sm" weight="medium">
            {selectedOption.label}
          </Text>
        )}

        <Icon size="xs" color="SECONDARY">
          <ChevronDown />
        </Icon>
      </button>

      <div css={styles.dropdown(isOpen)} role="listbox">
        {options.map((option) => {
          const isActive = option.code === value;
          return (
            <button
              key={option.code}
              type="button"
              role="option"
              aria-selected={isActive}
              css={styles.option(isActive)}
              onClick={() => handleSelect(option.code)}
            >
              <Box display="flex" alignItems="center">
                {option.flag && <span css={styles.flag}>{option.flag}</span>}
                <span>{option.label}</span>
              </Box>
              {isActive && (
                <Icon size="xs" color="PRIMARY">
                  <Check />
                </Icon>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};