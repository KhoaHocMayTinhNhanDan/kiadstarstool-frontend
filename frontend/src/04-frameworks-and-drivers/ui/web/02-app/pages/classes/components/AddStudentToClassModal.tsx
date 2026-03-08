/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Modal } from '@/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/Modal';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { type PaymentScheme } from '@/02-usecases/students/ports/input/EnrollStudent.input';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { ENROLLMENT_DEFAULTS } from '@/01-entities/students/value-objects/Enrollment.vo';

interface AddStudentToClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  branchId: string;
  classInfo: any; // Thông tin lớp học để lấy học phí
  onSuccess: () => void;
}

export const AddStudentToClassModal = ({ isOpen, onClose, classId, branchId, classInfo, onSuccess }: AddStudentToClassModalProps) => {
  const { toast } = useToast();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<StudentListItem[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [paymentScheme, setPaymentScheme] = useState<PaymentScheme>('course');
  const [enrollQuantity, setEnrollQuantity] = useState<number>(1);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [existingStudentIds, setExistingStudentIds] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed
  const [emptyReason, setEmptyReason] = useState<'no_match' | 'all_enrolled' | null>(null);
  const [isBranchFullyEnrolled, setIsBranchFullyEnrolled] = useState(false); // Trạng thái: Không còn học viên nào khả dụng

  const showQuantityInput = paymentScheme === 'session' || paymentScheme === 'monthly';
  const quantityLabel = paymentScheme === 'session' ? 'Số buổi' : 'Số tháng';

  // Reset state khi mở modal
  useEffect(() => {
    if (isOpen) {
      setSearchKeyword('');
      setSearchResults([]);
      setSelectedStudentId('');
      setEnrollQuantity(1);
      setHasSearched(false);
      setEmptyReason(null);
      setIsBranchFullyEnrolled(false);

      // Tự động chọn hình thức đóng tiền phù hợp dựa trên cấu hình lớp học
      if (classInfo?.tuition) {
        const t = classInfo.tuition;
        if (t.courseFee !== undefined) setPaymentScheme('course');
        else if (t.monthlyFee !== undefined) setPaymentScheme('monthly');
        else if (t.sessionFee !== undefined) setPaymentScheme('session');
        else setPaymentScheme('course');
      } else {
        setPaymentScheme('course');
      }

      fetchExistingStudents();
    }
  }, [isOpen, classId, classInfo]);

  // Fetch danh sách học viên đã có trong lớp để loại trừ
  const fetchExistingStudents = async () => {
    try {
      const controller = AppContext.getStudentsController();
      // Giả định có API listStudentsByClass hoặc dùng listStudentsByBranch rồi lọc client (tạm thời)
      // Trong thực tế nên có API chuyên biệt: getStudentsByClassId(classId)
      // Ở đây ta dùng listStudentsByBranch và lọc client những ai có enrollment vào classId này
      const result = await controller.listStudentsByBranch({ branchId, limit: 1000 } as any);
      if (result.isSuccess) {
        const students = result.getValue();
        const enrolledIds = students.filter(s => s.enrollments?.some(e => e.classId === classId && e.status === 'active')).map(s => s.id);
        const enrolledSet = new Set(enrolledIds);
        setExistingStudentIds(enrolledSet);

        // Kiểm tra: Nếu số lượng học viên trong chi nhánh = số lượng đã ghi danh vào lớp này
        // (Hoặc chi nhánh chưa có học viên nào)
        if (students.length > 0 && students.length === enrolledIds.length) {
          setIsBranchFullyEnrolled(true);
        } else {
          // FIX: Hiển thị ngay danh sách học viên khả dụng (chưa vào lớp) để cải thiện UX
          const availableStudents = students.filter(s => !enrolledSet.has(s.id)).slice(0, 20);
          setSearchResults(availableStudents);
        }
      }
    } catch (error) {
      console.error('Failed to fetch existing students', error);
    }
  };

  // Tìm kiếm học viên
  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setEmptyReason(null);
    try {
      const controller = AppContext.getStudentsController();
      // Tìm học viên trong cùng chi nhánh
      const result = await controller.listStudentsByBranch({ 
        branchId, 
        keyword: searchKeyword,
        limit: 10 
      } as any);
      
      if (result.isSuccess) {
        // Lọc bỏ những học viên đã có trong lớp
        const allResults = result.getValue();
        const filteredResults = allResults.filter(s => !existingStudentIds.has(s.id));
        setSearchResults(filteredResults);

        if (filteredResults.length === 0) {
          if (allResults.length > 0) {
            setEmptyReason('all_enrolled');
          } else {
            setEmptyReason('no_match');
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleEnroll = async () => {
    if (!selectedStudentId) return;
    setIsEnrolling(true);
    try {
      const controller = AppContext.getStudentsController();
      const result = await controller.enrollStudent({
        studentId: selectedStudentId,
        classId,
        branchId,
        paymentScheme,
        quantity: enrollQuantity,
        joinedDate: new Date()
      });

      if (result.isSuccess) {
        toast.success('Thêm học viên vào lớp thành công!');
        onSuccess();
        onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm học viên vào lớp">
      {isBranchFullyEnrolled ? (
        <Box p="lg" textAlign="center" bg="BACKGROUND_NEUTRAL" borderRadius="md" mb="md" border={`1px dashed ${COLORS.NEUTRAL_BORDER}`}>
          <Text weight="medium" color="SECONDARY">
            Tất cả học viên trong chi nhánh này đã được ghi danh vào lớp.
          </Text>
          <Text size="sm" color="SECONDARY">Không còn học viên nào khả dụng để thêm.</Text>
        </Box>
      ) : (
        <>
        <Box display="flex" gap="sm" mb="md">
          <Input 
            placeholder="Tìm tên, email, sđt..." 
            value={searchKeyword} 
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            fullWidth
          />
          <Button onClick={handleSearch} isLoading={isSearching}><Icon><Search /></Icon></Button>
        </Box>

        {/* Search Results / Empty State */}
        {hasSearched && searchResults.length === 0 ? (
          <Box p="md" textAlign="center" border={`1px dashed ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" mb="md">
            <Text color="SECONDARY">
              {emptyReason === 'all_enrolled' 
                ? 'Các học viên tìm thấy đều đã có trong lớp này.' 
                : 'Không tìm thấy học viên nào phù hợp với từ khóa.'}
            </Text>
          </Box>
        ) : searchResults.length > 0 && (
          <Box mb="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" maxHeight="200px" overflow="auto">
            {searchResults.map(s => (
              <Box 
                key={s.id} p="sm" 
                bg={selectedStudentId === s.id ? 'PRIMARY_LIGHT' : 'transparent'}
                onClick={() => setSelectedStudentId(s.id)}
                sx={{ cursor: 'pointer', '&:hover': { bg: 'NEUTRAL_LIGHT' } }}
              >
                <Text weight="medium">{s.name}</Text>
                <Text size="xs" color="SECONDARY">{s.email} - {s.phone}</Text>
              </Box>
            ))}
          </Box>
        )}
        </>
      )}

        {selectedStudentId && (
          <Box display="flex" flexDirection="column" gap="md" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`} pt="md">
             <Text weight="semibold">Cấu hình học phí</Text>
             <Select
                value={paymentScheme}
                onChange={(e) => setPaymentScheme(e.target.value as PaymentScheme)}
                options={[
                  ...(classInfo?.tuition?.courseFee !== undefined ? [{ label: `Trọn khóa (${(classInfo.tuition.courseFee || 0).toLocaleString()}đ)`, value: 'course' }] : []),
                  ...(classInfo?.tuition?.monthlyFee !== undefined ? [{ label: `Theo tháng (${(classInfo.tuition.monthlyFee || 0).toLocaleString()}đ/tháng)`, value: 'monthly' }] : []),
                  ...(classInfo?.tuition?.sessionFee !== undefined ? [{ label: `Theo buổi (${(classInfo.tuition.sessionFee || 0).toLocaleString()}đ/buổi)`, value: 'session' }] : [])
                ]}
                fullWidth
              />
              
              {!classInfo?.tuition && <Text size="xs" color="DANGER">Lớp này chưa cấu hình học phí!</Text>}

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

              {showQuantityInput && (
                <Box>
                  <Input 
                    type="number" 
                    label={quantityLabel} 
                    value={enrollQuantity} 
                    min={1}
                    onChange={(e) => setEnrollQuantity(Number(e.target.value))} 
                  />
                  {classInfo?.tuition && (
                    <Text size="xs" color="SECONDARY" >
                      Tạm tính: {
                        paymentScheme === 'session' 
                          ? ((classInfo.tuition.sessionFee || 0) * enrollQuantity).toLocaleString() 
                          : ((classInfo.tuition.monthlyFee || 0) * enrollQuantity).toLocaleString()
                      } đ
                    </Text>
                  )}
                </Box>
              )}
              <Button onClick={handleEnroll} isLoading={isEnrolling} fullWidth>Xác nhận thêm</Button>
          </Box>
        )}
    </Modal>
  );
};