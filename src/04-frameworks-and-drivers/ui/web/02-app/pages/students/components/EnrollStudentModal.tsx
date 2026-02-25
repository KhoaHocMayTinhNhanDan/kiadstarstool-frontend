/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../../01-ui-core/hooks/useToast';
import { type PaymentScheme } from '@/02-usecases/students/ports/input/EnrollStudent.input';

interface EnrollStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  availableClasses: any[];
  onSuccess: () => void;
}

export const EnrollStudentModal = ({ isOpen, onClose, studentId, availableClasses, onSuccess }: EnrollStudentModalProps) => {
  const { toast } = useToast();
  const [enrollClassId, setEnrollClassId] = useState('');
  const [paymentScheme, setPaymentScheme] = useState<PaymentScheme>('course');
  const [enrollQuantity, setEnrollQuantity] = useState<number>(1);
  const [enrollDiscount, setEnrollDiscount] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  const selectedClassForEnroll = availableClasses.find(c => c.id === enrollClassId);
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
  }, [enrollClassId, availableClasses]);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !enrollClassId) return;

    const selectedClass = availableClasses.find(c => c.id === enrollClassId);
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

  if (!isOpen) return null;

  return (
    <Box 
      position="fixed" top="0" left="0" right="0" bottom="0" 
      bg="rgba(0,0,0,0.5)" 
      display="flex" alignItems="center" justifyContent="center" 
      zIndex={1000}
    >
      <Card sx={{ width: '100%', maxWidth: '500px', margin: SPACING.md }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
          <Text variant="heading-md" weight="bold">Ghi danh học viên</Text>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon><X /></Icon>
          </Button>
        </Box>
        
        <form onSubmit={handleEnrollSubmit}>
          <Box display="flex" flexDirection="column" gap="md">
            <Box>
              <Text weight="semibold" mb="xs">Chọn lớp học <Text as="span" color="DANGER">*</Text></Text>
              <select
                value={enrollClassId}
                onChange={(e) => setEnrollClassId(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}`, height: '40px', backgroundColor: 'white' }}
                required
              >
                <option value="">-- Chọn lớp --</option>
                {availableClasses.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                ))}
              </select>
            </Box>

            {selectedClassForEnroll && (
              <Box>
                <Text weight="semibold" mb="xs">Hình thức đóng học phí <Text as="span" color="DANGER">*</Text></Text>
                <select
                  value={paymentScheme}
                  onChange={(e) => setPaymentScheme(e.target.value as PaymentScheme)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}`, height: '40px', backgroundColor: 'white' }}
                >
                  {selectedClassForEnroll.tuition?.courseFee !== undefined ? <option value="course">Trọn khóa ({(selectedClassForEnroll.tuition.courseFee || 0).toLocaleString()}đ)</option> : null}
                  {selectedClassForEnroll.tuition?.monthlyFee !== undefined ? <option value="monthly">Theo tháng ({(selectedClassForEnroll.tuition.monthlyFee || 0).toLocaleString()}đ/tháng)</option> : null}
                  {selectedClassForEnroll.tuition?.sessionFee !== undefined ? <option value="session">Theo buổi ({(selectedClassForEnroll.tuition.sessionFee || 0).toLocaleString()}đ/buổi)</option> : null}
                </select>
                
                {/* Fallback if no tuition config */}
                {!selectedClassForEnroll.tuition && <Text size="xs" color="DANGER">Lớp này chưa cấu hình học phí!</Text>}
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
      </Card>
    </Box>
  );
};