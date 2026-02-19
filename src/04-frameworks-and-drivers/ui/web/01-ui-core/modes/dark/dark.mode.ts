import { type Mode } from '../base/base.mode';

export const darkMode: Mode = {  // ✅ Sửa từ ColorMode thành Mode
  id: 'dark',
  name: 'Tối',
  
  colors: {
    background: {
      primary: '#1A202C',
      secondary: '#2D3748',
      tertiary: '#4A5568',
    },
    
    surface: {
      primary: '#2D3748',
      secondary: '#4A5568',
      tertiary: '#718096',
    },
    
    text: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      tertiary: '#CBD5E0',
      disabled: '#718096',
      inverse: '#1A202C',
    },
    
    border: {
      light: '#4A5568',
      default: '#718096',
      heavy: '#CBD5E0',
      focus: '#3182CE',
    },
    
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8)',
    },
    
    overlay: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      heavy: 'rgba(255, 255, 255, 0.3)',
    },
  },
};