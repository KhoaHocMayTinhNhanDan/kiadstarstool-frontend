import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm.organism';
import type { ForgotPasswordFormData } from './ForgotPasswordForm.organism.types';
import { Box, Text } from '../../../00-atoms';
import { I18nProvider } from '../../../../app/providers/I18nProvider';
import { LanguageSelector } from '../../../01-molecules/LanguageSelector/LanguageSelector.molecule';

export const ForgotPasswordFormPlayground = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError(undefined);
    
    console.log('Forgot Password submitted:', data);

    setTimeout(() => {
      setLoading(false);
      if (data.email.includes('error')) {
        setError('Không tìm thấy tài khoản với email này.');
      } else {
        alert(`Đã gửi liên kết đặt lại mật khẩu tới: ${data.email}`);
      }
    }, 1500);
  };

  return (
    <I18nProvider>
      <Box style={{ padding: '40px', backgroundColor: '#f4f4f5', minHeight: '100vh', position: 'relative' }}>
        <Box position="absolute" top="20px" right="20px">
          <LanguageSelector />
        </Box>

        <Text as="h1" size="3xl" weight="bold" style={{ marginBottom: '40px', textAlign: 'center' }}>
          🔐 ForgotPasswordForm Playground
        </Text>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
          
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '16px', textAlign: 'center' }}>
              Interactive Demo
            </Text>
            <Text size="sm" style={{ marginBottom: '16px', textAlign: 'center', color: '#666' }}>
              (Nhập "error" vào email để test lỗi)
            </Text>
            
            <ForgotPasswordForm 
              onSubmit={handleSubmit}
              isLoading={loading}
              errorMessage={error}
              onBackToLogin={() => alert('Navigate back to login')}
            />
          </div>

        </div>
      </Box>
    </I18nProvider>
  );
};