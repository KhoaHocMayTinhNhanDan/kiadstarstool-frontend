import { useState } from 'react';
import LoginForm, { type LoginFormData } from './LoginForm.organism';
import { Box, Text } from '../../../atoms';

export const LoginFormPlayground = () => {
  // State cho Interactive Demo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (data: LoginFormData) => {
    setLoading(true);
    setError(undefined);
    
    console.log('Form submitted:', data);

    // Giả lập gọi API
    setTimeout(() => {
      setLoading(false);
      // Giả lập lỗi nếu email chứa từ "error"
      if (data.email.includes('error')) {
        setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
      } else {
        alert(`Đăng nhập thành công!\nEmail: ${data.email}\nPassword: ${data.password}\nRemember: ${data.rememberMe}`);
      }
    }, 1500);
  };

  return (
    <Box style={{ padding: '40px', backgroundColor: '#f4f4f5', minHeight: '100vh' }}>
      <Text as="h1" size="3xl" weight="bold" style={{ marginBottom: '40px', textAlign: 'center' }}>
        🎨 LoginForm Playground
      </Text>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
        
        {/* Case 1: Interactive Demo */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '16px', textAlign: 'center' }}>
            1. Interactive Demo
          </Text>
          <Text size="sm" style={{ marginBottom: '16px', textAlign: 'center', color: '#666' }}>
            (Nhập "error" vào email để test lỗi)
          </Text>
          <LoginForm 
            onSubmit={handleSubmit}
            isLoading={loading}
            errorMessage={error}
          />
        </div>

        {/* Case 2: Loading State */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '16px', textAlign: 'center' }}>
            2. Loading State
          </Text>
          <Text size="sm" style={{ marginBottom: '16px', textAlign: 'center', color: '#666' }}>
            (Mô phỏng trạng thái đang gửi dữ liệu)
          </Text>
          <LoginForm 
            onSubmit={() => {}}
            isLoading={true}
          />
        </div>

        {/* Case 3: Error State */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '16px', textAlign: 'center' }}>
            3. Error State
          </Text>
          <Text size="sm" style={{ marginBottom: '16px', textAlign: 'center', color: '#666' }}>
            (Mô phỏng hiển thị lỗi từ server)
          </Text>
          <LoginForm 
            onSubmit={() => {}}
            errorMessage="Tài khoản của bạn đã bị khóa do đăng nhập sai quá nhiều lần."
          />
        </div>

      </div>
    </Box>
  );
};