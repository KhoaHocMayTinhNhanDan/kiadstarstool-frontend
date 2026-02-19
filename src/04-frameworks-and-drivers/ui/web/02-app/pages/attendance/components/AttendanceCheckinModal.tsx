/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, type ColorKey } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { CheckCircle, XCircle, Clock, AlertCircle, X, Save } from 'lucide-react';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../../01-ui-core/hooks/useToast';

interface AttendanceCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  className: string;
  date: string;
}

export const AttendanceCheckinModal = ({ isOpen, onClose, classId, className, date }: AttendanceCheckinModalProps) => {
  const { toast } = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load danh sách học viên của lớp
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        // 1. Lấy danh sách học viên của lớp (Cần UseCase ListStudentsByClass - tạm thời dùng ListStudentsByBranch và lọc hoặc giả định API trả về)
        // Trong thực tế: Cần API getStudentsByClassId(classId)
        // Ở đây ta sẽ dùng tạm logic lấy danh sách điểm danh cũ nếu có, hoặc lấy danh sách học viên mới
        
        // Tạm thời mock logic lấy học viên để demo UI
        const controller = AppContext.getStudentsController();
        // Giả sử ta lấy danh sách học viên của branch chứa class này (cần logic phức tạp hơn ở backend)
        // Để đơn giản cho demo UI, ta sẽ hardcode một vài học viên hoặc lấy từ AttendanceRepository nếu đã có record
        
        // TODO: Gọi UseCase thực tế: GetClassAttendanceSheet(classId, date)
        // UseCase này sẽ trả về danh sách học viên kèm trạng thái điểm danh hiện tại (nếu đã điểm danh)
        
        // Mock data cho UI
        setStudents([
          { id: 'student-01', name: 'Nguyễn Văn An', status: 'present', note: '' },
          { id: 'student-04', name: 'Phạm Thị Dung', status: 'not_marked', note: '' },
          { id: 'student-05', name: 'Hoàng Văn Em', status: 'absent', note: 'Có phép' },
        ]);

      } catch (error) {
        console.error(error);
        toast.error('Không thể tải danh sách học viên');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [isOpen, classId, date]);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Gọi UseCase MarkBatchAttendance
      // await controller.markBatchAttendance({ classId, date, records: students });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      toast.success('Đã lưu điểm danh thành công');
      onClose();
    } catch (error) {
      toast.error('Lỗi khi lưu điểm danh');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0,0,0,0.5)" display="flex" alignItems="center" justifyContent="center" zIndex={1000}>
      <Box bg="BACKGROUND_PAPER" width="600px" maxWidth="90%" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" maxHeight="90vh">
        {/* Header */}
        <Box p="lg" borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Text variant="heading-md" weight="bold">Điểm danh: {className}</Text>
            <Text color="SECONDARY" size="sm">Ngày: {new Date(date).toLocaleDateString('vi-VN')}</Text>
          </Box>
          <Button variant="ghost" size="sm" onClick={onClose}><Icon><X /></Icon></Button>
        </Box>

        {/* List */}
        <Box p="lg" overflowY="auto" flex="1">
          {isLoading ? (
            <Text align="center">Đang tải...</Text>
          ) : (
            <Box display="flex" flexDirection="column" gap="md">
              {students.map(student => (
                <Box key={student.id} display="flex" alignItems="center" justifyContent="space-between" p="sm" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md">
                  <Text weight="medium">{student.name}</Text>
                  <Box display="flex" gap="xs">
                    <StatusButton 
                      active={student.status === 'present'} 
                      onClick={() => handleStatusChange(student.id, 'present')}
                      icon={<CheckCircle />} color="SUCCESS" label="Có mặt" 
                    />
                    <StatusButton 
                      active={student.status === 'late'} 
                      onClick={() => handleStatusChange(student.id, 'late')}
                      icon={<Clock />} color="WARNING" label="Muộn" 
                    />
                    <StatusButton 
                      active={student.status === 'absent'} 
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      icon={<XCircle />} color="DANGER" label="Vắng" 
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box p="md" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="flex-end" gap="md">
          <Button variant="ghost" onClick={onClose}>Hủy</Button>
          <Button variant="primary" onClick={handleSave} isLoading={isSaving} leftIcon={<Icon><Save /></Icon>}>Lưu điểm danh</Button>
        </Box>
      </Box>
    </Box>
  );
};

interface StatusButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  color: ColorKey;
  label: string;
}

const StatusButton = ({ active, onClick, icon, color, label }: StatusButtonProps) => (
  <Button 
    size="sm" 
    variant={active ? 'primary' : 'ghost'} 
    onClick={onClick}
    sx={{ 
      backgroundColor: active ? COLORS[color] : 'transparent',
      color: active ? 'white' : COLORS.TEXT_SECONDARY,
      opacity: active ? 1 : 0.5
    }}
  >
    <Box display="flex" gap="xs" alignItems="center">
      <Icon size="xs">{icon}</Icon>
      <Text size="xs">{label}</Text>
    </Box>
  </Button>
);
