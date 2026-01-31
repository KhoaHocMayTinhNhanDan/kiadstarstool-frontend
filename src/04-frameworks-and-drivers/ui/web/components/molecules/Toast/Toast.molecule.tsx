/** @jsxImportSource @emotion/react */
import { Icon } from '../../atoms/Icon';
import * as styles from './Toast.molecule.styles';
import type { ToastProps } from './Toast.types';

const icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Toast = ({ variant, title, children, onClose, className }: ToastProps) => {
  return (
    <div css={styles.container(variant)} className={className} role="alert">
      <Icon size="md" color={variant === 'error' ? 'DANGER' : variant === 'success' ? 'SUCCESS' : variant === 'warning' ? 'WARNING' : 'PRIMARY'}>
        {icons[variant]}
      </Icon>
      
      <div css={styles.content}>
        {title && <div css={styles.title}>{title}</div>}
        <div css={styles.description}>{children}</div>
      </div>

      {onClose && (
        <button css={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};