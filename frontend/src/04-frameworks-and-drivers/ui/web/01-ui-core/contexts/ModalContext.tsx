/**
 * Modal Context
 * 
 * Quản lý modal system cho toàn bộ ứng dụng
 * Chỉ export context và provider, KHÔNG export hook
 */

import { createContext, useState, useCallback, type ReactNode } from 'react';
import { Modal } from '../../00-design-system/01-molecules/Modal';
import type { ModalSize } from '../../00-design-system/01-molecules/Modal/Modal.types';

// ============================================================================
// 1. ĐỊNH NGHĨA TYPES (EXPORT để hook dùng)
// ============================================================================

export interface ModalProps {
  title?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  sx?: any;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface ModalItem extends ModalProps {
  id: string;
  timestamp: number;
}

export interface ModalContextType {
  modals: ModalItem[];
  openModal: (props: ModalProps) => string;
  closeModal: (id: string) => void;
  closeLatestModal: () => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;
  latestModal: ModalItem | null;
}

// ============================================================================
// 2. TẠO CONTEXT (EXPORT)
// ============================================================================

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ============================================================================
// 3. PROVIDER COMPONENT (EXPORT)
// ============================================================================

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const generateId = useCallback(() => {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const openModal = useCallback((props: ModalProps): string => {
    const id = generateId();
    const newModal: ModalItem = {
      ...props,
      id,
      timestamp: Date.now(),
    };

    setModals(prev => [...prev, newModal]);
    props.onOpen?.();
    document.body.style.overflow = 'hidden';
    
    return id;
  }, [generateId]);

  const closeModal = useCallback((id: string) => {
    setModals(prev => {
      const modal = prev.find(m => m.id === id);
      const newModals = prev.filter(m => m.id !== id);
      
      modal?.onClose?.();
      
      if (newModals.length === 0) {
        document.body.style.overflow = 'unset';
      }
      
      return newModals;
    });
  }, []);

  const closeLatestModal = useCallback(() => {
    if (modals.length > 0) {
      const latest = [...modals].sort((a, b) => b.timestamp - a.timestamp)[0];
      closeModal(latest.id);
    }
  }, [modals, closeModal]);

  const closeAllModals = useCallback(() => {
    modals.forEach(modal => modal.onClose?.());
    setModals([]);
    document.body.style.overflow = 'unset';
  }, [modals]);

  const isModalOpen = useCallback((id: string) => {
    return modals.some(modal => modal.id === id);
  }, [modals]);

  const latestModal = modals.length > 0
    ? [...modals].sort((a, b) => b.timestamp - a.timestamp)[0]
    : null;

  // Handle ESC key
  useState(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modals.length > 0) {
        const latestModal = [...modals].sort((a, b) => b.timestamp - a.timestamp)[0];
        if (latestModal.closeOnOverlayClick !== false) {
          closeLatestModal();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  });

  const value: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeLatestModal,
    closeAllModals,
    isModalOpen,
    latestModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRenderer modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};

// ============================================================================
// 4. MODAL RENDERER COMPONENT (PRIVATE - KHÔNG EXPORT)
// ============================================================================

interface ModalRendererProps {
  modals: ModalItem[];
  closeModal: (id: string) => void;
}

const ModalRenderer: React.FC<ModalRendererProps> = ({ modals, closeModal }) => {
  if (modals.length === 0) return null;

  const sortedModals = [...modals].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <>
      {sortedModals.map((modal, index) => (
        <Modal
          key={modal.id}
          isOpen={true}
          onClose={() => closeModal(modal.id)}
          title={modal.title}
          footer={modal.footer}
          size={modal.size}
          closeOnOverlayClick={modal.closeOnOverlayClick}
          showCloseButton={modal.showCloseButton}
          sx={{
            ...modal.sx,
            zIndex: 1000 + index,
          }}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
};