/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Text, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Modal } from '@/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/Modal';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: GetStudentDetailsOutput;
  onSuccess: () => void;
}

interface EditStudentFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: 'active' | 'inactive' | 'archived';
}

export const EditStudentModal = ({ isOpen, onClose, student, onSuccess }: EditStudentModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditStudentFormData>();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && student) {
      reset({
        name: student.name,
        email: student.email,
        phone: student.phone || '',
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        status: student.status as any
      });
    }
  }, [isOpen, student, reset]);

  const onSubmit = async (data: EditStudentFormData) => {
    try {
      const controller = AppContext.getStudentsController();
      const result = await controller.updateStudentInfo({
        studentId: student.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        status: data.status
      });

      if (result.isSuccess) {
        toast.success('Cập nhật thông tin thành công');
        onSuccess();
        onClose();
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chỉnh sửa thông tin học viên">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="md">
          <Input
            label="Họ và tên"
            {...register('name', { required: 'Vui lòng nhập tên' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            {...register('email', { required: 'Vui lòng nhập email' })}
            error={errors.email?.message}
          />
          <Input
            label="Số điện thoại"
            {...register('phone')}
          />
          <Input
            label="Ngày sinh"
            type="date"
            {...register('dateOfBirth')}
          />
          <Select
            label="Trạng thái"
            {...register('status')}
            options={[
              { label: 'Đang học (Active)', value: 'active' },
              { label: 'Tạm nghỉ (Inactive)', value: 'inactive' },
              { label: 'Lưu trữ (Archived)', value: 'archived' }
            ]}
          />
          <Button type="submit" isLoading={isSubmitting}>Lưu thay đổi</Button>
        </Box>
      </form>
    </Modal>
  );
};