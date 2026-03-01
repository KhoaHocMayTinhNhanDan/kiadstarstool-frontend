/* ==========================================================================
 * useDropdownKeyboard Hook
 * --------------------------------------------------------------------------
 * Keyboard navigation hook for dropdown components
 * ========================================================================== */

import { useState, useCallback, type KeyboardEvent } from 'react';

export interface UseDropdownKeyboardOptions<T> {
  items: T[];
  onSelect?: (item: T, index: number) => void;
  disabledIndices?: number[];
  loop?: boolean;
}

export const useDropdownKeyboard = <T,>({
  items,
  onSelect,
  disabledIndices = [],
  loop = true,
}: UseDropdownKeyboardOptions<T>) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isValidIndex = useCallback((index: number) => {
    return index >= 0 && index < items.length && !disabledIndices.includes(index);
  }, [items.length, disabledIndices]);

  const findNextEnabledIndex = useCallback((currentIndex: number, direction: 1 | -1): number => {
    let nextIndex = currentIndex + direction;
    const maxIndex = items.length - 1;
    const minIndex = 0;

    while (loop || (nextIndex >= minIndex && nextIndex <= maxIndex)) {
      if (nextIndex > maxIndex) {
        if (!loop) break;
        nextIndex = minIndex;
      } else if (nextIndex < minIndex) {
        if (!loop) break;
        nextIndex = maxIndex;
      }

      if (isValidIndex(nextIndex)) {
        return nextIndex;
      }

      nextIndex += direction;
    }

    return currentIndex;
  }, [items.length, isValidIndex, loop]);

  const handleKeyDown = useCallback((
    event: KeyboardEvent,
    customOnSelect?: (index: number) => void
  ) => {
    const selectCallback = customOnSelect || ((index: number) => {
      if (onSelect && isValidIndex(index)) {
        onSelect(items[index], index);
      }
    });

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => findNextEnabledIndex(prev, 1));
        break;

      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => findNextEnabledIndex(prev, -1));
        break;

      case 'Enter':
      case ' ':
        if (focusedIndex >= 0 && isValidIndex(focusedIndex)) {
          event.preventDefault();
          selectCallback(focusedIndex);
        }
        break;

      case 'Home':
        event.preventDefault();
        for (let i = 0; i < items.length; i++) {
          if (isValidIndex(i)) {
            setFocusedIndex(i);
            break;
          }
        }
        break;

      case 'End':
        event.preventDefault();
        for (let i = items.length - 1; i >= 0; i--) {
          if (isValidIndex(i)) {
            setFocusedIndex(i);
            break;
          }
        }
        break;

      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  }, [focusedIndex, items, onSelect, findNextEnabledIndex, isValidIndex]);

  const resetFocus = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  const setFocus = useCallback((index: number) => {
    if (isValidIndex(index)) {
      setFocusedIndex(index);
    }
  }, [isValidIndex]);

  return {
    focusedIndex,
    setFocusedIndex: setFocus,
    handleKeyDown,
    resetFocus,
    isFocused: focusedIndex !== -1,
  };
};

export type DropdownKeyboardHandler = ReturnType<typeof useDropdownKeyboard>;