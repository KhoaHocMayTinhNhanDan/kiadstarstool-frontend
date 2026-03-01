/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '../../../01-ui-core/hooks/useTheme';
import { useMode } from '../../../01-ui-core/hooks/useMode';
import { Box } from '../../../00-design-system/00-atoms';

export const CosmicLayout = () => {
  const { theme } = useTheme();
  const { mode } = useMode();

  const cosmicStyles = css`
    background-color: ${mode.id === 'dark' ? '#0b0b1e' : '#f0f4f8'};
    background-image: ${mode.id === 'dark' 
      ? 'radial-gradient(circle at 10% 20%, rgba(90, 90, 255, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(200, 50, 255, 0.1) 0%, transparent 20%)' 
      : 'none'};
    color: ${mode.colors.text.primary};
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', sans-serif; /* Giả sử font tròn trịa */
  `;

  const sidebarStyles = css`
    width: 80px; /* Collapsed style default */
    background: ${mode.id === 'dark' ? 'rgba(20, 20, 40, 0.8)' : 'white'};
    backdrop-filter: blur(10px);
    border-right: 1px solid ${mode.colors.border.light};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
    transition: width 0.3s ease;
    
    &:hover {
      width: 240px;
    }

    @media (max-width: 768px) {
      display: none; /* Ẩn sidebar trên mobile cho layout demo này */
    }
  `;

  const contentStyles = css`
    flex: 1;
    padding: 32px;
    margin: 16px;
    background: ${mode.colors.surface.primary};
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      margin: 0;
      border-radius: 0;
      padding: 16px;
    }
  `;

  return (
    <Box css={cosmicStyles}>
      <aside css={sidebarStyles}>
        <div style={{ 
          width: '40px', height: '40px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          marginBottom: '40px'
        }} />
        
        {/* Icons only nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ width: '24px', height: '24px', background: mode.colors.text.secondary, borderRadius: '4px' }} />
          <div style={{ width: '24px', height: '24px', background: mode.colors.text.secondary, borderRadius: '4px', opacity: 0.5 }} />
          <div style={{ width: '24px', height: '24px', background: mode.colors.text.secondary, borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </aside>

      <main css={contentStyles}>
        <header style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.5px' }}>Cosmic Dashboard</h1>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </Box>
  );
};