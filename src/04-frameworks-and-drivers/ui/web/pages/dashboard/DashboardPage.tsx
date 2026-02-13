// src/04-frameworks-and-drivers/ui/web/pages/dashboard/DashboardPage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
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
  Calendar
} from 'lucide-react';
import { Box, Text, Icon, Button } from '../../00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { StatsCard, StatsCardSkeleton } from '../../00-design-system/02-organisms/cards/StatsCard';
import { useAuth } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useAuth';
import { useI18n } from '@/shared/i18n/useI18n';
import { AppContext } from '@/00-core/app-context';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { BarChart } from '../../00-design-system/02-organisms/charts/BarChart';

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

// Dữ liệu giả lập chi tiết cho từng chi nhánh để demo tính năng lọc
const MOCK_BRANCH_DATA: Record<string, { revenue: number, subs: number, sales: number, active: number }> = {
  'mock-branch-1': { revenue: 15231.89, subs: 850, sales: 4234, active: 200 }, // Center A
  'mock-branch-2': { revenue: 12000.00, subs: 600, sales: 3000, active: 150 }, // Center B
  'mock-branch-3': { revenue: 18000.00, subs: 900, sales: 5000, active: 223 }, // Hanoi
  'default': { revenue: 5000.00, subs: 100, sales: 1000, active: 50 } // Others
};

// Dữ liệu lịch sử doanh thu giả lập (6 tháng)
const MOCK_REVENUE_HISTORY: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
  ],
  'mock-branch-2': [
    { name: 'Jan', value: 2400 }, { name: 'Feb', value: 1398 }, { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 }, { name: 'May', value: 4800 }, { name: 'Jun', value: 3800 },
  ],
  'mock-branch-3': [
    { name: 'Jan', value: 1000 }, { name: 'Feb', value: 2000 }, { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 3000 }, { name: 'May', value: 2500 }, { name: 'Jun', value: 4000 },
  ],
  'default': [
    { name: 'Jan', value: 500 }, { name: 'Feb', value: 600 }, { name: 'Mar', value: 700 },
    { name: 'Apr', value: 800 }, { name: 'May', value: 900 }, { name: 'Jun', value: 1000 },
  ]
};

// Dữ liệu giả lập theo Tuần (Mon-Sun)
const MOCK_WEEKLY_DATA: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Mon', value: 500 }, { name: 'Tue', value: 600 }, { name: 'Wed', value: 450 },
    { name: 'Thu', value: 700 }, { name: 'Fri', value: 800 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 300 }
  ],
  'mock-branch-2': [
    { name: 'Mon', value: 300 }, { name: 'Tue', value: 400 }, { name: 'Wed', value: 350 },
    { name: 'Thu', value: 500 }, { name: 'Fri', value: 600 }, { name: 'Sat', value: 700 }, { name: 'Sun', value: 200 }
  ],
  'mock-branch-3': [
    { name: 'Mon', value: 200 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 250 },
    { name: 'Thu', value: 400 }, { name: 'Fri', value: 500 }, { name: 'Sat', value: 600 }, { name: 'Sun', value: 100 }
  ],
  'default': [
    { name: 'Mon', value: 100 }, { name: 'Tue', value: 150 }, { name: 'Wed', value: 120 },
    { name: 'Thu', value: 180 }, { name: 'Fri', value: 200 }, { name: 'Sat', value: 250 }, { name: 'Sun', value: 50 }
  ]
};

