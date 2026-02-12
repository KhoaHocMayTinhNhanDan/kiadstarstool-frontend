import { useTranslation } from 'react-i18next';

/**
 * Custom hook to use i18next functionalities.
 * @returns { t, i18n } - Hàm dịch và instance của i18next.
 */
export const useI18n = () => useTranslation();