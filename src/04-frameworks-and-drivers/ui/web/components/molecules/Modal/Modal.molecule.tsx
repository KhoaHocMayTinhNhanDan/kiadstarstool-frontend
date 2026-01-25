/** @jsxImportSource @emotion/react */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { overlayStyles, contentStyles, closeButtonStyles } from './Modal.molecule.styles';

export interface ModalProps extends DialogPrimitive.DialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal = ({ trigger, title, description, children, ...props }: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay css={overlayStyles} />
        <DialogPrimitive.Content css={contentStyles}>
          {title && (
            <DialogPrimitive.Title asChild>
              <Text as="h2" size="xl" weight="bold" style={{ marginBottom: 8 }}>{title}</Text>
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description asChild>
              <Text size="sm" color="SECONDARY" style={{ marginBottom: 20, lineHeight: 1.5 }}>{description}</Text>
            </DialogPrimitive.Description>
          )}
          
          {children}
          
          <DialogPrimitive.Close css={closeButtonStyles} aria-label="Close">
            <Icon size="sm"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></Icon>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};