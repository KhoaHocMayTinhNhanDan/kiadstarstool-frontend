/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box, Button, Icon, Input, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { Calendar, Save, RefreshCw, CheckCircle } from 'lucide-react';
import { useClassAttendance } from '../../../hooks/class/useClassAttendance';
import { AttendanceStats } from './AttendanceStats';
import { AttendanceTable } from './AttendanceTable';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../../01-ui-core/hooks/useToast';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';

interface ClassAttendanceListProps {
  classId: string;
}

export const AttendanceList = ({ classId }: ClassAttendanceListProps) => {
  const { toast } = useToast();
  const { 
    attendanceList, 
    isLoading, 
    selectedDate, 
    setSelectedDate, 
    fetchAttendance, 
    statsData 
  } = useClassAttendance(classId);

  const [isSaving, setIsSaving] = useState(false);

  const handleMarkAttendance = async (studentId: string, status: string) => {
    // Optimistic update or direct API call could go here.
    // For simplicity in this list view, we might just trigger a single update
    // or let the Table component handle local state and we save in bulk.
    // Here we implement a direct save for immediate feedback.
    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.markAttendance({
        classId,
        date: selectedDate,
        studentId,
        status: status as any
      });

      if (result.isSuccess) {
        toast.success('Đã cập nhật điểm danh');
        fetchAttendance(); // Refresh data
      } else {
        toast.error('Cập nhật thất bại');
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
    }
  };

  const handleMarkAllPresent = async () => {
    if (!attendanceList.length) return;
    
    const studentIds = attendanceList.map(s => s.studentId);
    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.markBatchAttendance({
        classId,
        date: selectedDate,
        studentIds,
        status: ATTENDANCE_STATUS.PRESENT
      });

      if (result.isSuccess) {
        toast.success(`Đã điểm danh ${result.getValue().updatedCount} học viên`);
        fetchAttendance();
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
        <Box display="flex" alignItems="center" gap="sm">
          <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
          <Input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ 
              padding: SPACING.sm, 
              borderRadius: '4px', 
              border: `1px solid ${COLORS.NEUTRAL_BORDER}` 
            }}
          />
        </Box>
        <Box display="flex" gap="sm">
          <Button size="sm" variant="outline" onClick={handleMarkAllPresent} leftIcon={<Icon><CheckCircle /></Icon>}>
            Tất cả có mặt
          </Button>
          <Button size="sm" variant="ghost" onClick={fetchAttendance} isLoading={isLoading} leftIcon={<Icon><RefreshCw /></Icon>}>
            Làm mới
          </Button>
        </Box>
      </Box>

      {/* Biểu đồ thống kê */}
      {!isLoading && <AttendanceStats statsData={statsData} selectedDate={selectedDate} />}

      <AttendanceTable 
        data={attendanceList} 
        isLoading={isLoading} 
        onMarkAttendance={handleMarkAttendance}
      />
    </Box>
  );
};