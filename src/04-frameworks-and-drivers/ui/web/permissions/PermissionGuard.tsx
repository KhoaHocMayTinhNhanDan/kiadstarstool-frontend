import React, { useEffect, useState } from 'react';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { usePermission } from '../hooks/usePermission';

interface PermissionGuardProps {
  required: PermissionCode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  required,
  children,
  fallback = null
}) => {
  const { checkPermission } = usePermission();
  const [allowed, setAllowed] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    checkPermission(required).then((isAllowed) => {
      if (mounted) setAllowed(isAllowed);
    });
    return () => { mounted = false; };
  }, [required, checkPermission]);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
