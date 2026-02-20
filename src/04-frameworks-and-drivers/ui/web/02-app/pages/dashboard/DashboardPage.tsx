// src/04-frameworks-and-drivers/ui/web/pages/dashboard/DashboardPage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Building,
  Filter,
  Check,
  Calendar,
  Clock,
  ClipboardCheck
} from 'lucide-react';
import { Box, Text, Icon, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { StatsCard, StatsCardSkeleton } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/cards/StatsCard';
import { useAuth } from '@/04-frameworks-and-drivers/ui/web/02-app/hooks/user/useAuth';
import { useI18n } from '@/shared/i18n/useI18n';
import { AppContext } from '@/00-core/app-context';
import { BarChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/BarChart';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';
import { type StudentDTO } from '@/04-frameworks-and-drivers/devices/students/student.dto';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { type ListOngoingClassesOutput } from '@/02-usecases/class/ports/output/ListOngoingClasses.output';

// Định nghĩa kiểu dữ liệu cho một card thống kê để dễ quản lý
type StatData = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: 'success' | 'primary' | 'info' | 'warning';
  trend?: { value: number; label: string };
  description?: string;
  onClick?: () => void;
  className?: string;
};

// --- Helper Functions for Data Calculation (moved from Interactor) ---
const getStartDateForTimeRange = (timeRange: 'week' | 'month' | 'year'): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  switch (timeRange) {
    case 'week':
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust so Monday is the first day
      return new Date(now.setDate(diff));
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case 'year':
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date(now.getFullYear(), 0, 1);
  }
};

