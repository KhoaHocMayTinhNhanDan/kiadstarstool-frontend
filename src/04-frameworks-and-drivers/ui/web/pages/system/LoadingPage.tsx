import React from 'react';

export const LoadingPage = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: '#666', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #2196f3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: 16
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p>Đang tải dữ liệu...</p>
    </div>
  );
};