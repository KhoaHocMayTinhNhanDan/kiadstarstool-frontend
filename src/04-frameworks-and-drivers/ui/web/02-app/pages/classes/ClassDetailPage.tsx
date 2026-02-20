/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Edit, Calendar, Users, BookOpen, DollarSign } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { AttendanceList } from '../attendance/components/AttendanceList';
import { useClassAttendance } from '@/04-frameworks-and-drivers/ui/web/02-app/hooks/class/useClassAttendance';

export const ClassDetailPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  const [classData, setClassData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sử dụng hook để lấy dữ liệu điểm danh cho việc tính toán sĩ số
  const { attendanceList } = useClassAttendance(classId || '');

  // Tính toán sĩ số thực tế: Đếm số học viên Có mặt (present) hoặc Đi muộn (late)
  const currentStudentsCount = useMemo(() => {
    if (!attendanceList) return 0; // Guard against undefined
    return attendanceList.filter((record: any) => 
      record.status === 'present' || record.status === 'late'
    ).length;
  }, [attendanceList]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;
      setIsLoading(true);
      try {
        const controller = AppContext.getClassesController();
        const result = await controller.getClassDetails(classId);

        if (result.isSuccess) {
          setClassData(result.getValue());
        } else {
          toast.error(t('classes.not_found'));
          navigate('/classes');
        }
      } catch (error) {
        console.error('Failed to fetch class details', error);
        toast.error(t('common.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, navigate, t]);

  if (isLoading) {
    return <Box p="xl"><Text>{t('common.loading')}</Text></Box>;
  }

  if (!classData) return null;

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/classes')}
            leftIcon={<Icon><ArrowLeft /></Icon>}
          />
          <Text as="h1" variant="heading-lg" weight="bold">{classData.name}</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Edit /></Icon>}
          size="sm"
          onClick={() => navigate(`/classes/${classId}/edit`)}
        >
          {t('common.edit')}
        </Button>
      </Box>

      {/* Main Info Card */}
      <Box 
        p="xl" 
        bg="BACKGROUND_PAPER" 
        borderRadius="lg" 
        border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        css={css`box-shadow: ${SHADOWS.sm};`}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb="lg">
          <Box px="sm" py="xxs" bg="SUCCESS_LIGHT" borderRadius="full">
            <Text size="xs" weight="bold" color="SUCCESS">{classData.status.toUpperCase()}</Text>
          </Box>
          <Box textAlign="right">
             <Text color="SECONDARY" size="sm">Ngày bắt đầu</Text>
             <Text weight="medium">{classData.startDate ? new Date(classData.startDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</Text>
          </Box>
        </Box>
        <Box 
          display="grid" 
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
          gap="lg"
          pt="lg"
          borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        >
          <DetailItem 
            icon={<Users />} 
            label="Sĩ số" 
            value={`${currentStudentsCount} / ${classData.maxStudents} Học viên`} 
          />
          <DetailItem 
            icon={<Calendar />} 
            label="Lịch học" 
            value={classData.schedule || 'Chưa cập nhật'} 
          />
          <DetailItem 
            icon={<BookOpen />} 
            label="Giáo viên" 
            value={classData.teacherName || 'Chưa phân công'} 
          />
          <DetailItem 
            icon={<DollarSign />} 
            label="Học phí"
            value={
              <Box>
                {classData.tuition?.courseFee && <Text sx={{ display: 'block' }}>{classData.tuition.courseFee.toLocaleString('vi-VN')} {classData.tuition.currency} / Khóa</Text>}
                {classData.tuition?.sessionFee && <Text sx={{ display: 'block' }}>{classData.tuition.sessionFee.toLocaleString('vi-VN')} {classData.tuition.currency} / Buổi</Text>}
                {classData.tuition?.monthlyFee && <Text sx={{ display: 'block' }}>{classData.tuition.monthlyFee.toLocaleString('vi-VN')} {classData.tuition.currency} / Tháng</Text>}
                {!classData.tuition?.courseFee && !classData.tuition?.sessionFee && !classData.tuition?.monthlyFee && <Text>Chưa thiết lập</Text>}
              </Box>
            } 
          />
        </Box>
      </Box>

      {/* Attendance Section */}
      <Box mt="lg">
        <Text as="h2" variant="heading-lg" weight="bold" mb="md">Điểm danh</Text>
        {/* 
          Lỗi "Cannot read properties of undefined (reading 'length')" xảy ra bên trong AttendanceList.
          Điều này là do hook useClassAttendance có thể trả về `undefined` trong khi tải dữ liệu.
          Để khắc phục, component AttendanceList cần được sửa để xử lý trường hợp này, ví dụ bằng cách truyền một mảng rỗng `[]` vào DataTable nếu dữ liệu chưa có.
        */}
        <AttendanceList classId={classId || ''} />
      </Box>
    </Box>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <Box display="flex" gap="md" alignItems="center" p="md" bg="BACKGROUND_NEUTRAL" borderRadius="md">
    <Icon size="md" color="PRIMARY">{icon}</Icon>
    <Box>
      <Text color="SECONDARY" size="sm" mb="xxs">{label}</Text>
      <Box fontWeight="semibold">{value}</Box>
    </Box>
  </Box>
);