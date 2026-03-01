/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const footer = (mode: any) => css`
  background-color: ${mode.colors.surface.primary};
  border-top: 1px solid ${mode.colors.border.default};
  padding: 24px 0;
  margin-top: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const container = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

export const copyright = (mode: any) => css`
  color: ${mode.colors.text.secondary};
  font-size: 14px;
`;

export const nav = css`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const link = (mode: any) => css`
  color: ${mode.colors.text.secondary};
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${mode.colors.primary};
  }
`;

export const linkIcon = css`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;

export const secondaryContent = css`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;