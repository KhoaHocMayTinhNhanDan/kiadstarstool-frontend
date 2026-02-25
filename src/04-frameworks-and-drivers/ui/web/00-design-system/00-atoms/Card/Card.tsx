/** @jsxImportSource @emotion/react */
import React from 'react';
import { keyframes } from '@emotion/react';
import { Box } from '../Box';
import { type CardProps } from './Card.types';
import { SHADOWS, COLORS } from '../../../01-ui-core/constants/tokens-constants';
import { useRipple } from '../../../01-ui-core/hooks/useRipple';

const rippleAnim = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

/**
 * Card Component
 * 
 * Một component bề mặt đa dụng được xây dựng trên Box.
 * Nó cung cấp các style mặc định cho thẻ bài, như padding, background, border, và shadow.
 * Nó kế thừa tất cả các props về layout và sự kiện từ Box.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ sx, onClick, rippleColor = 'rgba(0, 0, 0, 0.1)', ...rest }, ref) => {
    const { ripples, addRipple } = useRipple();

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // Chỉ kích hoạt ripple nếu Card có sự kiện onClick (có thể tương tác)
      if (onClick) {
        addRipple(e);
      }
    };

    return (
      <Box
        ref={ref}
        p="md" // Padding mặc định
        bg="BACKGROUND_PAPER"
        radius="md"
        onClick={onClick}
        onMouseDown={handleMouseDown} // Kích hoạt ripple khi nhấn chuột
        sx={{
          border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
          boxShadow: SHADOWS.sm,
          position: 'relative', // Bắt buộc để ripple định vị tuyệt đối
          overflow: 'hidden',   // Bắt buộc để ripple không tràn ra ngoài
          ...sx, // Cho phép ghi đè style bằng prop sx
        }}
        {...rest} // Truyền xuống tất cả các props khác, bao gồm children và onClick
      >
        {rest.children}
        {/* Render Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            css={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: rippleColor, // Màu của gợn sóng
              transform: 'scale(0)',
              animation: `${rippleAnim} 0.6s linear`,
              pointerEvents: 'none', // Không chặn click của các phần tử con
            }}
          />
        ))}
      </Box>
    );
  }
);

Card.displayName = 'Card';