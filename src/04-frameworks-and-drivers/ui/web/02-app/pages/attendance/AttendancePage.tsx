// src/04-frameworks-and-drivers/ui/web/02-app/pages/attendance/AttendancePage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
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
import { COLORS, SPACING, SHADOWS, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
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
          classController.listClassesByBranch({ branchId: '' }), // Fetch all
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

  const handleQuickCheckin = (e: React.MouseEvent, cls: any) => {
    e.stopPropagation();
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
                display="grid" 
                gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
                gap="md"
              >
                {todayClasses.map(cls => (
                  <ClassAttendanceCard 
                    key={cls.id} 
                    data={cls} 
                    onClick={() => handleClassSelect(cls.id)}
                    onQuickCheckin={(e) => handleQuickCheckin(e, cls)}
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
                display="grid" 
                gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
                gap="md"
              >
                {filteredClasses.map(cls => (
                  <ClassAttendanceCard 
                    key={cls.id} 
                    data={cls} 
                    onClick={() => handleClassSelect(cls.id)}
                    onQuickCheckin={(e) => handleQuickCheckin(e, cls)}
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

// --- Sub-component: Class Card ---
const ClassAttendanceCard = ({ data, onClick, onQuickCheckin, isToday }: any) => {
  return (
    <Box 
      p="lg" 
      bg="BACKGROUND_PAPER" 
      border={`1px solid ${isToday ? COLORS.PRIMARY : COLORS.NEUTRAL_BORDER}`}
      borderRadius="md"
      onClick={onClick}
      css={css`
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: ${isToday ? SHADOWS.md : 'none'};
        &:hover {
          transform: translateY(-2px);
          box-shadow: ${SHADOWS.lg};
          border-color: ${COLORS.PRIMARY};
        }
      `}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start" mb="sm">
        <Box>
          <Text weight="bold" size="lg" mb="xs">{data.name}</Text>
          <Text size="sm" color="SECONDARY">{data.code}</Text>
        </Box>
        {isToday && <Badge color="success" size="sm">Hôm nay</Badge>}
      </Box>

      <Box display="flex" flexDirection="column" gap="xs" mb="lg">
        <Box display="flex" alignItems="center" gap="xs">
          <Icon size="xs" color="SECONDARY"><Users /></Icon>
          <Text size="sm" color="SECONDARY">{data.currentStudents} / {data.maxStudents} Học viên</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="xs">
          <Icon size="xs" color="SECONDARY"><Clock /></Icon>
          <Text size="sm" color="SECONDARY">{data.schedule}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="xs">
          <Icon size="xs" color="SECONDARY"><Building /></Icon>
          <Text size="sm" color="SECONDARY">{data.teacherName}</Text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" gap="sm" mt="auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onQuickCheckin}
          leftIcon={<Icon><CheckCircle /></Icon>}
        >
          Điểm danh nhanh
        </Button>
        <Button variant="ghost" size="sm"><Icon><ChevronRight /></Icon></Button>
      </Box>
    </Box>
  );
};
