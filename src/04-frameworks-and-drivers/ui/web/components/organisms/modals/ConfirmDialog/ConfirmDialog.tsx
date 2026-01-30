/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '../../../atoms/Button';
import { Text } from '../../../atoms/Text';
import { Icon } from '../../../atoms/Icon';
import { Modal } from '../../../molecules/Modal';
import * as styles from './ConfirmDialog.styles';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

const WarningIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
);

const InfoIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
);

const CheckCircleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  sx,
}: ConfirmDialogProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
      case 'warning':
        return WarningIcon;
      case 'success':
        return CheckCircleIcon;
      default:
        return InfoIcon;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      sx={sx}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            intent={variant === 'danger' ? 'danger' : variant === 'success' ? 'success' : 'default'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div css={styles.contentWrapper}>
        <div css={styles.iconWrapper(variant)}>
          <Icon size="lg">{getIcon()}</Icon>
        </div>
        <Text variant="heading-md">{title}</Text>
        <Text variant="body-sm" color="SECONDARY">{description}</Text>
      </div>
    </Modal>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';