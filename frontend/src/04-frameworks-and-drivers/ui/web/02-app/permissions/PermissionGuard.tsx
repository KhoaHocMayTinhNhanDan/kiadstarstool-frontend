import React, { useEffect, useState } from 'react';
import { type PermissionCode } from '@/shared/constants/authorization/auth.domain';
import { usePermission } from '../hooks/user/usePermission';

interface PermissionGuardProps {
  /**
   * A single permission code or an array of permission codes required to render the children.
   * For arrays, it's recommended to memoize the array (e.g., with `useMemo`) to prevent unnecessary re-renders.
   */
  required: PermissionCode | PermissionCode[];
  /**
   * Determines how to check against an array of permissions.
   * 'all': The user must have ALL permissions in the array.
   * 'any': The user must have AT LEAST ONE of the permissions in the array.
   * @default 'all'
   */
  match?: 'all' | 'any';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  required,
  match = 'all',
  children,
  fallback = null,
}) => {
  const { checkPermission } = usePermission();
  const [allowed, setAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const permissionsToCheck = Array.isArray(required) ? required : [required];

    const verifyPermissions = async () => {
      if (permissionsToCheck.length === 0) {
        if (isMounted) {
          setAllowed(true);
          setIsLoading(false);
        }
        return;
      }

      const checkResults = await Promise.all(
        permissionsToCheck.map(p => checkPermission(p))
      );

      if (isMounted) {
        if (match === 'all') {
          setAllowed(checkResults.every(Boolean));
        } else { // 'any'
          setAllowed(checkResults.some(Boolean));
        }
        setIsLoading(false);
      }
    };

    verifyPermissions().catch(err => {
      console.error('Permission check failed in PermissionGuard:', err);
      if (isMounted) {
        setAllowed(false);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [required, match, checkPermission]);

  if (isLoading) {
    // Render nothing while checking to avoid a flash of fallback content.
    return null;
  }

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
