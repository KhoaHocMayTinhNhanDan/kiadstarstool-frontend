import { useState, useEffect, useCallback } from 'react';

export type RippleItem = {
  x: number;
  y: number;
  size: number;
  id: number;
};

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
  }, []);

  // Tự động dọn dẹp ripples sau khi animation kết thúc để tránh memory leak
  useEffect(() => {
    if (ripples.length > 0) {
      const timeout = setTimeout(() => setRipples([]), 600); // 600ms khớp với duration animation
      return () => clearTimeout(timeout);
    }
  }, [ripples.length]);

  return { ripples, addRipple };
};