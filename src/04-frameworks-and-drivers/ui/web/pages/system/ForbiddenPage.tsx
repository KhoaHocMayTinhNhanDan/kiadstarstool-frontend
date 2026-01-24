import React from 'react';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
  return (
    <div style={{ padding: 48, textAlign: 'center', color: '#666', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: 72, margin: 0, color: '#ff9800' }}>403</h1>
      <h2 style={{ marginTop: 0 }}>Không có quyền truy cập</h2>
      <p>Bạn không có đủ quyền hạn để xem nội dung này.</p>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block',
          marginTop: 16,
          color: '#2196f3', 
          textDecoration: 'none',
          fontWeight: 500 
        }}
      >
        ← Quay về trang chủ
      </Link>
    </div>
  );
};