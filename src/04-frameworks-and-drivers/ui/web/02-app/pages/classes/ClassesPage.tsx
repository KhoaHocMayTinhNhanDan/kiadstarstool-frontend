/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { 
  Plus, 
  Filter, 
  BookOpen, 
  Users, 
  Clock, 
  Building
} from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/03-ui-shared/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { type ListClassesByBranchOutputItem } from '@/02-usecases/class/ports/output/ListClassesByBranch.output';
import { type BranchListItem } from '@/02-usecases/branch/ports/output/ListBranches.output';

// Định nghĩa một View Model cho card lớp học để bao gồm cả tên chi nhánh
interface ClassCardViewModel extends ListClassesByBranchOutputItem {
  branchName: string;
}

export const ClassesPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassCardViewModel[]>([]);
  const [branches, setBranches] = useState<BranchListItem[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Fetch data for branches and classes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const branchController = AppContext.getBranchController();
        const classController = AppContext.getClassesController();

        // Fetch in parallel
        const [branchResult, classResult] = await Promise.all([
          branchController.listBranches({}),
          classController.listClassesByBranch(selectedBranchId)
        ]);

        let branchesData: BranchListItem[] = [];
        if (branchResult.isSuccess) {
          branchesData = branchResult.getValue();
          setBranches(branchesData);
        } else {
          console.error('Failed to fetch branches:', branchResult.getErrorValue());
        }

        if (classResult.isSuccess) {
          const classData = classResult.getValue();
          // Create a map for efficient branch name lookup
          const branchMap = new Map(branchesData.map(b => [b.id, b.name]));

          const mappedData: ClassCardViewModel[] = classData.map(c => ({
            ...c,
            branchName: branchMap.get(c.branchId) || 'Unknown Branch'
          }));
          setClasses(mappedData);
        } else {
          console.error('Error fetching classes:', classResult.getErrorValue());
          setClasses([]);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBranchId]);

  // Client-side filtering
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    (c.teacherName && c.teacherName.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Danh sách lớp học</Text>
          <Text color="SECONDARY">Quản lý các lớp học và lịch giảng dạy.</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Plus /></Icon>}
          onClick={() => navigate('/classes/new')}
        >
          Tạo lớp mới
        </Button>
      </Box>

      {/* Filters Bar */}
      <Box 
        display="flex" 
        gap="md" 
        alignItems="center" 
        flexWrap="wrap"
        p="md"
        bg="BACKGROUND_PAPER"
        borderRadius="md"
        border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      >
        <Box flex="1" minWidth="200px">
          <Input 
            placeholder="Tìm kiếm lớp học..." 
            value={searchKeyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
          />
        </Box>
        
        <Box display="flex" gap="sm" alignItems="center">
          <Icon color="SECONDARY" size="sm"><Filter /></Icon>
          <Text size="sm" weight="medium">Chi nhánh:</Text>
          <select 
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            style={{
              padding: SPACING.sm,
              borderRadius: RADIUS.sm,
              border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
              outline: 'none',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            <option value="">Tất cả chi nhánh</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </Box>
      </Box>

      {/* Grid List */}
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: ${SPACING.md};
        `}
      >
        {filteredClasses.map(cls => (
          <ClassCard key={cls.id} data={cls} onClick={() => navigate(`/classes/${cls.id}`)} />
        ))}
        
        {!isLoading && filteredClasses.length === 0 && (
          <Box gridColumn="1/-1" p="xl" display="flex" justifyContent="center">
            <Text color="SECONDARY">Không tìm thấy lớp học nào phù hợp.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Helper Component: Class Card
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return { label: 'Đang mở', color: 'SUCCESS', bg: 'SUCCESS_LIGHT' };
    case 'completed':
      return { label: 'Đã kết thúc', color: 'TEXT_SECONDARY', bg: 'NEUTRAL_LIGHT' };
    case 'planned':
      return { label: 'Sắp mở', color: 'INFO', bg: 'INFO_LIGHT' };
    default:
      return { label: status, color: 'SECONDARY', bg: 'NEUTRAL_LIGHT' };
  }
};

// Helper Component: Countdown Timer
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

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

// Helper: Tính toán % tiến độ và thời gian còn lại
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

// Helper: Tính toán trạng thái buổi học theo thời gian thực
const getSessionStatus = (sessions: any[]) => {
  if (!sessions || sessions.length === 0) return null;

  const now = new Date();
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayMap[now.getDay()];
  
  // Lọc các buổi học trong ngày hôm nay
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

  // 2. Sắp diễn ra hôm nay
  const upcomingSession = todaySessions.find((s: any) => s.startTime > currentTime);
  if (upcomingSession) {
    const [h, m] = upcomingSession.startTime.split(':').map(Number);
    const start = new Date(); 
    start.setHours(h, m, 0, 0);
    
    // Trả về targetDate để component CountdownTimer xử lý hiển thị
    return { type: 'upcoming', targetDate: start, color: 'WARNING', animate: false };
  }

  // 3. Đã học xong hôm nay
  return { type: 'finished', label: 'Đã học xong hôm nay', color: 'SECONDARY', animate: false };
};

const pulseAnimation = css`animation: pulse 1.5s infinite; @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }`;

const ClassCard = ({ data, onClick }: { data: ClassCardViewModel, onClick: () => void }) => {
  const statusConfig = getStatusConfig(data.status);
  // Chỉ tính trạng thái buổi học nếu lớp đang Active
  const sessionStatus = data.status === 'active' ? getSessionStatus(data.sessions) : null;

  return (
    <Box 
      p="md" 
      bg="BACKGROUND_PAPER"
      border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      borderRadius="md"
      onClick={onClick}
      css={css`
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          border-color: ${COLORS.PRIMARY};
          box-shadow: ${SHADOWS.md};
          transform: translateY(-2px);
        }
      `}
    >
      <Box display="flex" justifyContent="space-between" mb="sm">
        <Box display="flex" gap="sm" alignItems="center">
          <Box p="xs" bg="PRIMARY_LIGHT" borderRadius="sm" color="PRIMARY" display="flex">
            <Icon size="sm"><BookOpen /></Icon>
          </Box>
          <Text weight="bold" size="md">{data.name}</Text>
        </Box>
        <Box px="sm" py="xxs" borderRadius="full" bg={statusConfig.bg as any}>
          <Text size="xs" weight="bold" color={statusConfig.color as any}>{statusConfig.label}</Text>
        </Box>
      </Box>

      {/* Real-time Session Status Indicator */}
      {sessionStatus && (
        <Box mb="md">
          {/* Status Label */}
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

          {/* Progress Bar for Happening Classes */}
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
        <InfoRow icon={<Users />} text={`${data.currentStudents || 0} Học viên`} />
        <InfoRow icon={<Clock />} text={data.schedule || 'Chưa có lịch'} />
        <InfoRow icon={<Building />} text={data.branchName} />
      </Box>

      <Box pt="sm" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="space-between" alignItems="center">
        <Text size="sm" color="SECONDARY">GV: {data.teacherName || 'Chưa phân công'}</Text>
        <Button 
          size="sm" 
          variant="ghost"
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

const InfoRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Box display="flex" gap="xs" alignItems="center">
    <Icon size="xs" color="SECONDARY">{icon}</Icon>
    <Text size="sm" color="SECONDARY">{text}</Text>
  </Box>
);