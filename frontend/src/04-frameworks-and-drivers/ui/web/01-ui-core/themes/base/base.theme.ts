// src/04-frameworks-and-drivers/ui/web/01-ui-core/themes/base/base.theme.ts
import type {
  ThemeId,
  SidebarShape,
  SidebarPosition,
  CardStyle,
  HeaderStyle,
  GradientColors,
  MetallicColors,
  ThemeEffects,
} from './theme.types';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  
  // Theme-specific colors (override mode colors)
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    gradient?: GradientColors;
    metallic?: MetallicColors;
  };
  
  // Layout configuration
  layout: {
    sidebar: {
      shape: SidebarShape;
      position?: SidebarPosition;
      width?: string;
      collapsedWidth?: string;
    };
    cards: {
      style: CardStyle;
      borderRadius?: string;
    };
    header: {
      style: HeaderStyle;
    };
  };
  
  // Effects
  effects?: ThemeEffects;
}

// ✅ THÊM: Export ThemeDictionary
export type ThemeDictionary = Record<ThemeId, Theme>;

// ✅ Export luôn ThemeId nếu chưa có
export type { ThemeId } from './theme.types';