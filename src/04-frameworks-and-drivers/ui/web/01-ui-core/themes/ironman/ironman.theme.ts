/**
 * Ironman Theme
 * 
 * Phong cách công nghệ cao với cảm hứng từ Ironman
 * - Màu đỏ - vàng đặc trưng
 * - Góc cạnh, mạnh mẽ
 * - Hiệu ứng kim loại và arc reactor
 */

import type { Theme } from '../base/base.theme';

export const ironmanTheme: Theme = {
  id: 'ironman',
  name: 'Ironman',
  description: 'Công nghệ cao với ánh kim loại đỏ-vàng',

  // Theme-specific colors
  colors: {
    // Primary colors - Ironman signature
    primary: '#E53E3E',        // Đỏ Ironman
    secondary: '#F6AD55',       // Cam vàng
    accent: '#FBBF24',          // Vàng arc reactor
    
    // Metallic colors
    metallic: {
      gold: '#F6E05E',          // Vàng kim loại
      silver: '#CBD5E0',        // Bạc
      bronze: '#ED8936',        // Đồng
    },
    
    // Ironman không có gradient
    gradient: undefined,
  },

  // Layout configuration
  layout: {
    sidebar: {
      shape: 'hexagonal',       // Góc cạnh như công nghệ
      position: 'left',          // Bên trái
    },
    cards: {
      style: 'flat',             // Card phẳng nhưng góc cạnh
      borderRadius: '4px',       // Góc hơi nhọn (bán kính nhỏ)
    },
    header: {
      style: 'solid',            // Header đặc như kim loại
    },
  },

  // Effects - Hiệu ứng đặc trưng của Ironman
  effects: {
    // Arc reactor effect
    particle: {
      enabled: true,
      color: '#F6AD55',          // Màu cam ánh sáng
      density: 30,                // Mật độ hạt vừa phải
    },
    
    // Glitch effect nhẹ cho cảm giác công nghệ
    glitch: {
      enabled: true,
      intensity: 0.3,             // Cường độ thấp, tinh tế
    },
    
    // Scanline effect như màn hình radar
    scanline: {
      enabled: true,
      opacity: 0.1,               // Rất nhẹ
    },
  },
};