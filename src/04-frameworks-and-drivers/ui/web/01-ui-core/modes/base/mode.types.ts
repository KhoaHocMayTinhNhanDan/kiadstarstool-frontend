/**
 * Mode Types
 * Định nghĩa types cho light/dark mode
 */

export type ModeId = 'light' | 'dark';

export interface ModeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  
  // Surface colors (cards, modals, etc.)
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
  
  // Semantic colors
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  
  // Status colors
  status: {
    active: string;
    inactive: string;
    pending: string;
    completed: string;
    cancelled: string;
  };
  
  // Overlay colors
  overlay: {
    light: string;
    medium: string;
    heavy: string;
  };
}

export interface ModeEffects {
  // Shadows
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Blur effects
  blur?: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface Mode {
  id: ModeId;
  name: string;
  colors: ModeColors;
  effects: ModeEffects;
}

export type ModeDictionary = Record<ModeId, Mode>;