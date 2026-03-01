import { type ReactNode } from 'react';
import { 
  ToastProvider as CoreToastProvider,
  type ToastMessage,
  type ToastType 
} from '../../01-ui-core/contexts/ToastContext';
import { useTheme } from '../../01-ui-core/hooks/useTheme';

// Re-export types for convenience
export type { ToastMessage, ToastType };

interface ToastProviderProps {
  children: ReactNode;
  /**
   * Default duration for toasts in milliseconds
   * @default 3000
   */
  defaultDuration?: number;
  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number;
  /**
   * Position of toasts on screen
   * @default 'bottom-right'
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastProvider = ({ 
  children, 
  defaultDuration = 3000,
  maxToasts = 5,
  position = 'bottom-right'
}: ToastProviderProps) => {
  const { theme } = useTheme();
  
  // App-specific configuration
  const getDurationByTheme = () => {
    switch (theme.id) {
      case 'cosmic':
        return 5000; // Cosmic theme shows toasts longer
      case 'ironman':
        return 4000; // Ironman theme medium duration
      default:
        return defaultDuration;
    }
  };

  // App-specific position based on theme or layout
  const getPositionByTheme = () => {
    if (theme.id === 'cosmic' && position === 'bottom-right') {
      // Cosmic theme might want toasts in a different position
      return 'bottom-right'; // Can be customized
    }
    return position;
  };

  // You can wrap the core provider with app-specific logic
  // For example: logging, analytics, etc.
  const handleAddToast = (toast: Omit<ToastMessage, 'id'>) => {
    // Log toast for analytics
    console.log('[Toast]', toast.type, toast.description);
    
    // You can modify toast based on app logic
    const enhancedToast = {
      ...toast,
      duration: toast.duration || getDurationByTheme(),
    };
    
    // Pass to core provider (but we can't directly access addToast here)
    // The core provider will handle the actual addition
    return enhancedToast;
  };

  return (
    <CoreToastProvider>
      {children}
    </CoreToastProvider>
  );
};

// Default export for convenience
export default ToastProvider;