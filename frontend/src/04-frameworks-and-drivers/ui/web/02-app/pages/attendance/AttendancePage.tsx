// src/04-frameworks-and-drivers/ui/web/02-app/pages/attendance/AttendancePage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { css } from '@emotion/react';
import { 
  Box, 
  Text, 
  Button, 
  Icon, 
  Input,
  Badge,
  LoadingSpinner
} from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Clock, 
  ChevronRight,
  Building,
  ArrowLeft,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { COLORS, SPACING, SHADOWS, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { AttendanceList } from './components/AttendanceList';
import { AttendanceCheckinModal } from './components/AttendanceCheckinModal';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

export const AttendancePage = () => {
  // --- State ---
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [checkinClassData, setCheckinClassData] = useState<{id: string, name: string} | null>(null);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const classController = AppContext.getClassesController();
        const branchController = AppContext.getBranchController();

        const [classesResult, branchesResult] = await Promise.all([
          classController.listClassesByBranch(''), // Fetch all
          branchController.listBranches({})
        ]);

        if (classesResult.isSuccess) {
          setClasses(classesResult.getValue());
        }
        if (branchesResult.isSuccess) {
          setBranches(branchesResult.getValue());
        }
      } catch (error) {
        console.error("Failed to fetch attendance data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Derived Data ---
  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            cls.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = selectedBranchId ? cls.branchId === selectedBranchId : true;
      return matchesSearch && matchesBranch;
    });
  }, [classes, searchQuery, selectedBranchId]);

  // Identify classes happening today
  const todayClasses = useMemo(() => {
    const today = new Date();
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = dayMap[today.getDay()];
    
    return filteredClasses.filter(cls => 
      cls.status === ClassStatus.ACTIVE && 
      cls.sessions?.some((s: any) => s.day === currentDay)
    );
  }, [filteredClasses]);

  // --- Handlers ---
  const handleClassSelect = (classId: string) => {
    setSelectedClassId(classId);
  };

  const handleBackToList = () => {
    setSelectedClassId(null);
  };

  const handleQuickCheckin = (e: React.MouseEvent | undefined, cls: any) => {
    e?.stopPropagation();
    setCheckinClassData({ id: cls.id, name: cls.name });
    setIsCheckinModalOpen(true);
  };

  // --- Render: Detail View ---
  if (selectedClassId) {
    const selectedClass = classes.find(c => c.id === selectedClassId);
    return (
      <Box>
        <Box mb="md">
          <Button 
            variant="ghost" 
            size="sm" 
            leftIcon={<Icon><ArrowLeft /></Icon>}
            onClick={handleBackToList}
          >
            Quay lại danh sách
          </Button>
        </Box>
        
        <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Text variant="heading-lg" weight="bold">{selectedClass?.name}</Text>
            <Text color="SECONDARY">{selectedClass?.code} • {selectedClass?.teacherName}</Text>
          </Box>
          <Button 
            variant="primary" 
            leftIcon={<Icon><CheckCircle /></Icon>}
            onClick={(e) => selectedClass && handleQuickCheckin(e, selectedClass)}
          >
            Điểm danh hôm nay
          </Button>
        </Box>

        <AttendanceList classId={selectedClassId} />

        {/* Modal for Detail View */}
        {checkinClassData && (
          <AttendanceCheckinModal
            isOpen={isCheckinModalOpen}
            onClose={() => setIsCheckinModalOpen(false)}
            classId={checkinClassData.id}
            className={checkinClassData.name}
            date={new Date().toISOString()}
          />
        )}
      </Box>
    );
  }

  // --- Render: List View ---
  return (
    <Box display="flex" flexDirection="column" gap="xl">
      {/* Header & Filters */}
      <Box>
        <Text as="h1" variant="heading-xl" weight="bold" mb="sm">Quản lý Điểm danh</Text>
        <Text color="SECONDARY" mb="lg">Theo dõi và quản lý điểm danh cho tất cả các lớp học.</Text>

        <Box 
          display="flex" 
          gap="md" 
          flexWrap="wrap" 
          p="md" 
          bg="BACKGROUND_PAPER" 
          borderRadius="md" 
          border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        >
          <Box flex="1" minWidth="200px">
            <Box display="flex" alignItems="center" gap="sm" width="100%" bg="NEUTRAL_LIGHT" borderRadius="md" px="md">
              <Icon color="SECONDARY"><Search /></Icon>
              <Input 
                placeholder="Tìm kiếm lớp học..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', padding: '10px 0' }}
              />
            </Box>
          </Box>
          
          <Box minWidth="200px">
            <Box position="relative">
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
                  backgroundColor: 'white',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Tất cả chi nhánh</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <Box position="absolute" right="12px" top="50%" style={{ transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Icon size="sm" color="SECONDARY"><Filter /></Icon>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py="4xl">
          <LoadingSpinner size="lg" />
        </Box>
      ) : (
        <>
          {/* Today's Classes Section */}
          {todayClasses.length > 0 && (
            <Box>
              <Box display="flex" alignItems="center" gap="sm" mb="md">
                <Icon color="PRIMARY"><Calendar /></Icon>
                <Text variant="heading-md" weight="bold">Lớp học hôm nay</Text>
                <Badge color="primary" size="sm">{todayClasses.length}</Badge>
              </Box>
              
              <Box 
                css={css`
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                  gap: ${SPACING.sm};
                `}
              >
                {todayClasses.map(cls => (
                  <ClassAttendanceCard 
                    key={cls.id} 
                    data={cls} 
                    onClick={() => handleClassSelect(cls.id)}
                    isToday={true}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* All Classes Section */}
          <Box>
            <Box display="flex" alignItems="center" gap="sm" mb="md">
              <Icon color="SECONDARY"><BookOpen /></Icon>
              <Text variant="heading-md" weight="bold">Tất cả lớp học</Text>
            </Box>
            
            {filteredClasses.length === 0 ? (
              <Box p="xl" textAlign="center" bg="NEUTRAL_LIGHT" borderRadius="md">
                <Text color="SECONDARY">Không tìm thấy lớp học nào.</Text>
              </Box>
            ) : (
              <Box 
                css={css`
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                  gap: ${SPACING.sm};
                `}
              >
                {filteredClasses.map(cls => (
                  <ClassAttendanceCard 
                    key={cls.id} 
                    data={cls} 
                    onClick={() => handleClassSelect(cls.id)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </>
      )}

      {/* Global Modal */}
      {checkinClassData && (
        <AttendanceCheckinModal
          isOpen={isCheckinModalOpen}
          onClose={() => setIsCheckinModalOpen(false)}
          classId={checkinClassData.id}
          className={checkinClassData.name}
          date={new Date().toISOString()}
        />
      )}
    </Box>
  );
};

// --- Helpers & Animations from ClassesPage ---
const pulseAnimation = css`animation: pulse 1.5s infinite; @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }`;

const getProgressInfo = (startTime: string, endTime: string) => {
  const now = new Date();
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  
  const start = new Date(); start.setHours(startH, startM, 0, 0);
  const end = new Date(); end.setHours(endH, endM, 0, 0);
  
  const totalDuration = (end.getTime() - start.getTime());
  const elapsed = (now.getTime() - start.getTime());
  const remaining = (end.getTime() - now.getTime());
  
  const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  const remainingMinutes = Math.ceil(remaining / 60000);
  
  return { percent, remainingMinutes };
};

const getSessionStatus = (sessions: any[]) => {
  if (!sessions || sessions.length === 0) return null;

  const now = new Date();
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayMap[now.getDay()];
  
  const todaySessions = sessions.filter((s: any) => s.day === currentDay);
  if (todaySessions.length === 0) return null;

  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHour}:${currentMinute}`;

  // 1. Đang diễn ra
  const isHappening = todaySessions.some((s: any) => s.startTime <= currentTime && s.endTime >= currentTime);
  if (isHappening) {
    const session = todaySessions.find((s: any) => s.startTime <= currentTime && s.endTime >= currentTime);
    const progress = getProgressInfo(session.startTime, session.endTime);
    return { type: 'happening', label: 'Đang diễn ra', color: 'DANGER', animate: true, progress };
  }

  // 2. Sắp diễn ra
  const upcomingSession = todaySessions.find((s: any) => s.startTime > currentTime);
  if (upcomingSession) {
    const [h, m] = upcomingSession.startTime.split(':').map(Number);
    const start = new Date(); start.setHours(h, m, 0, 0);
    return { type: 'upcoming', targetDate: start, color: 'WARNING', animate: false };
  }

  // 3. Đã xong
  return { type: 'finished', label: 'Đã học xong', color: 'SECONDARY', animate: false };
};

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft('00:00:00'); return; }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{timeLeft}</span>;
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Box display="flex" gap="xs" alignItems="center">
    <Icon size="xs" color="SECONDARY">{icon}</Icon>
    <Text size="sm" color="SECONDARY">{text}</Text>
  </Box>
);

// --- Sub-component: Class Card ---
const ClassAttendanceCard = ({ data, onClick, isToday }: any) => {
  const sessionStatus = getSessionStatus(data.sessions);

  return (
    <Box 
      p="sm" 
      bg="BACKGROUND_PAPER" 
      border={`1px solid ${isToday ? COLORS.PRIMARY : COLORS.NEUTRAL_BORDER}`}
      borderRadius="md"
      onClick={onClick}
      css={css`
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: ${isToday ? SHADOWS.md : 'none'};
        &:hover {
          border-color: ${COLORS.PRIMARY};
          box-shadow: ${SHADOWS.lg};
          transform: translateY(-2px);
        }
      `}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start" mb="sm">
        <Box display="flex" gap="sm" alignItems="center">
          <Box p="xs" bg="PRIMARY_LIGHT" borderRadius="sm" color="PRIMARY" display="flex">
            <Icon size="sm"><BookOpen /></Icon>
          </Box>
          <Box>
            <Text weight="bold" size="md">{data.name}</Text>
            <Text size="xs" color="SECONDARY">{data.code}</Text>
          </Box>
        </Box>
        {isToday && <Badge color="success" size="sm">Hôm nay</Badge>}
      </Box>

      {/* Real-time Status Indicator (Only show if relevant/today) */}
      {sessionStatus && isToday && (
        <Box mb="md">
          <Box display="flex" alignItems="center" gap="xs" mb={sessionStatus.type === 'happening' ? 'xs' : '0'}>
             <Box 
               w="8px" h="8px" 
               borderRadius="full" 
               bg={sessionStatus.color as any}
               css={sessionStatus.animate ? pulseAnimation : undefined}
             />
             <Text size="xs" weight="bold" color={sessionStatus.color as any}>
               {sessionStatus.type === 'upcoming' && sessionStatus.targetDate ? (
                 <>Bắt đầu trong <CountdownTimer targetDate={sessionStatus.targetDate} /></>
               ) : (
                 sessionStatus.label
               )}
             </Text>
          </Box>

          {sessionStatus.type === 'happening' && sessionStatus.progress && (
            <Box>
              <Box w="100%" h="4px" bg="NEUTRAL_LIGHT" borderRadius="full" overflow="hidden">
                <Box h="100%" bg="DANGER" width={`${sessionStatus.progress.percent}%`} css={css`transition: width 1s ease-in-out;`} />
              </Box>
              <Text size="xs" color="SECONDARY">
                Còn {sessionStatus.progress.remainingMinutes} phút
              </Text>
            </Box>
          )}
        </Box>
      )}

      <Box display="flex" flexDirection="column" gap="xs" mb="md">
        <InfoRow icon={<Users />} text={`${data.currentStudents || 0} / ${data.maxStudents} Học viên`} />
        <InfoRow icon={<Clock />} text={data.schedule || 'Chưa có lịch'} />
        <InfoRow icon={<Building />} text={data.teacherName || 'Chưa phân công'} />
      </Box>

      <Box pt="sm" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="flex-end" alignItems="center">
        <Button 
          variant="ghost" 
          size="sm" 
          rightIcon={<Icon><ChevronRight /></Icon>}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Chi tiết
        </Button>
      </Box>
    </Box>
  );
};
