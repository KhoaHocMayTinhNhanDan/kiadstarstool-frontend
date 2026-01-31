import { useContext } from 'react';
import { ToastContext } from '../components/providers/ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast } = context;

  const toast = {
    success: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'success', description, title, duration }),
    error: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'error', description, title, duration }),
    info: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'info', description, title, duration }),
    warning: (description: string, title?: string, duration?: number) => 
      addToast({ type: 'warning', description, title, duration }),
  };

  return { toast, addToast, removeToast };
};