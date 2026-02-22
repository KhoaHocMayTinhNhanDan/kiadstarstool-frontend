import { useState, useEffect, useMemo } from 'react';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/03-ui-shared/constants/tokens-constants';

export const useClassAttendance = (classId: string) => {
  const { toast } = useToast();
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.listAttendanceByClass({
        classId,
        date: selectedDate
      });

      if (result.isSuccess) {
        setAttendanceList(result.getValue());
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      console.error('Failed to fetch attendance', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchAttendance();
    }
  }, [classId, selectedDate]);

  // Tính toán dữ liệu cho biểu đồ
  const statsData = useMemo(() => {
    const counts: Record<string, number> = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      not_marked: 0
    };

    attendanceList.forEach((record: any) => {
      if (counts[record.status] !== undefined) {
        counts[record.status]++;
      }
    });

    return [
      { name: 'Có mặt', value: counts.present, color: COLORS.SUCCESS },
      { name: 'Vắng mặt', value: counts.absent, color: COLORS.DANGER },
      { name: 'Đi muộn', value: counts.late, color: COLORS.WARNING },
      { name: 'Có phép', value: counts.excused, color: COLORS.INFO },
      { name: 'Chưa điểm danh', value: counts.not_marked, color: COLORS.SECONDARY },
    ].filter(item => item.value > 0);
  }, [attendanceList]);

  return { attendanceList, isLoading, selectedDate, setSelectedDate, fetchAttendance, statsData };
};