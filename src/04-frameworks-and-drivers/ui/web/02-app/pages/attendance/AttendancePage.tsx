// src/04-frameworks-and-drivers/ui/web/pages/attendance/AttendancePage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, ChevronRight, Filter, AlertCircle } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { AttendanceCheckinModal } from './components/AttendanceCheckinModal';

interface Branch {
  id: string;
  name: string;
}

interface ClassScheduleItem {
  id: string;
  name: string;
  code: string;
  teacherName: string;
  sessions?: { day: string; startTime: string; endTime: string }[];
  // Các trường có thể có từ API
  isMarked?: boolean; 
}

export const AttendancePage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  // Helper: Lấy ngày hiện tại theo giờ địa phương (YYYY-MM-DD)
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [classes, setClasses] = useState<ClassScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [selectedClassForCheckin, setSelectedClassForCheckin] = useState<{id: string, name: string} | null>(null);

  // Đảm bảo ngày mặc định luôn là "hôm nay" khi component được hiển thị lần đầu.
  useEffect(() => {
    setSelectedDate(getTodayString());
  }, []);

  // 1. Fetch Branches for Filter
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.listBranches({});
        if (result.isSuccess) {
          setBranches(result.getValue());
        }
      } catch (error) {
        console.error('Failed to fetch branches', error);
      }
    };
    fetchBranches();
  }, []);

  // 2. Fetch Schedule (Classes by Date & Branch)
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      const controller = AppContext.getClassesController();

      try {
        // Gọi UseCase thực tế với ngày và chi nhánh đã chọn
        const result = await controller.listClassesByDate(selectedDate, selectedBranch);
        
        if (result.isSuccess) {
          const allClasses = result.getValue();
          setClasses(allClasses as unknown as ClassScheduleItem[]);
        }
      } catch (error) {
        console.error(error);
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDate, selectedBranch]);

  // Helper: Lấy giờ học dựa trên ngày đã chọn
  const getClassTime = (cls: ClassScheduleItem) => {
    if (!cls.sessions || cls.sessions.length === 0) return { start: '--:--', end: '--:--' };
    
    const date = new Date(selectedDate);
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayMap[date.getDay()];
    
    const session = cls.sessions.find((s: any) => s.day === dayName);
    return session ? { start: session.startTime, end: session.endTime } : { start: 'N/A', end: 'N/A' };
  };

  const handleOpenCheckin = (cls: ClassScheduleItem) => {
    setSelectedClassForCheckin({ id: cls.id, name: cls.name });
    setIsCheckinModalOpen(true);
  };

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header Section & Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">{t('attendance.title')}</Text>
          <Text color="SECONDARY">{t('attendance.subtitle')}</Text>
        </Box>
        
        <Box display="flex" gap="md">
          {/* Date Picker */}
          <Box display="flex" gap="sm" bg="BACKGROUND_PAPER" p="xs" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} alignItems="center">
             <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
             <Input 
                type="date" 
                value={selectedDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                style={{ 
                  border: 'none', 
                  outline: 'none', 
                  background: 'transparent' 
                }}
             />
          </Box>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedDate(getTodayString())}
          >
            Hôm nay
          </Button>

          {/* Branch Select */}
          <Box display="flex" alignItems="center" gap="sm">
            <select
              value={selectedBranch}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBranch(e.target.value)}
              style={{ 
                padding: SPACING.sm, 
                borderRadius: '4px', 
                border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
                minWidth: '200px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Tất cả chi nhánh</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Box>
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
      </Box>

      {/* Schedule List */}
      <Box bg="BACKGROUND_PAPER" borderRadius="lg" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <Box p="md" borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="space-between" alignItems="center">
          <Text weight="bold" size="lg">{t('attendance.today_schedule')}</Text>
        </Box>

        <Box>
          {isLoading ? (
            <Box p="xl" textAlign="center"><Text color="SECONDARY">Đang tải lịch học...</Text></Box>
          ) : classes.length === 0 ? (
             <Box p="xl" textAlign="center"><Text color="SECONDARY">Không có lịch học nào trong ngày này.</Text></Box>
          ) : (
            classes.map((cls) => {
              const time = getClassTime(cls);
              return (
                <Box 
                  key={cls.id} 
                  p="md" 
                  borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ transition: 'background-color 0.2s' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = COLORS.NEUTRAL_LIGHT}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                      <Text weight="bold" color="PRIMARY">{time.start}</Text>
                      <Text size="xs" color="SECONDARY">{time.end}</Text>
                    </Box>
                    
                    <Box>
                      <Text weight="bold" size="md">{cls.name}</Text>
                      <Box display="flex" gap="md" mt="xxs">
                        <Text size="sm" color="SECONDARY">{cls.code}</Text>
                        <Text size="sm" color="SECONDARY">•</Text>
                        <Text size="sm" color="SECONDARY">{cls.teacherName || 'Chưa phân công'}</Text>
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
                          <Icon size="xs" color="WARNING"><AlertCircle /></Icon>
                          <Text size="sm" color="WARNING" weight="medium">{t('attendance.status_pending')}</Text>
                        </>
                      )}
                    </Box>
                    
                    <Button 
                      variant={cls.isMarked ? "outline" : "primary"}
                      size="sm"
                      onClick={() => handleOpenCheckin(cls)} // Mở modal điểm danh
                      rightIcon={<Icon><ChevronRight /></Icon>}
                    >
                      {cls.isMarked ? "Xem lại" : t('attendance.mark_action')}
                    </Button>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Box>

      {/* Check-in Modal */}
      {selectedClassForCheckin && (
        <AttendanceCheckinModal 
          isOpen={isCheckinModalOpen}
          onClose={() => setIsCheckinModalOpen(false)}
          classId={selectedClassForCheckin.id}
          className={selectedClassForCheckin.name}
          date={selectedDate}
        />
      )}
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