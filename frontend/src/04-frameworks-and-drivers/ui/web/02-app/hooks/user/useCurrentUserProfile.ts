import { useState, useEffect } from 'react';
import { AppContext } from '@/05-bootstrap/app-context';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { useAuth } from './useAuth';

export const useCurrentUserProfile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setUserProfile(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const controller = AppContext.getUsersController();
        const result = await controller.getUser({ userId: user.id });
        
        if (result.isSuccess) {
          setUserProfile(result.getValue());
        } else {
          setError(result.getErrorValue());
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return { userProfile, isLoading, error };
};