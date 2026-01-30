/** @jsxImportSource @emotion/react */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Icon } from '../../atoms/Icon';
import * as styles from './Modal.styles';
import type { ModalProps } from './Modal.types';

const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
);

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  sx,
}: ModalProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay css={styles.overlay} />
        <DialogPrimitive.Content 
          css={[styles.content(size), sx]}
          onPointerDownOutside={(e) => {
            if (!closeOnOverlayClick) {
              e.preventDefault();
            }
          }}
        >
          {(title || showCloseButton) && (
            <div css={styles.header}>
              {title && (
                <DialogPrimitive.Title css={styles.title}>
                  {title}
                </DialogPrimitive.Title>
              )}
              {showCloseButton && (
                <DialogPrimitive.Close css={styles.closeButton} aria-label="Close">
                  <Icon size="sm">{CloseIcon}</Icon>
                </DialogPrimitive.Close>
              )}
            </div>
          )}

          <div css={styles.body}>{children}</div>

          {footer && <div css={styles.footer}>{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

Modal.displayName = 'Modal';