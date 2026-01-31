/** @jsxImportSource @emotion/react */
import { createContext, useState, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from '../molecules/Toast';
import { Box } from '../atoms/Box';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  description: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ type, title, description, duration = 3000 }: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, description, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Render Toasts via Portal to ensure they are on top */}
      {createPortal(
        <Box
          sx={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none', // Allow clicking through the container
          }}
        >
          {toasts.map((toast) => (
            <Box key={toast.id} sx={{ pointerEvents: 'auto' }}>
              <Toast
                variant={toast.type}
                title={toast.title}
                onClose={() => removeToast(toast.id)}
              >
                {toast.description}
              </Toast>
            </Box>
          ))}
        </Box>,
        document.body
      )}
    </ToastContext.Provider>
  );
};