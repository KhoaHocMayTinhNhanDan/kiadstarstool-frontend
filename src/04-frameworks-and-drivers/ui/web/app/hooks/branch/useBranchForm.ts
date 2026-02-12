import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define Validation Schema (Shared)
export const branchFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
  code: z.string().min(2, "Code must be at least 2 characters").regex(/^[A-Z0-9-]+$/, "Code must contain only uppercase letters, numbers, and hyphens"),
  street: z.string().min(5, "Street address is required"),
  ward: z.string().min(2, "Ward is required"),
  district: z.string().min(2, "District is required"),
  city: z.string().min(2, "City is required"),
  maxStudents: z.number().min(1, "Capacity must be at least 1").max(10000, "Capacity is too high"),
});

export type BranchFormData = z.infer<typeof branchFormSchema>;

interface UseBranchFormProps {
  defaultValues?: Partial<BranchFormData>;
}

export const useBranchForm = ({ defaultValues }: UseBranchFormProps = {}) => {
  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: '',
      code: '',
      street: '',
      ward: '',
      district: '',
      city: '',
      maxStudents: 100,
      ...defaultValues,
    },
  });

  return {
    ...form,
    // Có thể expose thêm các helper function nếu cần
  };
};