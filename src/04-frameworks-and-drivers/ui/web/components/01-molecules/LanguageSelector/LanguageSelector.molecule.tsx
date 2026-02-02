/** @jsxImportSource @emotion/react */
import React from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { SUPPORTED_LOCALES, type Locale } from '@/shared/i18n/i18n.store';
import { LANGUAGE_LABELS } from '@/shared/i18n/constants';
import { getSelectStyles } from './LanguageSelector.molecule.styles';
import type { LanguageSelectorProps } from './LanguageSelector.types';

export const LanguageSelector = ({ className, sx }: LanguageSelectorProps) => {
  const { locale, setLocale } = useI18n();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <select
      value={locale}
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