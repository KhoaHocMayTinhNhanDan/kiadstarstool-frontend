import { useMediaQuery } from './useMediaQuery';

type Orientation = 'portrait' | 'landscape';

/**
 * A hook to get the current screen orientation.
 * @returns The current orientation ('portrait' or 'landscape').
 */
export const useOrientation = (): Orientation => {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  return isPortrait ? 'portrait' : 'landscape';
};