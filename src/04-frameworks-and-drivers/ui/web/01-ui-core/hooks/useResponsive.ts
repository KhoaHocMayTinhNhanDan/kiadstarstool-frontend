import { BREAKPOINTS } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { useMediaQuery } from './useMediaQuery';

export const useResponsive = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
