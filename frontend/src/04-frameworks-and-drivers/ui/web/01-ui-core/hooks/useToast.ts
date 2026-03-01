import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import type { ToastType, ToastMessage } from '../contexts/ToastContext';

interface ToastOptions {
  description: string;
  title?: string;
  duration?: number;
}

interface UseToastReturn {
  toast: {
    success: (description: string, title?: string, duration?: number) => void;
    error: (description: string, title?: string, duration?: number) => void;
    info: (description: string, title?: string, duration?: number) => void;
    warning: (description: string, title?: string, duration?: number) => void;
    show: (type: ToastType, options: ToastOptions) => void;
  };
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  toasts: ToastMessage[];
}

export const useToast = (): UseToastReturn => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, clearToasts, toasts } = context;

  // Generic method to show any toast type
  const show = (type: ToastType, { description, title, duration }: ToastOptions) => {
    addToast({ type, description, title, duration });
  };

  // Convenience methods
  const toast = {
    success: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'success', description, title, duration }),
    error: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'error', description, title, duration }),
    info: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'info', description, title, duration }),
    warning: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'warning', description, title, duration }),
    show, // Generic method for dynamic usage
  };

  return {
    toast,
    addToast,
    removeToast,
    clearToasts,
    toasts,
  };
};