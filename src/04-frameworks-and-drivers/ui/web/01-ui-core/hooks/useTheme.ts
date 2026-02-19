// 01-ui-core/hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Hook useTheme
 * 
 * Sử dụng để truy cập theme context (cosmic/ironman/default)
 * Chỉ chứa thông tin về PHONG CÁCH, không chứa mode sáng/tối
 * 
 * @example
 * const { theme, setTheme } = useTheme();
 * console.log(theme.id); // 'cosmic'
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};