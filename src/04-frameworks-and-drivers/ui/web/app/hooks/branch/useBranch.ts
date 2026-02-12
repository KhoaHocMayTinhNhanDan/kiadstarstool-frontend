import { useState, useCallback } from 'react';
import { AppContext } from '@/00-core/app-context';
import { type CreateBranchInput } from '@/02-usecases/branch/ports/input/CreateBranch.input';
import { type UpdateBranchInfoInput } from '@/02-usecases/branch/ports/input/UpdateBranchInfo.input';
import { useToast } from '../user/useToast';

export const useBranch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createBranch = useCallback(async (input: CreateBranchInput) => {
    setIsLoading(true);
    try {
      const controller = AppContext.getBranchController();
      const result = await controller.createBranch(input);

      if (result.isSuccess) {
        toast.success('Branch created successfully!');
        return true;
      } else {
        toast.error(result.getErrorValue() as string);
        return false;
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateBranchInfo = useCallback(async (input: UpdateBranchInfoInput) => {
    setIsLoading(true);
    try {
      const controller = AppContext.getBranchController();
      const result = await controller.updateBranchInfo(input);

      if (result.isSuccess) {
        toast.success('Branch updated successfully!');
        return true;
      } else {
        toast.error(result.getErrorValue() as string);
        return false;
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    createBranch,
    updateBranchInfo,
    isLoading
  };
};