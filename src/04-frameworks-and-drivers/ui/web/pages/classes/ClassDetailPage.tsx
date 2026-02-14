/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Edit, Calendar, Users, BookOpen } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';
import { ClassAttendanceList } from './components/ClassAttendanceList';

export const ClassDetailPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  const [classData, setClassData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          >
            {t('branch.list_title')}
          </Button>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Edit /></Icon>}
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
          <Box>
            <Box display="flex" alignItems="center" gap="md" mb="xs">
              <Text as="h1" variant="heading-xl" weight="bold" color="PRIMARY">{classData.name}</Text>
              <Box px="sm" py="xxs" bg="SUCCESS_LIGHT" borderRadius="full">
                <Text size="xs" weight="bold" color="SUCCESS">{classData.status}</Text>
              </Box>
            </Box>
            <Text color="SECONDARY" size="lg">{classData.code}</Text>
          </Box>
          <Box textAlign="right">
             <Text color="SECONDARY" size="sm">Ngày bắt đầu</Text>
             <Text weight="medium">{new Date(classData.startDate).toLocaleDateString('vi-VN')}</Text>
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
            value={`${classData.currentStudents} / ${classData.maxStudents} Học viên`} 
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
        </Box>
      </Box>

      {/* Attendance Section */}
      <Box mt="lg">
        <Text as="h2" variant="heading-lg" weight="bold" mb="md">Điểm danh</Text>
        {/* Truyền classId vào component danh sách điểm danh */}
        <ClassAttendanceList classId={classId || ''} />
      </Box>
    </Box>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <Box display="flex" gap="md" alignItems="center">
    <Box p="md" bg="BACKGROUND_NEUTRAL" borderRadius="full" color="PRIMARY">
      <Icon size="md">{icon}</Icon>
    </Box>
    <Box>
      <Text color="SECONDARY" size="sm" mb="xxs">{label}</Text>
      <Text weight="semibold">{value}</Text>
    </Box>
  </Box>
);