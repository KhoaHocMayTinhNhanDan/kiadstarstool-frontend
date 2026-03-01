import type { Theme, ThemeId, ThemeDictionary } from './base/base.theme'; // ✅ Giờ đã có
import { defaultTheme } from './default/default.theme';
import { cosmicTheme } from './cosmic/cosmic.theme';
import { ironmanTheme } from './ironman/ironman.theme';
import { COLORS } from '../constants/tokens-constants';

export const themes: ThemeDictionary = {
  default: defaultTheme,
  cosmic: cosmicTheme,
  ironman: ironmanTheme,
};

export const themeMetadata = {
  default: {
    id: 'default',
    name: 'Mặc định',
    description: 'Phong cách đơn giản, tối ưu cho công việc',
    icon: '🎯',
    previewColor: COLORS.PRIMARY,
  },
  cosmic: {
    id: 'cosmic',
    name: 'Vũ Trụ',
    description: 'Huyền bí và lấp lánh với hiệu ứng thiên hà',
    icon: '🌌',
    previewColor: '#6B46C1',
  },
  ironman: {
    id: 'ironman',
    name: 'Ironman',
    description: 'Công nghệ cao với ánh kim loại đỏ-vàng',
    icon: '🤖',
    previewColor: '#E53E3E',
  },
} as const;

export const availableThemeIds: ThemeId[] = ['default', 'cosmic', 'ironman'];
export const availableThemes = Object.values(themeMetadata);

export const isValidTheme = (themeId: string): themeId is ThemeId => {
  return availableThemeIds.includes(themeId as ThemeId);
};

export const getTheme = (themeId: ThemeId | string): Theme => {
  if (isValidTheme(themeId)) {
    return themes[themeId];
  }
  console.warn(`Theme "${themeId}" not found, falling back to default`);
  return themes.default;
};