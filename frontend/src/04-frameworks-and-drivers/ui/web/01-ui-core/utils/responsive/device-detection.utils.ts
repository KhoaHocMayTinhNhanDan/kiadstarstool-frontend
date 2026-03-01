import { useState } from 'react';

interface DeviceInfo {
  /** Checks if the device has touch capabilities. */
  isTouchDevice: boolean;
  /** A basic check against the user agent for mobile keywords. Not 100% reliable. */
  isMobileAgent: boolean;
}

const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isTouchDevice: false,
      isMobileAgent: false,
    };
  }

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileAgent = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return { isTouchDevice, isMobileAgent };
};

/**
 * A hook that provides information about the user's device.
 * It detects touch capability and checks the user agent for mobile keywords.
 * Note: User agent sniffing is not always reliable. Prefer feature detection and responsive design.
 *
 * @returns {DeviceInfo} An object containing device properties.
 */
export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo] = useState<DeviceInfo>(getDeviceInfo);
  return deviceInfo;
};

/** A standalone utility function to get device info without using a hook. */
export const detectDevice = getDeviceInfo;