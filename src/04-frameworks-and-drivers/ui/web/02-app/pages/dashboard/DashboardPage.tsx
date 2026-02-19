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
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { BarChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/BarChart';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';

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

export const DashboardPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<{
    totalRevenue: number;
    totalSubs: number;
    totalSales: number;
    totalActive: number;
  } | null>(null);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);
  const [branches, setBranches] = useState<ListBranchesOutput>([]);
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]); // Empty array = All Branches
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('year');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ongoingClasses, setOngoingClasses] = useState<Array<{ id: string; name: string; students: number; time: string }>>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      // Chỉ fetch branches 1 lần khi mount
      if (branches.length > 0) return;
      
      setIsLoading(true);
      try {
        const branchController = AppContext.getBranchController();
        const branchResult = await branchController.listBranches({});
        
        if (branchResult.isSuccess) {
          setBranches(branchResult.getValue());
        }
      } catch (e: any) {
        console.error("Failed to fetch branches", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Fetch Stats mỗi khi filter thay đổi
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dashboardController = AppContext.getDashboardController();
        const result = await dashboardController.getStats({
          timeRange,
          branchIds: selectedBranchIds.length > 0 ? selectedBranchIds : undefined
        });

        if (result.isSuccess) {
          const data = result.getValue();
          setChartData(data.chartData);
          setDashboardStats({
            totalRevenue: data.totalRevenue,
            totalSubs: data.totalSubs,
            totalSales: data.totalSales,
            totalActive: data.totalActive
          });
        } else {
          setError(result.getErrorValue() as string);
        }
      } catch (e: any) {
        setError(e.message || "Đã có lỗi không xác định xảy ra.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [selectedBranchIds, timeRange]); // Chỉ gọi lại API khi filter thay đổi, không phụ thuộc vào 't' hay 'branches'

  // Fetch Ongoing Classes (Lớp học đang diễn ra)
  useEffect(() => {
    const fetchOngoingClasses = async () => {
      try {
        const controller = AppContext.getClassesController();
        // Lấy tất cả lớp đang diễn ra (Active + Có lịch hôm nay) bằng Use Case chuyên dụng
        const result = await controller.listOngoingClasses(); 
        
        if (result.isSuccess) {
          const classes = result.getValue();
          const mappedClasses = classes
            .slice(0, 4) // Lấy 4 lớp đầu tiên
            .map((c: any) => ({ id: c.id, name: c.name, students: c.currentStudents, time: c.schedule }));
          setOngoingClasses(mappedClasses);
        }
      } catch (e) {
        console.error("Failed to fetch ongoing classes", e);
      }
    };
    fetchOngoingClasses();
  }, []);

  // Tính toán dữ liệu hiển thị (Derived State) - Tự động cập nhật khi dashboardStats hoặc t thay đổi
  const stats: StatData[] = [
    ...(dashboardStats ? [{
      title: t('dashboard.total_revenue'),
      value: `$${dashboardStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <DollarSign />,
      accentColor: 'success' as const,
      trend: { value: 20.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.subscriptions'),
      value: `+${dashboardStats.totalSubs.toLocaleString()}`,
      icon: <Users />,
      accentColor: 'primary' as const,
      trend: { value: 180.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.sales'),
      value: `+${dashboardStats.totalSales.toLocaleString()}`,
      icon: <ShoppingCart />,
      accentColor: 'info' as const,
      trend: { value: 19, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.active_now'),
      value: `+${dashboardStats.totalActive.toLocaleString()}`,
      icon: <Activity />,
      accentColor: 'warning' as const,
      description: t('dashboard.users_on_platform'),
    }] : []),
    {
      title: t('dashboard.branches'),
      value: branches.length.toString(),
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
    }
  ];

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

  // Mock data cho PieChart (Tỷ lệ học viên theo chi nhánh)
  // Sử dụng useMemo để tránh random lại dữ liệu mỗi khi component re-render
  const studentDistributionData = useMemo(() => branches.map((branch: any) => ({
    name: branch.name,
    value: branch.studentCount || 0, // Lấy dữ liệu thật từ Branch Entity/DTO
  })), [branches]);

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
          {branches.map(branch => {
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
        {isLoading 
          ? Array.from({ length: 4 }).map((_, index) => <StatsCardSkeleton key={index} />)
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

      {/* Charts Section: Revenue & Student Distribution */}
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
              data={chartData}
              xAxisKey="name"
              height="100%"
              series={[
                { key: 'value', name: t('dashboard.total_revenue'), color: COLORS.PRIMARY }
              ]}
            />
          </Box>
        </Box>
        
        {/* Student Distribution Chart */}
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
            <Text as="h3" size="lg" weight="bold">{t('dashboard.student_distribution')}</Text>
          </Box>
          
          <Box css={css`flex: 1; min-height: 0; width: 100%; overflow: hidden;`}>
            <PieChart 
              data={studentDistributionData}
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
          {ongoingClasses.map(cls => (
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
