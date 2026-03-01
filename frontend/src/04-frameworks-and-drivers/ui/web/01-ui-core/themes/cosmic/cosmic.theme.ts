/**
 * Cosmic Theme
 * 
 * Phong cách vũ trụ huyền bí
 * - Màu tím - xanh thiên hà
 * - Cong mềm mại
 * - Hiệu ứng sao và nebula
 */

import { type Theme } from '../base/base.theme';

export const cosmicTheme: Theme = {
  id: 'cosmic',
  name: 'Vũ Trụ',
  description: 'Huyền bí và lấp lánh với hiệu ứng thiên hà',

  // Theme-specific colors
  colors: {
    primary: '#6B46C1',        // Tím thiên hà
    secondary: '#3182CE',       // Xanh dương sâu
    accent: '#FBBF24',          // Vàng sao
    
    // Gradient như dải ngân hà
    gradient: {
      primary: 'linear-gradient(135deg, #6B46C1 0%, #3182CE 100%)',
      secondary: 'linear-gradient(45deg, #FBBF24 0%, #F687B3 100%)',
    },
    
    // Cosmic không có metallic
    metallic: undefined,
  },

  // Layout configuration
  layout: {
    sidebar: {
      shape: 'curved',          // Cong như cánh sao
      position: 'left',
    },
    cards: {
      style: 'glossy',           // Bóng như ánh sao
      borderRadius: '24px',       // Bo tròn nhiều
    },
    header: {
      style: 'glass',            // Trong suốt như kính vũ trụ
    },
  },

  // Effects - Hiệu ứng vũ trụ
  effects: {
    // Sao lấp lánh
    particle: {
      enabled: true,
      color: '#FBBF24',          // Màu vàng sao
      density: 50,                // Mật độ dày
    },
    
    // Cosmic không có glitch
    glitch: undefined,
    
    // Cosmic không có scanline
    scanline: undefined,
  },
};