/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ThemeColors } from './AppHeader.types';

export const header = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  min-height: 64px; /* Thay height cứng bằng min-height để co giãn */
  height: auto;
  background-color: ${themeColors?.surface || (mode === 'dark' ? '#1a1a1a' : '#ffffff')};
  border-bottom: 1px solid ${themeColors?.border?.default || (mode === 'dark' ? '#333' : '#e2e8f0')};
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* Left, Center, Right */
  align-items: center;
  padding: 0 16px 0 24px;
  position: sticky;
  top: 0;
  z-index: 99;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  width: 100%;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 8px 12px; /* Thêm padding dọc để thoáng hơn khi xuống dòng */
    gap: 12px;
    display: flex; /* Chuyển sang Flexbox trên mobile để dễ wrap */
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const leftSection = css`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-self: start;
  min-width: 0; /* Prevent overflow */

  @media (max-width: 768px) {
    flex: 1 1 auto; /* Cho phép co giãn tự nhiên */
    min-width: auto;
  }
`;

export const leftSectionContent = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const logoWrapper = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const nav = css`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const navItem = (isActive: boolean, mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  color: ${isActive 
    ? (themeColors?.primary || '#3182CE') 
    : (themeColors?.text?.secondary || (mode === 'dark' ? '#a0aec0' : '#4a5568'))};
  text-decoration: none;
  font-size: 14px;
  font-weight: ${isActive ? 500 : 400};
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${themeColors?.background || (mode === 'dark' ? '#2d3748' : '#f7fafc')};
    color: ${themeColors?.text?.primary || (mode === 'dark' ? '#fff' : '#1a202c')};
  }
`;

export const navItemIcon = css`
  display: flex;
  margin-right: 8px;
`;

export const rightSection = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  justify-self: end;
  grid-column: 3; /* Đẩy sang cột thứ 3 (Right) trong grid */

  @media (max-width: 768px) {
    flex: 0 0 auto; /* Giữ nguyên kích thước các nút bên phải */
    margin-left: auto; /* FIX: Tự động đẩy sang phải bất kể đang ở dòng nào */
  }
`;

export const actionsWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const searchContainer = css`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const iconButton = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid ${themeColors?.border?.light || (mode === 'dark' ? '#4a5568' : '#e2e8f0')};
  color: ${themeColors?.text?.secondary || (mode === 'dark' ? '#a0aec0' : '#4a5568')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${themeColors?.background || (mode === 'dark' ? '#2d3748' : '#f7fafc')};
    border-color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
    color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
  }
`;

export const userMenuContainer = css`
  position: relative;
  margin-left: 4px;
`;

export const userButton = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 4px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid ${themeColors?.border?.light || (mode === 'dark' ? '#4a5568' : '#e2e8f0')};
  color: ${themeColors?.text?.primary || (mode === 'dark' ? '#e2e8f0' : '#1a202c')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${themeColors?.background || (mode === 'dark' ? '#2d3748' : '#f7fafc')};
    border-color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
  }
`;

export const userAvatar = css`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
`;

export const userAvatarPlaceholder = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

export const userName = css`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const dropdownIcon = (themeColors?: any) => css`
  margin-left: 4px;
  color: ${themeColors?.text?.tertiary || '#a0aec0'};
`;

export const userMenu = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background-color: ${themeColors?.surface || (mode === 'dark' ? '#1a1a1a' : '#ffffff')};
  border: 1px solid ${themeColors?.border?.default || (mode === 'dark' ? '#333' : '#e2e8f0')};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
`;

export const userInfo = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  padding: 12px 16px;
  border-bottom: 1px solid ${themeColors?.border?.light || (mode === 'dark' ? '#2d3748' : '#e2e8f0')};
`;

export const userInfoName = css`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const userInfoEmail = (themeColors?: any) => css`
  font-size: 12px;
  color: ${themeColors?.text?.secondary || '#718096'};
  margin-bottom: 4px;
`;

export const userInfoRole = (themeColors?: any) => css`
  font-size: 12px;
  color: ${themeColors?.primary || '#3182CE'};
`;

export const menuItems = css`
  padding: 8px;
`;

export const menuDivider = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  height: 1px;
  background-color: ${themeColors?.border?.light || (mode === 'dark' ? '#2d3748' : '#e2e8f0')};
  margin: 8px;
`;

export const menuItem = (danger?: boolean, mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: ${danger 
    ? (mode === 'dark' ? '#fc8181' : '#e53e3e')
    : (themeColors?.text?.primary || (mode === 'dark' ? '#e2e8f0' : '#1a202c'))};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${danger
      ? (mode === 'dark' ? '#742a2a' : '#fff5f5')
      : (themeColors?.background || (mode === 'dark' ? '#2d3748' : '#f7fafc'))};
  }
`;

export const menuItemIcon = css`
  display: flex;
  align-items: center;
`;