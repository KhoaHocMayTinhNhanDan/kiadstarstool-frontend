/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ThemeColors } from './AppSidebar.types';

export const container = (
  collapsed: boolean, 
  width?: number | string, 
  collapsedWidth?: number | string,
  mode?: 'light' | 'dark',
  themeColors?: ThemeColors
) => css`
  width: ${collapsed 
    ? (collapsedWidth || '72px') 
    : (width || '260px')};
  height: 100vh;
  background-color: ${themeColors?.surface || (mode === 'dark' ? '#1a1a1a' : '#ffffff')};
  border-right: 1px solid ${themeColors?.border?.default || (mode === 'dark' ? '#333' : '#e2e8f0')};
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  transition: width 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  z-index: 100;
`;

export const header = css`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
`;

export const collapseButton = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  position: absolute;
  right: -12px;
  top: 72px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${themeColors?.surface || (mode === 'dark' ? '#2d3748' : '#ffffff')};
  border: 1px solid ${themeColors?.border?.default || (mode === 'dark' ? '#4a5568' : '#e2e8f0')};
  color: ${themeColors?.text?.secondary || (mode === 'dark' ? '#a0aec0' : '#4a5568')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
    border-color: ${themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')};
    color: ${themeColors?.text?.inverse || '#ffffff'};
  }
`;

export const content = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export const groupLabel = (
  collapsed: boolean, 
  mode?: 'light' | 'dark',
  themeColors?: ThemeColors
) => css`
  padding: ${collapsed ? '16px 0 8px 0' : '16px 16px 8px 16px'};
  font-size: 11px;
  font-weight: 600;
  color: ${themeColors?.text?.tertiary || (mode === 'dark' ? '#718096' : '#a0aec0')};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: ${collapsed ? 'center' : 'left'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const item = (
  isActive: boolean, 
  collapsed: boolean, 
  disabled: boolean,
  mode?: 'light' | 'dark',
  themeColors?: ThemeColors,
  borderRadius?: string
) => css`
  display: flex;
  align-items: center;
  padding: ${collapsed ? '12px 0' : '8px 16px'};
  margin: 2px 0;
  border-radius: ${borderRadius || '8px'};
  color: ${isActive 
    ? (themeColors?.text?.inverse || '#ffffff') 
    : (themeColors?.text?.primary || (mode === 'dark' ? '#e2e8f0' : '#1a202c'))};
  background-color: ${isActive 
    ? (themeColors?.primary || (mode === 'dark' ? '#4299e1' : '#3182CE')) 
    : 'transparent'};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.5 : 1};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${!disabled && !isActive 
      ? (themeColors?.background || (mode === 'dark' ? '#2d3748' : '#f7fafc')) 
      : ''};
  }

  ${collapsed && css`
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const itemIcon = (collapsed: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${!collapsed && 'margin-right: 12px;'}
  font-size: 20px;
`;

export const itemLabel = (collapsed: boolean) => css`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  ${collapsed && 'display: none;'}
`;

export const badge = (mode?: 'light' | 'dark') => css`
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${mode === 'dark' ? '#e53e3e' : '#c53030'};
  color: white;
  margin-left: 8px;
  min-width: 20px;
  text-align: center;
`;

export const footer = (mode?: 'light' | 'dark', themeColors?: ThemeColors) => css`
  padding: 16px;
  border-top: 1px solid ${themeColors?.border?.light || (mode === 'dark' ? '#2d3748' : '#e2e8f0')};
`;