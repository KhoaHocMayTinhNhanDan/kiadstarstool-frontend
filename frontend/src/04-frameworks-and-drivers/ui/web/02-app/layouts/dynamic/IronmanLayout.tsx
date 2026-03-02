/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '../../../01-ui-core/hooks/useTheme';
import { useMode } from '../../../01-ui-core/hooks/useLightDarkMode';
import { Box } from '../../../00-design-system/00-atoms';

export const IronmanLayout = () => {
  const { theme } = useTheme();
  const { mode } = useMode();

  // Ironman theme specific styles
  // Ví dụ: Viền sắc cạnh, màu đỏ/vàng đặc trưng, hiệu ứng glow
  const ironmanStyles = css`
    background-color: ${mode === 'dark' ? '#1a0505' : '#fff5f5'};
    color: ${theme.colors.text.primary};
    min-height: 100vh;
    display: flex;
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${mode === 'dark' ? '#2d0a0a' : '#ffe0e0'}; 
    }
    ::-webkit-scrollbar-thumb {
      background: #d4af37; /* Gold */
      border-radius: 0;
    }
  `;

  const sidebarStyles = css`
    width: 260px;
    background: ${mode === 'dark' ? 'linear-gradient(180deg, #7a0000 0%, #2d0000 100%)' : 'linear-gradient(180deg, #ff4d4d 0%, #990000 100%)'};
    border-right: 2px solid #d4af37;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 4px 0 15px rgba(212, 175, 55, 0.3);
  `;

  const contentStyles = css`
    flex: 1;
    padding: 24px;
    background-image: radial-gradient(circle at 50% 50%, ${mode === 'dark' ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.02)'} 0%, transparent 70%);
  `;

  return (
    <Box css={ironmanStyles}>
      {/* Sidebar giả lập cho Ironman Layout */}
      <aside css={sidebarStyles}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d4af37' }}>
          JARVIS
        </div>
        <nav>
          {/* Nav items would go here */}
          <div style={{ padding: '12px', borderLeft: '4px solid #d4af37', background: 'rgba(0,0,0,0.2)', marginBottom: '8px' }}>Dashboard</div>
          <div style={{ padding: '12px', opacity: 0.7 }}>Missions</div>
          <div style={{ padding: '12px', opacity: 0.7 }}>Armor</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main css={contentStyles}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '32px', 
          borderBottom: `1px solid ${theme.colors.border.default}`,
          paddingBottom: '16px'
        }}>
          <h1 style={{ margin: 0, fontFamily: 'monospace' }}>COMMAND CENTER</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>STATUS: ONLINE</span>
            <span>PWR: 100%</span>
          </div>
        </header>
        <Outlet />
      </main>
    </Box>
  );
};