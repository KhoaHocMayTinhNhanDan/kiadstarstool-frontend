/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box, Button, Icon, Input, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { Calendar, Save, RefreshCw, CheckCircle, XCircle, UserX } from 'lucide-react';
import { useClassAttendance } from '../../../hooks/class/useClassAttendance';
import { AttendanceStats } from './AttendanceStats';
import { AttendanceTable } from './AttendanceTable';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../../hooks/user/useAuth';

interface ClassAttendanceListProps {
  classId: string;
}

export const AttendanceList = ({ classId }: ClassAttendanceListProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    attendanceList, 
    setAttendanceList, // Lấy hàm này từ hook đã sửa
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
      // 1. Optimistic Update: Cập nhật UI ngay lập tức
      const updatedList = attendanceList.map(item => {
        if (item.studentId !== studentId) return item;

        // Tính toán lại số buổi còn lại
        let newRemaining = item.remainingSessions;
        if (typeof newRemaining === 'number') {
          const wasPresent = item.status === 'present' || item.status === 'late';
          const isNowPresent = status === 'present' || status === 'late';

          if (!wasPresent && isNowPresent) {
            newRemaining = newRemaining - 1; // Chưa đi -> Đi: Trừ 1
          } else if (wasPresent && !isNowPresent) {
            newRemaining = newRemaining + 1; // Đang đi -> Nghỉ: Cộng lại 1
          }
        }
        return { ...item, status: status as any, remainingSessions: newRemaining };
      });
      setAttendanceList(updatedList);

      // 2. Gọi API lưu xuống DB
      const controller = AppContext.getAttendanceController();
      const result = await controller.markAttendance({
        classId,
        date: selectedDate,
        studentId,
        status: status as any,
        performedBy: user?.id || 'unknown'
      });

      if (result.isSuccess) {
        // Không cần fetchAttendance() ngay lập tức để tránh race condition với Mock DB
        // toast.success('Đã cập nhật điểm danh'); 
      } else {
        toast.error('Cập nhật thất bại');
        fetchAttendance(); // Revert lại nếu lỗi
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
    }
  };

  const handleMarkAllPresent = async () => {
    if (!attendanceList.length) return;
    
    const studentIds = attendanceList.map(s => s.studentId);
    
    // 1. Optimistic Update: Cập nhật toàn bộ UI ngay lập tức thành 'present'
    const optimisticList = attendanceList.map(s => {
      let newRemaining = s.remainingSessions;
      const wasPresent = s.status === 'present' || s.status === 'late';
      // Nếu trước đó chưa tính là đi học (Vắng/Chưa điểm danh) thì giờ trừ 1 buổi
      if (typeof newRemaining === 'number' && !wasPresent) {
        newRemaining = newRemaining - 1;
      }
      return { ...s, status: 'present' as any, remainingSessions: newRemaining };
    });
    setAttendanceList(optimisticList);

    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.markBatchAttendance({
        classId,
        date: selectedDate,
        studentIds,
        status: 'present' as any,
        performedBy: user?.id || 'unknown'
      });

      if (result.isSuccess) {
        toast.success(`Đã cập nhật ${result.getValue().updatedCount} học viên`);
        // Không gọi fetchAttendance() ở đây để tránh việc Mock DB chưa lưu xong đã load lại dữ liệu cũ
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
    }
  };

  const handleMarkAllAbsent = async () => {
    if (!attendanceList.length) return;
    
    const studentIds = attendanceList.map(s => s.studentId);

    // 1. Optimistic Update: Cập nhật toàn bộ UI ngay lập tức thành 'absent'
    const optimisticList = attendanceList.map(s => {
      let newRemaining = s.remainingSessions;
      const wasPresent = s.status === 'present' || s.status === 'late';
      // Nếu trước đó đang tính là đi học (Có mặt/Muộn) thì giờ cộng lại 1 buổi
      if (typeof newRemaining === 'number' && wasPresent) {
        newRemaining = newRemaining + 1;
      }
      return { ...s, status: 'absent' as any, remainingSessions: newRemaining };
    });
    setAttendanceList(optimisticList);

    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.markBatchAttendance({
        classId,
        date: selectedDate,
        studentIds,
        status: 'absent' as any,
        performedBy: user?.id || 'unknown'
      });

      if (result.isSuccess) {
        toast.success(`Đã cập nhật ${result.getValue().updatedCount} học viên`);
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
    }
  };

  const handleAutoMarkAbsent = async () => {
    // Tìm những học viên chưa được điểm danh trong list hiện tại để update UI Optimistic
    const unmarkedStudents = attendanceList.filter(s => s.status === 'not_marked');
    
    if (unmarkedStudents.length === 0) {
      toast.info('Tất cả học viên đã được điểm danh');
      return;
    }

    // Optimistic Update
    const optimisticList = attendanceList.map(s => 
      s.status === 'not_marked' ? { ...s, status: 'absent' as any } : s
    );
    setAttendanceList(optimisticList);

    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.autoMarkAbsent({
        classId,
        date: selectedDate,
        performedBy: user?.id || 'unknown'
      });

      if (result.isSuccess) {
        toast.success(`Đã đánh vắng ${result.getValue().markedCount} học viên còn lại`);
      }
    } catch (error) {
      toast.error('Lỗi hệ thống');
      fetchAttendance(); // Revert
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
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleMarkAllAbsent} 
            leftIcon={<Icon><XCircle /></Icon>}
            sx={{ color: COLORS.DANGER, borderColor: COLORS.DANGER }}
          >
            Tất cả vắng mặt
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleAutoMarkAbsent} 
            leftIcon={<Icon><UserX /></Icon>}
            title="Đánh dấu vắng mặt cho những người chưa điểm danh"
          >
            Đánh vắng còn lại
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