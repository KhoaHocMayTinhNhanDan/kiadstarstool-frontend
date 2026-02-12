/** @jsxImportSource @emotion/react */
import React from 'react';
import { useI18n } from '@/shared/i18n/useI18n';
import { SUPPORTED_LOCALES, LANGUAGE_LABELS, type Locale } from '@/shared/constants/i18n.constants';
import { getSelectStyles } from './LanguageSelector.molecule.styles';
import type { LanguageSelectorProps } from './LanguageSelector.types';

export const LanguageSelector = ({ className, sx }: LanguageSelectorProps) => {
  const { i18n } = useI18n();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      css={[getSelectStyles(), sx]}
      className={className}
      aria-label="Select Language"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {LANGUAGE_LABELS[l] || l.toUpperCase()}
        </option>
      ))}
    </select>
  );
};