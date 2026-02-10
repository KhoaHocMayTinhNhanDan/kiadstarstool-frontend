/** @jsxImportSource @emotion/react */
import { Box } from '../../00-atoms/Box';
import { Button } from '../../00-atoms/Button';
import { Text } from '../../00-atoms/Text';
import { Toast } from './Toast.molecule';
import { useToast } from '../../../hooks/user/useToast';

export const ToastPlayground = () => {
  const { toast } = useToast();

  return (
    <Box padding="lg" display="flex" flexDirection="column" gap="xl">
      <Box>
        <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
          🍞 Toast Demo
        </Text>
        <Text color="neutral" sx={{ marginBottom: '16px' }}>
          Hệ thống Toast sử dụng Context và Portal để hiển thị thông báo toàn cục.
        </Text>
      </Box>

      {/* Interactive Demo */}
      <Box>
        <Text as="h3" size="lg" weight="semibold" sx={{ marginBottom: '16px' }}>
          Interactive Triggers (useToast)
        </Text>
        <Box display="flex" gap="md" flexWrap="wrap">
          <Button onClick={() => toast.success('Thao tác thành công!', 'Success')}>
            Success
          </Button>

          <Button intent="danger" onClick={() => toast.error('Đã có lỗi xảy ra.', 'Error')}>
            Error
          </Button>

          <Button variant="secondary" onClick={() => toast.info('Có bản cập nhật mới.', 'Info')}>
            Info
          </Button>

          <Button variant="outline" onClick={() => toast.warning('Vui lòng kiểm tra lại dữ liệu.', 'Warning')}>
            Warning
          </Button>
        </Box>
      </Box>

      {/* Static Visuals */}
      <Box>
        <Text as="h3" size="lg" weight="semibold" sx={{ marginBottom: '16px' }}>
          Static Visuals (Component)
        </Text>
        <Box display="flex" flexDirection="column" gap="md" maxWidth="400px">
          <Toast variant="success" title="Success Title" onClose={() => {}}>
            Nội dung thông báo thành công mẫu.
          </Toast>

          <Toast variant="error" title="Error Title" onClose={() => {}}>
            Nội dung thông báo lỗi mẫu.
          </Toast>

          <Toast variant="info" title="Info Title">
            Thông báo thông tin (không có nút đóng).
          </Toast>
        </Box>
      </Box>
    </Box>
  );
};