const getChartLabels = (timeRange: 'week' | 'month' | 'year'): string[] => {
    switch (timeRange) {
        case 'week':
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        case 'month':
            return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        case 'year':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
}

const groupRevenueByLabel = (
    enrollments: any[],
    timeRange: 'week' | 'month' | 'year'
): Array<{ name: string; value: number }> => {
    const labels = getChartLabels(timeRange);
    const dataMap = new Map<string, number>();
    labels.forEach(label => dataMap.set(label, 0));

    for (const enrollment of enrollments) {
        const date = new Date(enrollment.joinedDate);
        let key = '';

        switch (timeRange) {
            case 'year':
                key = labels[date.getMonth()];
                break;
            case 'month':
                const weekOfMonth = Math.ceil(date.getDate() / 7);
                key = `Week ${weekOfMonth > 4 ? 4 : weekOfMonth}`;
                break;
            case 'week':
                const dayOfWeek = date.getDay(); // Sun: 0, Mon: 1, ...
                key = labels[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
                break;
        }

        if (dataMap.has(key)) {
            dataMap.set(key, (dataMap.get(key) || 0) + (enrollment.tuitionAmount || 0));
        }
    }

    return Array.from(dataMap.entries()).map(([name, value]) => ({ name, value }));
};


export const DashboardPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();

  // --- States for raw data from different sources ---
  const [allStudents, setAllStudents] = useState<StudentDTO[]>([]);
  const [allBranches, setAllBranches] = useState<ListBranchesOutput>([]);
  const [ongoingClasses, setOngoingClasses] = useState<ListOngoingClassesOutput>([]);

  // --- Filter States ---
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]); // Empty array = All Branches
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('year');
  
  // --- UI States ---
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const studentController = AppContext.getStudentsController();
        const branchController = AppContext.getBranchController();
        const classController = AppContext.getClassesController();

        // Fetch all data in parallel
        const [studentResult, branchResult, ongoingClassResult] = await Promise.all([
          studentController.listStudentsByBranch({ branchId: '' }), // Assuming '' gets all
          branchController.listBranches({}),
          classController.listOngoingClasses()
        ]);

        if (studentResult.isSuccess) {
          // The interactor/repository layer is returning DTOs, which is not ideal but the UI can handle it.
          // The previous mapping logic was incorrect as it treated DTOs as Entities, causing a runtime error.
          // We now accept the DTOs directly into the state.
          setAllStudents(studentResult.getValue() as StudentDTO[]);
        } else {
          throw new Error(studentResult.getErrorValue() as string);
        }

        if (branchResult.isSuccess) {
          setAllBranches(branchResult.getValue());
        } else {
          throw new Error(branchResult.getErrorValue() as string);
        }

        if (ongoingClassResult.isSuccess) {
          setOngoingClasses(ongoingClassResult.getValue());
        } else {
          throw new Error(ongoingClassResult.getErrorValue() as string);
        }

      } catch (e: any) {
        setError(e.message || "Đã có lỗi không xác định xảy ra khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []); // Fetch only once on mount

  // --- Derived Data Calculation using useMemo ---
  const pageData = useMemo(() => {
    if (allStudents.length === 0 || allBranches.length === 0) {
      return null;
    }

    // --- Filter students and enrollments based on UI controls ---
    const startDate = getStartDateForTimeRange(timeRange);
    // Safeguard against malformed student data from localStorage.
    // 1. `s.enrollments || []`: Handles cases where a student has no `enrollments` array.
    // 2. `.filter(e => e)`: Handles cases where the `enrollments` array itself contains null/undefined entries.
    // This prevents the `enrollment.joinedDate` error.
    const allEnrollments = allStudents.flatMap(s => s.enrollments || []).filter(e => e);

    const filteredEnrollments = allEnrollments.filter(enrollment => {
      const enrollmentDate = new Date(enrollment.joinedDate);
      const isInBranch = selectedBranchIds.length === 0 || selectedBranchIds.includes(enrollment.branchId);
      const isInTimeRange = enrollmentDate >= startDate;
      return isInBranch && isInTimeRange;
    });

    // --- Calculate Stats ---
    const paidEnrollments = filteredEnrollments.filter(e => e.paymentStatus === 'paid');
    const totalRevenue = paidEnrollments.reduce((sum, e) => sum + (e.tuitionAmount || 0), 0);
    const totalSubs = filteredEnrollments.length;
    const totalSales = paidEnrollments.length;

    const activeStudentsCount = allStudents.filter(s => 
      s.status === 'active' &&
      (selectedBranchIds.length === 0 || s.enrollments.some(e => selectedBranchIds.includes(e.branchId) && e.status === 'active'))
    ).length;

    // --- NEW: Revenue by Type Calculation ---
    let courseRevenue = 0;
    let sessionRevenue = 0;
    for (const enrollment of paidEnrollments) {
        if (enrollment.prepaidSessions && enrollment.prepaidSessions > 0) {
            sessionRevenue += enrollment.tuitionAmount || 0;
        } else {
            courseRevenue += enrollment.tuitionAmount || 0;
        }
    }
    const revenueByTypeData = [
        { name: 'Theo Khóa', value: courseRevenue },
        { name: 'Theo Buổi', value: sessionRevenue },
    ];

    // --- Prepare Chart Data ---
    const revenueChartData = groupRevenueByLabel(paidEnrollments, timeRange);

    return {
      totalRevenue,
      totalSubs,
      totalSales,
      totalActive: activeStudentsCount,
      chartData: revenueChartData,
      revenueByTypeData,
      branches: allBranches,
      ongoingClasses: ongoingClasses.slice(0, 4) // Limit to 4
    };
  }, [allStudents, allBranches, ongoingClasses, selectedBranchIds, timeRange]);


  // --- Stats for UI Cards ---
  const stats: StatData[] = useMemo(() => {
    if (!pageData) return [];

    return [
    {
      title: t('dashboard.total_revenue'),
      value: `$${pageData.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <DollarSign />,
      accentColor: 'success' as const,
      trend: { value: 20.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.subscriptions'),
      value: `+${pageData.totalSubs.toLocaleString()}`,
      icon: <Users />,
      accentColor: 'primary' as const,
      trend: { value: 180.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.sales'),
      value: `+${pageData.totalSales.toLocaleString()}`,
      icon: <ShoppingCart />,
      accentColor: 'info' as const,
      trend: { value: 19, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.active_now'),
      value: `+${pageData.totalActive.toLocaleString()}`,
      icon: <Activity />,
      accentColor: 'warning' as const,
      description: t('dashboard.users_on_platform'),
    },
    {
      title: t('dashboard.branches'),
      value: pageData.branches.length.toString(),
      icon: <Building />,
      accentColor: 'info' as const,
      description: t('dashboard.manage_branches'),
      onClick: () => navigate('/branches'),
    },
    {
      title: 'Điểm danh',
      value: 'Truy cập',
      icon: <ClipboardCheck />,
      accentColor: 'primary' as const,
      description: 'Quản lý điểm danh',
      onClick: () => navigate('/attendance'),
    }];
  }, [pageData, t, navigate]);

  const toggleBranch = (branchId: string) => {
    setSelectedBranchIds(prev => {
      if (prev.includes(branchId)) {
        return prev.filter(id => id !== branchId);
      } else {
        return [...prev, branchId];
      }
    });
  };

  const welcomeMessage = user?.displayName ? t('common.welcome_back', { name: user.displayName }) : t('dashboard.title');


  return (
    <Box display="flex" flexDirection="column" gap="xl">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">{welcomeMessage}</Text>
          <Text color="SECONDARY">{t('dashboard.subtitle')}</Text>
        </Box>
      </Box>

      {/* Filters Section */}
      <Box display="flex" flexDirection="column" gap="md">
        {/* Branch Filter */}
        <Box display="flex" alignItems="center" gap="sm" mb="sm">
          <Icon size="sm" color="SECONDARY"><Filter /></Icon>
          <Text size="sm" weight="semibold" color="SECONDARY">{t('dashboard.filter_by_branch')}:</Text>
        </Box>
        <Box display="flex" gap="sm" flexWrap="wrap">
          {/* All Branches Button */}
          <Button 
            size="sm"
            variant={selectedBranchIds.length === 0 ? 'primary' : 'outline'}
            onClick={() => setSelectedBranchIds([])}
            leftIcon={selectedBranchIds.length === 0 ? <Icon><Check /></Icon> : undefined}
          >
            {t('dashboard.all_branches')}
          </Button>

          {/* Individual Branch Buttons */}
          {pageData?.branches.map((branch: any) => {
            const isSelected = selectedBranchIds.includes(branch.id);
            return (
              <Button
                key={branch.id}
                size="sm"
                variant={isSelected ? 'primary' : 'outline'}
                onClick={() => toggleBranch(branch.id)}
                leftIcon={isSelected ? <Icon><Check /></Icon> : undefined}
              >
                {branch.name}
              </Button>
            );
          })}
        </Box>

        {/* Time Range Filter */}
        <Box display="flex" alignItems="center" gap="sm" mt="xs">
          <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
          <Text size="sm" weight="semibold" color="SECONDARY">{t('dashboard.time_period')}:</Text>
          <Box display="flex" gap="xs" bg="NEUTRAL_LIGHT" p="xxs" borderRadius="md">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setTimeRange('week')}
              sx={{ 
                backgroundColor: timeRange === 'week' ? 'white' : undefined,
                boxShadow: timeRange === 'week' ? 'sm' : 'none' 
              }}
            >
              {t('dashboard.this_week')}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setTimeRange('month')}
              sx={{ 
                backgroundColor: timeRange === 'month' ? 'white' : undefined,
                boxShadow: timeRange === 'month' ? 'sm' : 'none' 
              }}
            >
              {t('dashboard.this_month')}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setTimeRange('year')}
              sx={{ 
                backgroundColor: timeRange === 'year' ? 'white' : undefined,
                boxShadow: timeRange === 'year' ? 'sm' : 'none' 
              }}
            >
              {t('dashboard.this_year')}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Error State */}
      {error && !isLoading && (
        <Box p="lg" bg="DANGER_LIGHT" radius="md" border="1px solid" borderColor="DANGER" display="flex" alignItems="center" gap="md">
          <Icon color="DANGER"><Activity /></Icon>
          <Box>
            <Text color="DANGER" weight="bold">{t('dashboard.error_loading_title')}</Text>
            <Text color="DANGER" size="sm">{error}</Text>
          </Box>
        </Box>
      )}

      {/* Stats Grid */}
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: ${SPACING.lg};
        `}
      >
        {(isLoading || !pageData)
          ? Array.from({ length: 6 }).map((_, index) => <StatsCardSkeleton key={index} />)
          : stats.map((stat) => (
              <div 
                key={stat.title} 
                onClick={stat.onClick} 
                style={{ cursor: stat.onClick ? 'pointer' : 'default' }}
                role={stat.onClick ? "button" : undefined}
              >
                <StatsCard {...stat} />
              </div>
            ))
        }
      </Box>

      {/* Charts Section: Revenue & Revenue by Type */}
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: ${SPACING.lg};
        `}
      >
        {/* Revenue Chart */}
        <Box 
          css={css`
            background-color: ${COLORS.BACKGROUND_PAPER};
            border: 1px solid ${COLORS.NEUTRAL_BORDER};
            border-radius: ${RADIUS.md};
            padding: ${SPACING.xl};
            height: 400px;
            display: flex;
            flex-direction: column;
          `}
        >
          <Box mb="lg">
            <Text as="h3" size="lg" weight="bold">
              {t('dashboard.revenue_chart_title')} 
              {timeRange === 'week' && ` ${t('dashboard.revenue_chart_subtitle_week')}`}
              {timeRange === 'month' && ` ${t('dashboard.revenue_chart_subtitle_month')}`}
              {timeRange === 'year' && ` ${t('dashboard.revenue_chart_subtitle_year')}`}
            </Text>
          </Box>
          
          <Box css={css`flex: 1; min-height: 0; width: 100%; overflow: hidden;`}>
            <BarChart 
              data={pageData?.chartData || []}
              xAxisKey="name"
              height="100%"
              series={[
                { key: 'value', name: t('dashboard.total_revenue'), color: COLORS.PRIMARY }
              ]}
            />
          </Box>
        </Box>
        
        {/* Revenue by Type Chart */}
        <Box 
          css={css`
            background-color: ${COLORS.BACKGROUND_PAPER};
            border: 1px solid ${COLORS.NEUTRAL_BORDER};
            border-radius: ${RADIUS.md};
            padding: ${SPACING.xl};
            height: 400px;
            display: flex;
            flex-direction: column;
          `}
        >
          <Box mb="lg">
            <Text as="h3" size="lg" weight="bold">Doanh thu theo loại hình</Text>
          </Box>
          
          <Box css={css`flex: 1; min-height: 0; width: 100%; overflow: hidden;`}>
            <PieChart 
              data={pageData?.revenueByTypeData || []}
              height="100%"
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>

      {/* Ongoing Classes Section - Entry point for Attendance */}
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
          <Text as="h3" size="lg" weight="bold">{t('dashboard.ongoing_classes')}</Text>
          <Button variant="ghost" size="sm" onClick={() => navigate('/classes')}>{t('common.view_all')}</Button>
        </Box>
        
        <Box 
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: ${SPACING.md};
          `}
        >
          {pageData?.ongoingClasses.map((cls: any) => (
            <Box 
              key={cls.id}
              p="md" 
              bg="BACKGROUND_PAPER"
              border="1px solid" 
              borderColor="NEUTRAL_BORDER" 
              borderRadius="md"
              onClick={() => navigate(`/classes/${cls.id}`)}
              css={css`
                cursor: pointer; 
                transition: all 0.2s;
                &:hover { 
                  border-color: ${COLORS.PRIMARY};
                  box-shadow: ${SHADOWS.md};
                }
              `}
            >
              <Box display="flex" justifyContent="space-between" mb="sm">
                <Text weight="bold" size="md">{cls.name}</Text>
                <Icon size="sm" color="SUCCESS"><Activity /></Icon>
              </Box>
              
              <Box display="flex" flexDirection="column" gap="xs" mb="md">
                <Box display="flex" gap="xs" alignItems="center">
                  <Icon size="xs" color="SECONDARY"><Users /></Icon>
                  <Text size="sm" color="SECONDARY">{cls.students} {t('dashboard.students_count')}</Text>
                </Box>
                <Box display="flex" gap="xs" alignItems="center">
                  <Icon size="xs" color="SECONDARY"><Clock /></Icon>
                  <Text size="sm" color="SECONDARY">{cls.time}</Text>
                </Box>
              </Box>

              <Button 
                size="sm" 
                variant="primary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/classes/${cls.id}`);
                }}
              >
                {t('dashboard.check_in_now')}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
