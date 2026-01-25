/** @jsxImportSource @emotion/react */
import { useI18n } from '../../providers/I18nProvider';
import { SUPPORTED_LOCALES } from '@/shared/i18n/i18n.store';
import { getSelectStyles } from './LanguageSelector.molecule.styles';

export interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
      css={getSelectStyles()}
      className={className}
      aria-label="Select Language"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {l === 'vi' ? '🇻🇳 Tiếng Việt' : l === 'en' ? '🇺🇸 English' : l === 'ja' ? '🇯🇵 日本語' : l.toUpperCase()}
        </option>
      ))}
    </select>
  );
};