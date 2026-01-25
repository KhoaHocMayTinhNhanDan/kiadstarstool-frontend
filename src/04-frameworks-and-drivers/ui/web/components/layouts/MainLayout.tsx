// src/04-frameworks-and-drivers/ui/web/components/layouts/MainLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../../infrastructure/router/router';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { LanguageSelector } from '../molecules/LanguageSelector';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar Giả lập */}
      <aside style={{ width: 240, backgroundColor: '#1e293b', color: 'white', padding: 20 }}>
        <h2 style={{ marginTop: 0, fontSize: 20 }}>KiadStars Tool</h2>
        <nav style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to={ROUTES.DASHBOARD} style={{ color: '#e2e8f0', textDecoration: 'none', padding: '8px 0' }}>
            📊 Dashboard
          </Link>
          <Link to={ROUTES.DEV_UI} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
            🛠️ Dev UI
          </Link>
          <hr style={{ borderColor: '#334155', width: '100%' }} />
          <Link to={ROUTES.LOGIN} style={{ color: '#f87171', textDecoration: 'none', padding: '8px 0' }}>
            🚪 Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 60, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', backgroundColor: 'white' }}>
          <span style={{ fontWeight: 500 }}>Header Area</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LanguageSelector />
            <ThemeToggle />
            {/* Sau này thêm UserProfileDropdown vào đây */}
          </div>
        </header>
        
        <main style={{ flex: 1, backgroundColor: '#f8fafc', overflow: 'auto' }}>
          {/* Nội dung của DashboardPage sẽ hiện ở đây */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};