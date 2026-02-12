// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/hooks/useDropdown.ts

import { useState, useCallback } from 'react';

export interface UseDropdownOptions {
  /** Trạng thái mở mặc định */
  defaultOpen?: boolean;
  /** ID được chọn mặc định (cho single select) */
  defaultSelectedId?: string;
  /** Danh sách ID được chọn mặc định (cho multi select) */
  defaultSelectedIds?: string[];
  /** Callback khi trạng thái mở thay đổi */
  onOpenChange?: (open: boolean) => void;
}

export const useDropdown = (options: UseDropdownOptions = {}) => {
  const {
    defaultOpen = false,
    defaultSelectedId,
    defaultSelectedIds = [],
    onOpenChange,
  } = options;

  // --- State ---
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultSelectedId);
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);

  // --- Visibility Handlers ---
  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
    onOpenChange?.(open);
  }, [onOpenChange]);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = useCallback(() => setIsOpenState(prev => {
    const newState = !prev;
    onOpenChange?.(newState);
    return newState;
  }), [onOpenChange]);

  // --- Selection Handlers ---
  const selectItem = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  return {
    // State
    isOpen,
    selectedId,
    selectedIds,

    // Actions
    open,
    close,
    toggle,
    setIsOpen,
    selectItem,
    setSelectedId,
    toggleItemSelection,
    setSelectedIds,

    // Prop Getters (Helpers để spread props vào component)
    getDropdownProps: () => ({
      open: isOpen,
      onOpenChange: setIsOpen,
    }),
    
    getSelectProps: () => ({
      open: isOpen,
      onOpenChange: setIsOpen,
      value: selectedId,
      onChange: selectItem,
    }),

    getMultiSelectProps: () => ({
      open: isOpen,
      onOpenChange: setIsOpen,
      selectedIds,
      onSelectionChange: setSelectedIds,
    })
  };
};