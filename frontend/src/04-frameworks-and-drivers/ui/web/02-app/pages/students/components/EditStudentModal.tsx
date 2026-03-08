/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Box, Button, Input, Text, Select, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Modal } from '@/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/Modal';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { parsePhoneString, formatPhoneString } from '@/shared/utils/phoneUtils';
import { usePhoneList } from '../../../hooks/usePhoneList';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: GetStudentDetailsOutput;
  onSuccess: () => void;
}

interface EditStudentFormData {
  name: string;
  email: string;
  dateOfBirth: string;
  status: 'active' | 'inactive' | 'archived';
}

export const EditStudentModal = ({ isOpen, onClose, student, onSuccess }: EditStudentModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditStudentFormData>();
  const { toast } = useToast();
  
  // State quản lý danh sách số điện thoại động
  const { phones, setPhones, addPhone, removePhone, updatePhone, validateAll } = usePhoneList();

  useEffect(() => {
    if (isOpen && student) {
      reset({
        name: student.name,
        email: student.email,
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        status: student.status as any
      });

      // Parse chuỗi số điện thoại cũ thành mảng object
      // Format cũ: "090123 (Bố) - 090456 (Mẹ)" hoặc "090123"
      if (student.phone) {
        const parsedPhones = parsePhoneString(student.phone);
        setPhones(parsedPhones.length > 0 ? parsedPhones : [{ number: '', note: 'Di động' }]);
      } else {
        setPhones([{ number: '', note: 'Di động' }]);
      }
    }
  }, [isOpen, student, reset]);

  const onSubmit = async (data: EditStudentFormData) => {
    if (!validateAll()) {
      toast.error('Vui lòng kiểm tra lại số điện thoại');
      return;
    }

    try {
      // Format phones array into a single string
      const formattedPhone = formatPhoneString(phones);

      const controller = AppContext.getStudentsController();
      const result = await controller.updateStudentInfo({
        studentId: student.id,
        name: data.name,
        email: data.email,
        phone: formattedPhone,
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
          
          {/* Dynamic Phone List */}
          <Box>
            <Text as="label" weight="semibold" mb="xs" sx={{ display: 'block' }}>Số điện thoại liên hệ</Text>
            <Box display="flex" flexDirection="column" gap="sm">
              {phones.map((item, index) => (
                <Box key={index} display="flex" gap="sm" alignItems="center">
                  <Box flex="1">
                    <Input 
                      placeholder="Số điện thoại..." 
                      value={item.number} 
                      onChange={(e) => updatePhone(index, 'number', e.target.value)} 
                      error={(item as any).error}
                    />
                  </Box>
                  <Box width="150px">
                    <Input 
                      placeholder="Ghi chú (VD: Bố)" 
                      value={item.note} 
                      onChange={(e) => updatePhone(index, 'note', e.target.value)} 
                    />
                  </Box>
                  {phones.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removePhone(index)} type="button" title="Xóa số này">
                      <Icon color="DANGER"><Trash2 /></Icon>
                    </Button>
                  )}
                </Box>
              ))}
              <Box>
                <Button variant="outline" size="sm" onClick={addPhone} type="button" leftIcon={<Icon><Plus /></Icon>}>
                  Thêm số khác
                </Button>
              </Box>
            </Box>
          </Box>

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