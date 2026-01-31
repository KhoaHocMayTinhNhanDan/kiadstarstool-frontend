/** @jsxImportSource @emotion/react */
import { createPortal } from 'react-dom';
import { LoadingSpinner } from '../../../../atoms/LoadingSpinner';
import { Text } from '../../../../atoms/Text';
import * as styles from './LoadingOverlay.styles';
import type { LoadingOverlayProps } from './LoadingOverlay.types';

export const LoadingOverlay = ({ visible, text, fullScreen = true, className }: LoadingOverlayProps) => {
  if (!visible) return null;

  const overlayContent = (
    <div css={styles.overlay(fullScreen)} className={className}>
      <div css={styles.content}>
        <LoadingSpinner size="lg" />
        {text && <Text css={styles.text}>{text}</Text>}
      </div>
    </div>
  );

  // Render vào body nếu là fullScreen, ngược lại render tại chỗ (cho container cục bộ)
  return fullScreen ? createPortal(overlayContent, document.body) : overlayContent;
};