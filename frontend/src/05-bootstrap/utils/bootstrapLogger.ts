import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement';
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';
import { MockAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/MockAuthDriver';
import { DATA_MODE } from '@/shared/config/env';

type AuthDriver = IAuthAuthentication & IAuthAccountManagement & IAuthSession;

export function getBootstrapModeInfo(authDriver: AuthDriver): { mode: string; users?: string[] } {
  if (DATA_MODE === 'mock' && authDriver instanceof MockAuthDriver) {
    return {
      mode: 'Mock Mode',
      users: authDriver.getMockUsers().map((u) => u.email),
    };
  }

  return { mode: 'Firebase Mode' };
}