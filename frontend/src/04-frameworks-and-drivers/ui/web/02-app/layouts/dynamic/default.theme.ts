// d:\DEV\learning\kiadstarstool-frontend\frontend\src\04-frameworks-and-drivers\ui\web\02-app\layouts\dynamic\default.theme.ts

import type { Theme } from '../../../01-ui-core/contexts/ThemeContext';

export const defaultThemeConfig: Omit<Theme, 'id'> = {
  colors: {
    primary: '#3182CE',
    background: { 
      primary: '#F7FAFC', 
      secondary: '#FFFFFF' 
    },
    text: { 
      primary: '#1A202C', 
      secondary: '#718096' 
    },
    border: { 
      default: '#E2E8F0', 
      light: '#EDF2F7' 
    },
    surface: { 
      primary: '#FFFFFF' 
    },
  },
  layout: { 
    sidebar: { 
      width: '260px', 
      collapsedWidth: '72px' 
    }, 
    cards: { 
      borderRadius: '8px' 
    } 
  }
};

export const defaultDarkThemeConfig: typeof defaultThemeConfig = {
  ...defaultThemeConfig,
  colors: {
    primary: '#63B3ED',
    background: { 
      primary: '#1A202C', 
      secondary: '#2D3748' 
    },
    text: { 
      primary: '#F7FAFC', 
      secondary: '#A0AEC0' 
    },
    border: { 
      default: '#4A5568', 
      light: '#2D3748' 
    },
    surface: { 
      primary: '#2D3748' 
    },
  }
};
