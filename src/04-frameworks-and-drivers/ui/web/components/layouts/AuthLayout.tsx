import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Layout này tập trung nội dung vào giữa màn hình */}
      <div style={{ width: '100%', maxWidth: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};