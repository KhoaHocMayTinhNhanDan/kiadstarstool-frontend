import { useState, useRef } from 'react';
import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Toast, ToastTitle, ToastDescription, ToastAction, ToastClose, ToastProvider, ToastViewport } from './Toast.molecule';

export const ToastTest = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const timerRef = useRef(0);

  return (
    <ToastProvider swipeDirection="right">
      <Box p="24px">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
          🍞 Toast Demo
        </Text>

        <Box display="flex" gap="16px" flexWrap="wrap">
          <Button 
            onClick={() => {
              setOpen(false);
              window.clearTimeout(timerRef.current);
              timerRef.current = window.setTimeout(() => setOpen(true), 100);
            }}
          >
            Show Success Toast
          </Button>

          <Button 
            variant="danger"
            onClick={() => {
              setOpenError(false);
              window.setTimeout(() => setOpenError(true), 100);
            }}
          >
            Show Error Toast
          </Button>

          <Button 
            variant="outline"
            onClick={() => {
              setOpenAction(false);
              window.setTimeout(() => setOpenAction(true), 100);
            }}
          >
            Show Action Toast
          </Button>
        </Box>

        <Toast open={open} onOpenChange={setOpen} variant="success">
          <ToastTitle>Success!</ToastTitle>
          <ToastDescription>Your changes have been saved successfully.</ToastDescription>
        </Toast>

        <Toast open={openError} onOpenChange={setOpenError} duration={5000} variant="error">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
          <ToastClose />
        </Toast>

        <Toast open={openAction} onOpenChange={setOpenAction}>
          <Box>
            <ToastTitle>Update Available</ToastTitle>
            <ToastDescription>A new version is available.</ToastDescription>
          </Box>
          <ToastAction altText="Update now" asChild>
            <Button size="sm" variant="secondary">Update</Button>
          </ToastAction>
        </Toast>

        <ToastViewport />
      </Box>
    </ToastProvider>
  );
};