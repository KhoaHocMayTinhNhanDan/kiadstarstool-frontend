// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/ImagePreview/ImagePreview.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Box } from '../../../00-atoms';
import * as styles from './ImagePreview.styles';
import type { ImagePreviewProps } from './ImagePreview.types';

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = 'Image preview',
  width,
  height,
  zoomable = true,
  caption,
  className,
  sx,
  testId = 'image-preview',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (zoomable) setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Box
        css={[styles.container(zoomable), sx]}
        className={className}
        data-testid={testId}
        onClick={handleOpen}
        style={{ width, height }}
      >
        <img src={src} alt={alt} css={styles.image} loading="lazy" />
      </Box>

      {isOpen && createPortal(
        <div css={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
          <button css={styles.closeButton} onClick={handleClose} aria-label="Close preview">
            <X size={24} />
          </button>
          <img src={src} alt={alt} css={styles.zoomedImage} onClick={(e) => e.stopPropagation()} />
          {caption && <div css={styles.caption}>{caption}</div>}
        </div>,
        document.body
      )}
    </>
  );
};