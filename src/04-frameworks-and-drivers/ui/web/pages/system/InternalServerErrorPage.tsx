import React from 'react';

export const InternalServerErrorPage = () => {
  return (
    <div style={{ padding: 48, textAlign: 'center', color: '#666', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: 72, margin: 0, color: '#f44336' }}>500</h1>
      <h2 style={{ marginTop: 0 }}>Lỗi hệ thống</h2>
      <p>Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau.</p>
      <button 
        onClick={() => window.location.reload()}
        style={{ 
          display: 'inline-block',
          marginTop: 16,
          padding: '10px 20px',
          backgroundColor: '#2196f3',
          color: 'white', 
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 16
        }}
      >
        ↻ Tải lại trang
      </button>
    </div>
  );
};