// src/04-frameworks-and-drivers/ui/web/pages/classes/components/ClassAttendanceList.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, CircleDashed, CheckSquare } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/00-core/app-context';
import { type AttendanceListItem } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';

interface ClassAttendanceListProps {
  classId: string;
}

export const ClassAttendanceList = ({ classId }: ClassAttendanceListProps) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceList, setAttendanceList] = useState<AttendanceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const controller = AppContext.getAttendanceController();
        const result = await controller.listByClass({ classId, date });
        
        if (result.isSuccess) {
          setAttendanceList(result.getValue());
        }
      } catch (error) {
        console.error('Failed to fetch attendance', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [classId, date]);

  const handleStatusClick = async (studentId: string, currentStatus: string) => {
    // 1. Xác định trạng thái tiếp theo (Cycle: Present -> Absent -> Late -> Excused -> Present)
    const statusCycle: Record<string, any> = {
      'not_marked': ATTENDANCE_STATUS.PRESENT,
      [ATTENDANCE_STATUS.PRESENT]: ATTENDANCE_STATUS.ABSENT,
      [ATTENDANCE_STATUS.ABSENT]: ATTENDANCE_STATUS.LATE,
      [ATTENDANCE_STATUS.LATE]: ATTENDANCE_STATUS.EXCUSED,
      [ATTENDANCE_STATUS.EXCUSED]: ATTENDANCE_STATUS.PRESENT,
    };
    
    const nextStatus = statusCycle[currentStatus] || ATTENDANCE_STATUS.PRESENT;

    // 2. Optimistic Update (Cập nhật UI ngay lập tức)
    const previousList = [...attendanceList];
    setAttendanceList(prev => prev.map(item => 
      item.studentId === studentId ? { ...item, status: nextStatus } : item
    ));

    try {
      // 3. Gọi API
      const controller = AppContext.getAttendanceController();
      const result = await controller.markAttendance({
        classId,
        studentId,
        date,
        status: nextStatus
      });

      if (result.isFailure) {
        throw new Error(result.getErrorValue() as string);
      }
    } catch (error) {
      // 4. Revert nếu lỗi
      setAttendanceList(previousList);
      toast.error('Không thể cập nhật điểm danh');
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT: return COLORS.SUCCESS;
      case ATTENDANCE_STATUS.ABSENT: return COLORS.DANGER;
      case ATTENDANCE_STATUS.LATE: return COLORS.WARNING;
      case ATTENDANCE_STATUS.EXCUSED: return COLORS.INFO;
      case 'not_marked': return COLORS.SECONDARY;
      default: return COLORS.NEUTRAL;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT: return 'Có mặt';
      case ATTENDANCE_STATUS.ABSENT: return 'Vắng';
      case ATTENDANCE_STATUS.LATE: return 'Đi muộn';
      case ATTENDANCE_STATUS.EXCUSED: return 'Có phép';
      case 'not_marked': return 'Chưa điểm danh';
      default: return status;
    }
  };

  const handleMarkAllPresent = async () => {
    // 1. Lọc ra những học viên chưa được điểm danh
    const studentsToMark = attendanceList.filter(item => (item.status as string) === 'not_marked');
    
    if (studentsToMark.length === 0) {
      toast.info('Tất cả học viên đã được điểm danh.');
      return;
    }

    // 2. Optimistic Update
    const previousList = [...attendanceList];
    setAttendanceList(prev => prev.map(item => 
      (item.status as string) === 'not_marked' ? { ...item, status: ATTENDANCE_STATUS.PRESENT } : item
    ));

    try {
      // 3. Gọi API Batch
      const controller = AppContext.getAttendanceController();
      const result = await controller.markBatch({
        classId,
        date,
        studentIds: studentsToMark.map(s => s.studentId),
        status: ATTENDANCE_STATUS.PRESENT
      });

      if (result.isSuccess) {
        toast.success(`Đã điểm danh cho ${result.getValue().updatedCount} học viên.`);
      } else {
        throw new Error(result.getErrorValue() as string);
      }
    } catch (error) {
      setAttendanceList(previousList);
      toast.error('Lỗi khi điểm danh nhanh.');
      console.error(error);
    }
  };

  const notMarkedCount = attendanceList.filter(item => (item.status as string) === 'not_marked').length;

  return (
    <Box display="flex" flexDirection="column" gap="md">
      {/* Date Picker Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="sm">
        <Box display="flex" alignItems="center" gap="sm">
          <Icon><Calendar /></Icon>
          <Text weight="semibold">Ngày điểm danh:</Text>
          <Input 
            type="date" 
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </Box>

        <Button 
          variant="primary" 
          size="sm"
          leftIcon={<Icon><CheckSquare /></Icon>}
          onClick={handleMarkAllPresent}
          disabled={notMarkedCount === 0 || isLoading}
        >
          Điểm danh nhanh ({notMarkedCount})
        </Button>
      </Box>

      {/* List Section */}
      <Box 
        css={css`
          border: 1px solid ${COLORS.NEUTRAL_BORDER};
          border-radius: ${RADIUS.md};
          overflow: hidden;
        `}
      >
        {/* Header */}
        <Box 
          display="grid" 
          bg="NEUTRAL_LIGHT" 
          p="sm"
          css={css`grid-template-columns: 2fr 1fr 1fr 1fr; font-weight: bold;`}
        >
          <Text>Học viên</Text>
          <Text>Trạng thái</Text>
          <Text>Giờ vào</Text>
          <Text>Điểm</Text>
        </Box>

        {/* Body */}
        {isLoading ? (
          <Box p="lg" display="flex" justifyContent="center"><Text>Đang tải...</Text></Box>
        ) : (
          attendanceList.map((item) => (
            <Box 
              key={item.id}
              display="grid" 
              p="sm"
              css={css`
                grid-template-columns: 2fr 1fr 1fr 1fr;
                border-top: 1px solid ${COLORS.NEUTRAL_BORDER};
                align-items: center;
                &:hover { background-color: ${COLORS.BACKGROUND_light}; }
              `}
            >
              <Text weight="medium">{item.studentName}</Text>
              
              <Box display="flex" alignItems="center" gap="xs">
                <Box 
                  onClick={() => handleStatusClick(item.studentId, item.status)}
                  css={css`
                    display: flex; 
                    align-items: center; 
                    gap: ${SPACING.xs};
                    cursor: pointer;
                    padding: ${SPACING.xs} ${SPACING.sm};
                    border-radius: ${RADIUS.sm};
                    transition: background-color 0.2s;
                    &:hover { background-color: ${COLORS.NEUTRAL_LIGHT}; }
                  `}
                >
                  <Icon size="sm" color={(item.status as string) === ATTENDANCE_STATUS.ABSENT ? 'DANGER' : (item.status as string) === ATTENDANCE_STATUS.LATE ? 'WARNING' : (item.status as string) === ATTENDANCE_STATUS.EXCUSED ? 'INFO' : (item.status as string) === ATTENDANCE_STATUS.PRESENT ? 'SUCCESS' : 'SECONDARY'}>
                    {(item.status as string) === 'not_marked' ? <CircleDashed /> : <CheckCircle />}
                  </Icon>
                  <Text size="sm" weight="medium" css={css`color: ${getStatusColor(item.status)}`}>{getStatusLabel(item.status)}</Text>
                </Box>
              </Box>

              <Text size="sm">{item.checkInTime ? new Date(item.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}</Text>
              
              <Text weight="bold">{item.score}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
