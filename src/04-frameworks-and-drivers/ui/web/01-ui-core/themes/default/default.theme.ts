/**
 * Default Theme
 * 
 * Phong cách mặc định, đơn giản, tối ưu cho công việc
 * Không có hiệu ứng đặc biệt, tập trung vào readability
 */

import { type Theme } from '../base/base.theme';
import { COLORS } from '../../../00-design-system/00-atoms/00-core/tokens-constants';

export const defaultTheme: Theme = {
  id: 'default',
  name: 'Mặc định',
  description: 'Phong cách đơn giản, tối ưu cho công việc',

  // Theme-specific colors
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    accent: COLORS.WARNING,
    
    // Default theme không có gradient hay metallic
    gradient: undefined,
    metallic: undefined,
  },

  // Layout configuration
  layout: {
    sidebar: {
      shape: 'rectangle',        // Sidebar hình chữ nhật đơn giản
      position: 'left',          // Bên trái
    },
    cards: {
      style: 'flat',             // Card phẳng
      borderRadius: '8px',       // Bo góc nhẹ
    },
    header: {
      style: 'solid',            // Header đặc
    },
  },

  // Effects - Default không có hiệu ứng đặc biệt
  effects: {
    particle: undefined,
    glitch: undefined,
    scanline: undefined,
  },
};