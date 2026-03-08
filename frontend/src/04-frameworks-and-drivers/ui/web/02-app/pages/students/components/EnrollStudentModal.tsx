/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { Box, Text, Button, Input, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Modal } from '@/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/Modal';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../../01-ui-core/hooks/useToast';
import { type PaymentScheme } from '@/02-usecases/students/ports/input/EnrollStudent.input';
import { ENROLLMENT_DEFAULTS } from '@/01-entities/students/value-objects/Enrollment.vo';

interface EnrollStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentBranchId?: string; // Thêm prop này để lọc lớp
  availableClasses: any[];
  onSuccess: () => void;
}

export const EnrollStudentModal = ({ isOpen, onClose, studentId, studentBranchId, availableClasses, onSuccess }: EnrollStudentModalProps) => {
  const { toast } = useToast();
  const [enrollClassId, setEnrollClassId] = useState('');
  const [paymentScheme, setPaymentScheme] = useState<PaymentScheme>('course');
  const [enrollQuantity, setEnrollQuantity] = useState<number>(1);
  const [enrollDiscount, setEnrollDiscount] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Lọc danh sách lớp: Chỉ hiện các lớp thuộc cùng chi nhánh với học viên
  // FIX: Sử dụng useMemo để tránh tạo mảng mới mỗi lần render, gây loop cho useEffect bên dưới
  const filteredClasses = useMemo(() => studentBranchId 
    ? availableClasses.filter(c => c.branchId === studentBranchId)
    : availableClasses, [studentBranchId, availableClasses]);

  const selectedClassForEnroll = filteredClasses.find(c => c.id === enrollClassId);
  const showQuantityInput = paymentScheme === 'session' || paymentScheme === 'monthly';
  const quantityLabel = paymentScheme === 'session' ? 'Số buổi' : 'Số tháng';

  // Effect: Tự động chọn hình thức đóng tiền phù hợp khi chọn lớp
  useEffect(() => {
    if (selectedClassForEnroll?.tuition) {
      const t = selectedClassForEnroll.tuition;
      // Ưu tiên: Trọn khóa -> Theo tháng -> Theo buổi
      // Sử dụng !== undefined để bắt trường hợp giá = 0 (miễn phí)
      if (t.courseFee !== undefined) {
        setPaymentScheme('course');
      } else if (t.monthlyFee !== undefined) {
        setPaymentScheme('monthly');
      } else if (t.sessionFee !== undefined) {
        setPaymentScheme('session');
      }
    }
  }, [enrollClassId, selectedClassForEnroll]); // FIX: Chỉ chạy lại khi lớp được chọn thay đổi

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !enrollClassId) return;

    const selectedClass = filteredClasses.find(c => c.id === enrollClassId);
    if (!selectedClass) return;

    setIsEnrolling(true);
    try {
      const controller = AppContext.getStudentsController();
      const result = await controller.enrollStudent({
        studentId,
        classId: enrollClassId,
        branchId: selectedClass.branchId,
        paymentScheme,
        quantity: enrollQuantity,
        discountAmount: enrollDiscount ? Number(enrollDiscount) : 0,
        joinedDate: new Date()
      });

      if (result.isSuccess) {
        toast.success('Ghi danh thành công!');
        onSuccess();
        onClose();
        // Reset form
        setEnrollClassId('');
        setEnrollDiscount('');
        setPaymentScheme('course');
        setEnrollQuantity(1);
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ghi danh học viên">
        <form onSubmit={handleEnrollSubmit}>
          <Box display="flex" flexDirection="column" gap="md">
            <Box>
              <Text weight="semibold" mb="xs">Chọn lớp học <Text as="span" color="DANGER">*</Text></Text>
              <Select
                value={enrollClassId}
                onChange={(e) => setEnrollClassId(e.target.value)}
                options={[
                  { label: '-- Chọn lớp --', value: '' },
                  ...filteredClasses.map(c => ({ label: `${c.name} (${c.code})`, value: c.id }))
                ]}
                fullWidth
                required
              />
            </Box>

            {selectedClassForEnroll && (
              <Box>
                <Text weight="semibold" mb="xs">Hình thức đóng học phí <Text as="span" color="DANGER">*</Text></Text>
                <Select
                  value={paymentScheme}
                  onChange={(e) => setPaymentScheme(e.target.value as PaymentScheme)}
                  options={[
                    ...(selectedClassForEnroll.tuition?.courseFee !== undefined ? [{ label: `Trọn khóa (${(selectedClassForEnroll.tuition.courseFee || 0).toLocaleString()}đ)`, value: 'course' }] : []),
                    ...(selectedClassForEnroll.tuition?.monthlyFee !== undefined ? [{ label: `Theo tháng (${(selectedClassForEnroll.tuition.monthlyFee || 0).toLocaleString()}đ/tháng)`, value: 'monthly' }] : []),
                    ...(selectedClassForEnroll.tuition?.sessionFee !== undefined ? [{ label: `Theo buổi (${(selectedClassForEnroll.tuition.sessionFee || 0).toLocaleString()}đ/buổi)`, value: 'session' }] : [])
                  ]}
                  fullWidth
                />
                
                {/* Fallback if no tuition config */}
                {!selectedClassForEnroll.tuition && <Text size="xs" color="DANGER">Lớp này chưa cấu hình học phí!</Text>}
                
                {/* Hiển thị số buổi quy đổi */}
                {paymentScheme === 'monthly' && (
                  <Text size="xs" color="SECONDARY">
                    * Tương ứng: {ENROLLMENT_DEFAULTS.SESSIONS_PER_MONTH} buổi học/tháng
                  </Text>
                )}
                {paymentScheme === 'course' && (
                  <Text size="xs" color="SECONDARY" >
                    * Tương ứng: {ENROLLMENT_DEFAULTS.SESSIONS_PER_COURSE} buổi học/khóa
                  </Text>
                )}
              </Box>
            )}

            {showQuantityInput && (
              <Box>
                <Text weight="semibold" mb="xs">{quantityLabel} <Text as="span" color="DANGER">*</Text></Text>
                <Input 
                  type="number"
                  min="1"
                  value={enrollQuantity}
                  onChange={(e) => setEnrollQuantity(Number(e.target.value))}
                />
                {selectedClassForEnroll?.tuition && (
                  <Text size="xs" color="SECONDARY">
                    Tạm tính: {
                      paymentScheme === 'session' 
                        ? ((selectedClassForEnroll.tuition.sessionFee || 0) * enrollQuantity).toLocaleString() 
                        : ((selectedClassForEnroll.tuition.monthlyFee || 0) * enrollQuantity).toLocaleString()
                    } đ
                  </Text>
                )}
              </Box>
            )}

            <Box>
              <Text weight="semibold" mb="xs">Giảm giá (nếu có)</Text>
              <Input 
                type="number"
                placeholder="VNĐ"
                value={enrollDiscount}
                onChange={(e) => setEnrollDiscount(e.target.value)}
              />
            </Box>
            
            <Box display="flex" justifyContent="flex-end" gap="sm" mt="md">
              <Button variant="ghost" onClick={onClose} type="button">
                Hủy
              </Button>
              <Button type="submit" isLoading={isEnrolling}>
                Xác nhận
              </Button>
            </Box>
          </Box>
        </form>
    </Modal>
  );
};