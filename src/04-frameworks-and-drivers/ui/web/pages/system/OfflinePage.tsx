import React from 'react';

export const OfflinePage = () => {
  return (
    <div style={{ padding: 48, textAlign: 'center', color: '#666', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: 72, margin: 0 }}>📡</h1>
      <h2 style={{ marginTop: 0 }}>Mất kết nối</h2>
      <p>Vui lòng kiểm tra lại đường truyền Internet của bạn.</p>
      <button 
        onClick={() => window.location.reload()}
        style={{ 
          display: 'inline-block',
          marginTop: 16,
          padding: '10px 20px',
          backgroundColor: '#607d8b',
          color: 'white', 
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 16
        }}
      >
        Thử lại
      </button>
    </div>
  );
};