// Dữ liệu giả lập theo Tháng (Week 1-4)
const MOCK_MONTHLY_DATA: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Week 1', value: 3500 }, { name: 'Week 2', value: 4200 }, { name: 'Week 3', value: 3800 }, { name: 'Week 4', value: 4500 }
  ],
  'mock-branch-2': [
    { name: 'Week 1', value: 2500 }, { name: 'Week 2', value: 3200 }, { name: 'Week 3', value: 2800 }, { name: 'Week 4', value: 3500 }
  ],
  'mock-branch-3': [
    { name: 'Week 1', value: 1500 }, { name: 'Week 2', value: 2200 }, { name: 'Week 3', value: 1800 }, { name: 'Week 4', value: 2500 }
  ],
  'default': [
    { name: 'Week 1', value: 500 }, { name: 'Week 2', value: 600 }, { name: 'Week 3', value: 700 }, { name: 'Week 4', value: 800 }
  ]
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const DashboardPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<StatData[]>([]);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);
  const [branches, setBranches] = useState<ListBranchesOutput>([]);
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]); // Empty array = All Branches
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('year');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Fetch Branches
        const branchController = AppContext.getBranchController();
        const branchResult = await branchController.listBranches({});
        let fetchedBranches: ListBranchesOutput = [];
        
        if (branchResult.isSuccess) {
          fetchedBranches = branchResult.getValue();
          setBranches(fetchedBranches);
        }

        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Giả lập lỗi có thể xảy ra
        if (Math.random() > 0.98) { // Giảm tỷ lệ lỗi để test dễ hơn
          throw new Error("Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.");
        }

        // Logic tính toán số liệu dựa trên branches đã fetch (hoặc mock nếu chưa có logic backend)
        // Ở đây ta chỉ set loading false, việc tính toán stats sẽ nằm ở useEffect khác 
        // hoặc function render để phản ứng với selectedBranchIds

      } catch (e: any) {
        setError(e.message || "Đã có lỗi không xác định xảy ra.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]); // Thêm t vào dependency để reload khi đổi ngôn ngữ

  // Tính toán Stats mỗi khi selectedBranchIds hoặc branches thay đổi
  useEffect(() => {
    if (isLoading && branches.length === 0) return;

    // 1. Xác định danh sách branch cần tính toán
    const targetBranches = selectedBranchIds.length === 0 
      ? branches // Nếu không chọn gì -> Lấy hết (All)
      : branches.filter(b => selectedBranchIds.includes(b.id));

    // 2. Cộng dồn số liệu (Giả lập)
    // Lưu ý: totalRevenue sẽ được tính lại dựa trên Chart Data để khớp với biểu đồ
    let totalSubs = 0;
    let totalSales = 0;
    let totalActive = 0;

    if (targetBranches.length > 0) {
      targetBranches.forEach(b => {
        // Dữ liệu tĩnh cho các chỉ số khác (Subs, Sales, Active)
        // Trong thực tế, các chỉ số này cũng nên thay đổi theo timeRange
        const data = MOCK_BRANCH_DATA[b.id] || MOCK_BRANCH_DATA['default'];
        totalSubs += data.subs;
        totalSales += data.sales;
        totalActive += data.active;
      });
    } else {
      // Fallback nếu chưa load xong branches
      totalSubs = 2350;
      totalSales = 12234;
      totalActive = 573;
    }

    // 3. Xác định nguồn dữ liệu dựa trên Time Range
    let dataSource: Record<string, Array<{ name: string; value: number }>>;
    let labels: string[];

    if (timeRange === 'week') {
      dataSource = MOCK_WEEKLY_DATA;
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeRange === 'month') {
      dataSource = MOCK_MONTHLY_DATA;
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else {
      dataSource = MOCK_REVENUE_HISTORY; // Year (6 months)
      labels = MONTHS;
    }

    // 4. Tính toán dữ liệu biểu đồ (Cộng gộp)
    const newChartData = labels.map(label => {
      let totalValue = 0;
      const branchesToCalc = targetBranches.length > 0 ? targetBranches : []; // Nếu rỗng (chưa load) thì chart = 0
      
      branchesToCalc.forEach(b => {
        const history = dataSource[b.id] || dataSource['default'];
        const record = history.find(h => h.name === label);
        if (record) totalValue += record.value;
      });
      return { name: label, value: totalValue };
    });
    setChartData(newChartData);

    // 5. Tính tổng doanh thu từ dữ liệu biểu đồ hiện tại
    const totalRevenue = newChartData.reduce((acc, curr) => acc + curr.value, 0);

    const calculatedStats: StatData[] = [
      {
        title: t('dashboard.total_revenue'),
        value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        icon: <DollarSign />,
        accentColor: 'success' as const,
        trend: { value: 20.1, label: t('dashboard.from_last_month') },
      },
      {
        title: t('dashboard.subscriptions'),
        value: `+${totalSubs.toLocaleString()}`,
        icon: <Users />,
        accentColor: 'primary' as const,
        trend: { value: 180.1, label: t('dashboard.from_last_month') },
      },
      {
        title: t('dashboard.sales'),
        value: `+${totalSales.toLocaleString()}`,
        icon: <ShoppingCart />,
        accentColor: 'info' as const,
        trend: { value: 19, label: t('dashboard.from_last_month') },
      },
      {
        title: t('dashboard.active_now'),
        value: `+${totalActive.toLocaleString()}`,
        icon: <Activity />,
        accentColor: 'warning' as const,
        description: t('dashboard.users_on_platform'),
      },
      {
        title: t('dashboard.branches'),
        value: branches.length.toString(),
        icon: <Building />,
        accentColor: 'info' as const,
        description: t('dashboard.manage_branches'),
        onClick: () => navigate('/branches'),
      }
    ];

    setStats(calculatedStats);
  }, [selectedBranchIds, branches, t, isLoading, timeRange]);

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

      {/* Revenue Chart Section */}
      <Box 
        css={css`
          background-color: ${COLORS.BACKGROUND_PAPER};
          border: 1px solid ${COLORS.NEUTRAL_BORDER};
          border-radius: ${RADIUS.md};
          padding: ${SPACING.xl};
          height: 400px;
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
        
        <Box height="90%" width="100%">
          <BarChart 
            data={chartData}
            xAxisKey="name"
            series={[
              { key: 'value', name: t('dashboard.total_revenue'), color: COLORS.PRIMARY }
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};
