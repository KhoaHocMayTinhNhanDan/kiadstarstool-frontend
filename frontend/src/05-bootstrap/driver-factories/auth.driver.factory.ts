// src/05-bootstrap/driver-factories/auth.driver.factory.ts

import { DATA_MODE } from '@/shared/config/env';
import { createMockAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/MockAuthDriver';
import { createFirebaseAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver';
import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement';
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';

export function createAuthDriver(): IAuthAuthentication & IAuthAccountManagement & IAuthSession {
  if (DATA_MODE === 'mock') {
    console.log('[AuthDriverFactory] Using MockAuthDriver');
    return createMockAuthDriver();
  }

  try {
    console.log('[AuthDriverFactory] Using FirebaseAuthDriver');
    return createFirebaseAuthDriver();
  } catch (error) {
    console.error('[AuthDriverFactory] Failed to initialize FirebaseAuthDriver, falling back to MockAuthDriver', error);
    return createMockAuthDriver();
  }
}