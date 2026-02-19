import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  // Mặc định là `false` trên server để tránh lỗi và hydration mismatch.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Cập nhật trạng thái đúng khi component được mount ở client.
    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};
