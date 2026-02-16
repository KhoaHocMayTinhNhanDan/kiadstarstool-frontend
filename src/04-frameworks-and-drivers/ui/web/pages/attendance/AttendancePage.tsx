// src/04-frameworks-and-drivers/ui/web/pages/attendance/AttendancePage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, ChevronRight, Filter } from 'lucide-react';
import { CheckSquare } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';
export const AttendancePage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedBranch, setSelectedBranch] = useState('');
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập việc lấy lịch học theo ngày

  // Trong thực tế: Cần một UseCase ListClassesByDate(date)
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
        const controller = AppContext.getAttendanceController();

   try {
       const result = await controller.listClassesByDate({date:selectedDate});
        
        if (result.isSuccess) {
          const allClasses = result.getValue();

          // Demo: Lay ngau nhien trang thai diem danh de hien thi UI
          // Thực tế: Cần check trong AttendanceRepository xem lớp này ngày này đã có record chưa

          const mappedClasses = allClasses.map((c: any) => ({
            ...c,
            // Giả lập logic check lịch học (Thực tế cần check c.sessions có chứa thứ của ngày selectedDate không)
            isScheduledToday: true, 
            // Giả lập trạng thái điểm danh (Thực tế cần API check)
            isMarked: Math.random() > 0.5 
          }));
          setClasses(mappedClasses);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      
    };

    fetchSchedule();
  }, [selectedDate]);

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header Section */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">{t('attendance.title')}</Text>
          <Text color="SECONDARY">{t('attendance.subtitle')}</Text>
        </Box>
        <Box display="flex" gap="sm" bg="BACKGROUND_PAPER" p="xs" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
           <Input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ 
                border: 'none', 
                outline: 'none', 
                background: 'transparent' 
              }}
           />

        </Box>
      </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="sm">
          <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
           
          <Select
           
            style={{ 
              padding: SPACING.sm, 
              borderRadius: '4px', 
              border: `1px solid ${COLORS.NEUTRAL_BORDER}` 
            }}
          >
              
              </Select>
           
        </Box>
      </Box>



      {/* Stats Summary (Optional) */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="md">
        <StatBox 
          label="Tổng lớp hôm nay" 
          value={classes.length.toString()} 
          icon={<Calendar />} 
          color="PRIMARY" 
        />
        {/* <StatBox 
          label="Đã điểm danh" 
          value={classes.filter(c => c.isMarked).length.toString()} 
          icon={<CheckCircle />} 
          color="SUCCESS" 
        />
        <StatBox 
          label="Chưa điểm danh" 
          value={classes.filter(c => !c.isMarked).length.toString()} 
          icon={<Clock />} 
          color="WARNING" 

        />
      </Box>

      {/* Schedule List */}
      <Box bg="BACKGROUND_PAPER" borderRadius="lg" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <Box p="md" borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="space-between" alignItems="center">
          <Text weight="bold" size="lg">{t('attendance.today_schedule')}</Text>
          <Button variant="ghost" size="sm" leftIcon={<Icon><Filter /></Icon>}>Lọc</Button>
        </Box>


        <Box>
          {isLoading ? (
            <Box p="xl" textAlign="center"><Text color="SECONDARY">Đang tải lịch học...</Text></Box>
          ) : classes.length === 0 ? (
             <Box p="xl" textAlign="center"><Text color="SECONDARY">Không có lịch học nào trong ngày này.</Text></Box>
          ) : (
            classes.map((cls) => (
              <Box 
                key={cls.id} 
                p="md" 
                borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                style={{ transition: 'background-color 0.2s' }}
                // Hover effect inline for simplicity
                onMouseEnter={(e: { currentTarget: { style: { backgroundColor: string; }; }; }; }) => e.currentTarget.style.backgroundColor = COLORS.NEUTRAL_LIGHT}
                onMouseLeave={(e: { currentTarget: { style: { backgroundColor: string; }; }; }) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Left: Time & Info */}
                <Box display="flex" gap="md" alignItems="center">
                  <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center"
                    p="sm"
                    bg="BACKGROUND_NEUTRAL"
                    borderRadius="md"
                    minWidth="80px"
                  >
                    <Text weight="bold" color="PRIMARY">18:00</Text>
                    <Text size="xs" color="SECONDARY">19:30</Text>
                  </Box>
                  
                  <Box>
                    <Text weight="bold" size="md">{cls.name}</Text>
                    <Box display="flex" gap="md" mt="xxs">
                      <Text size="sm" color="SECONDARY">{cls.code}</Text>
                      <Text size="sm" color="SECONDARY">•</Text>
                      <Text size="sm" color="SECONDARY">{cls.teacherName}</Text>
                    </Box>
                  </Box>
                </Box>

                {/* Right: Status & Action */}
                <Box display="flex" alignItems="center" gap="lg">
                  <Box display="flex" alignItems="center" gap="xs">
                    {cls.isMarked ? (
                      <>
                        <Icon size="xs" color="SUCCESS"><CheckCircle /></Icon>
                        <Text size="sm" color="SUCCESS" weight="medium">{t('attendance.status_marked')}</Text>
                      </>
                    ) : (
                      <>
                        <Icon size="xs" color="WARNING"><Clock /></Icon>
                        <Text size="sm" color="WARNING" weight="medium">{t('attendance.status_pending')}</Text>
                      </>
                    )}
                  </Box>
                  

                  <Button 
                    variant={cls.isMarked ? "outline" : "primary"}
                    size="sm"
                    onClick={() => navigate(`/classes/${cls.id}`)} // Link tới trang chi tiết để điểm danh
                    rightIcon={<Icon><ChevronRight /></Icon>}
                  >
                    {cls.isMarked ? "Xem lại" : t('attendance.mark_action')}
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Helper Component for Stats
const StatBox = ({ label, value, icon, color }: any) => (
  <Box p="md" bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" alignItems="center" gap="md">
    <Box p="sm" borderRadius="full" bg={`${color}_LIGHT` as any} color={color}>
      <Icon>{icon}</Icon>
    </Box>
    <Box>
      <Text color="SECONDARY" size="sm">{label}</Text>
      <Text weight="bold" size="xl">{value}</Text>
    </Box>
  </Box>
);