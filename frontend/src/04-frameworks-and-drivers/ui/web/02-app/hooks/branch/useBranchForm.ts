import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define Validation Schema (Shared)
export const branchFormSchema = z.object({
  name: z.string().min(3, "Tên chi nhánh phải có ít nhất 3 ký tự").max(100, "Tên chi nhánh quá dài"),
  code: z.string().optional(), // Optional for creation (auto-generated)
  
  // Address fields
  houseNumber: z.string().optional(),
  lane: z.string().optional(),
  street: z.string().min(3, "Tên đường là bắt buộc"),
  ward: z.string().min(2, "Phường/Xã là bắt buộc"),
  province: z.string().min(2, "Tỉnh/Thành phố là bắt buộc"),
  postalCode: z.string().regex(/^[0-9]*$/, "Mã bưu chính chỉ chứa số").optional().or(z.literal('')),

  // Capacity
  maxStudents: z.number().min(1, "Sức chứa phải lớn hơn 0").max(10000, "Sức chứa quá lớn"),
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
      houseNumber: '',
      lane: '',
      street: '',      
      ward: '',
      province: '',
      postalCode: '',
      maxStudents: 100,
      ...defaultValues,
    },
  });

  return {
    ...form,
    // Có thể expose thêm các helper function nếu cần
  };
};