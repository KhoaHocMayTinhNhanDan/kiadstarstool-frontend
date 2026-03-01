/**
 * useModal Hook
 * 
 * Hook để sử dụng ModalContext trong functional components
 * Tách riêng để dễ maintain và test
 * 
 * @example
 * const { openModal, closeModal } = useModal();
 * 
 * const handleOpen = () => {
 *   openModal({
 *     title: 'Thông báo',
 *     content: <p>Nội dung</p>,
 *     size: 'sm'
 *   });
 * };
 */

import { useContext } from 'react';
import { ModalContext, type ModalContextType } from '../contexts/ModalContext';

/**
 * Hook useModal - Truy cập modal context
 * @throws Error nếu sử dụng ngoài ModalProvider
 * @returns ModalContextType
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error(
      'useModal must be used within ModalProvider\n' +
      'Vui lòng wrap component trong <ModalProvider>'
    );
  }
  
  return context;
};