// src/04-frameworks-and-drivers/ui/web/01-ui-core/themes/base/theme.types.ts
// Định nghĩa tất cả types liên quan đến theme
export type ThemeId = 'default' | 'cosmic' | 'ironman';

export type SidebarShape = 'rectangle' | 'curved' | 'hexagonal';
export type SidebarPosition = 'left' | 'right';

export type CardStyle = 'flat' | 'neumorphic' | 'glossy' | 'holographic';

export type HeaderStyle = 'solid' | 'glass' | 'floating';

export interface GradientColors {
  primary: string;
  secondary: string;
}

export interface MetallicColors {
  gold: string;
  silver: string;
  bronze: string;
}

export interface ParticleEffect {
  enabled: boolean;
  color: string;
  density: number;
}

export interface GlitchEffect {
  enabled: boolean;
  intensity: number;
}

export interface ScanlineEffect {
  enabled: boolean;
  opacity: number;
}

export interface ThemeEffects {
  particle?: ParticleEffect;
  glitch?: GlitchEffect;
  scanline?: ScanlineEffect;
}