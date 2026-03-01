export interface ModeColors {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  
  // Surface colors
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
  };
  
  // Border colors
  border: {
    light: string;
    default: string;
    heavy: string;
    focus: string;
  };
  
  // Shadows (điều chỉnh cho từng mode)
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Overlay colors
  overlay: {
    light: string;
    medium: string;
    heavy: string;
  };
}

export interface Mode {
  id: 'light' | 'dark';
  name: string;
  colors: ModeColors;
}

export type ModeId = 'light' | 'dark';