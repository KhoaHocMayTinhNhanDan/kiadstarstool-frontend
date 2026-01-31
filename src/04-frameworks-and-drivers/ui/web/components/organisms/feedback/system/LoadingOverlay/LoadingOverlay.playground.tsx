/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box } from '../../../../atoms/Box';
import { Button } from '../../../../atoms/Button';
import { Text } from '../../../../atoms/Text';
import { LoadingOverlay } from './LoadingOverlay';

export const LoadingOverlayPlayground = () => {
  const [isFullScreenVisible, setFullScreenVisible] = useState(false);
  const [isLocalVisible, setLocalVisible] = useState(false);

  const showFullScreen = () => {
    setFullScreenVisible(true);
    setTimeout(() => setFullScreenVisible(false), 3000);
  };

  const showLocal = () => {
    setLocalVisible(true);
    setTimeout(() => setLocalVisible(false), 3000);
  };

  return (
    <Box padding="lg" display="flex" flexDirection="column" gap="xl">
      <Box>
        <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
          ⏳ Loading Overlay Demo
        </Text>
        <Text color="neutral" sx={{ marginBottom: '16px' }}>
          Hiển thị trạng thái tải toàn màn hình hoặc trong một container cụ thể.
        </Text>
      </Box>

      {/* Full Screen Demo */}
      <Box>
        <Text as="h3" size="lg" weight="semibold" sx={{ marginBottom: '16px' }}>
          Full Screen Overlay
        </Text>
        <Button onClick={showFullScreen} disabled={isFullScreenVisible}>
          Show Full Screen Loading (3s)
        </Button>
        <LoadingOverlay visible={isFullScreenVisible} text="Đang xử lý..." />
      </Box>

      {/* Local Container Demo */}
      <Box>
        <Text as="h3" size="lg" weight="semibold" sx={{ marginBottom: '16px' }}>
          Local Container Overlay
        </Text>
        <Box 
          sx={{ 
            position: 'relative', 
            height: '200px', 
            border: '1px dashed #ccc', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Button onClick={showLocal} disabled={isLocalVisible}>Show Local Loading (3s)</Button>
          <LoadingOverlay visible={isLocalVisible} fullScreen={false} />
        </Box>
      </Box>
    </Box>
  );
};