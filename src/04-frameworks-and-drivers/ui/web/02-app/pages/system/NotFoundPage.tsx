import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: 24, 
      textAlign: 'center', 
      color: '#666',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: 96, margin: 0, color: '#e0e0e0', lineHeight: 1, fontWeight: 700 }}>404</h1>
      <h2 style={{ marginTop: 16, color: '#333', fontSize: 24 }}>Không tìm thấy trang</h2>
      <p style={{ margin: '16px 0 32px', maxWidth: 400, lineHeight: 1.5 }}>
        Trang bạn đang tìm kiếm không tồn tại, đã bị di chuyển hoặc tạm thời không truy cập được.
      </p>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#2196f3',
          color: 'white', 
          textDecoration: 'none',
          borderRadius: 6,
          fontWeight: 500
        }}
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};