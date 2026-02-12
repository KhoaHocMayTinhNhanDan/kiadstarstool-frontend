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
  Plus
} from 'lucide-react';
import { Box, Text, Icon, Button } from '../../00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { StatsCard, StatsCardSkeleton } from '../../00-design-system/02-organisms/cards/StatsCard';
import { useAuth } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useAuth';
import { useI18n } from '@/shared/i18n/useI18n';

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
  const [stats, setStats] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockStats: StatData[] = [
    {
      title: t('dashboard.total_revenue'),
      value: "$45,231.89",
      icon: <DollarSign />,
      accentColor: 'success' as const,
      trend: { value: 20.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.subscriptions'),
      value: "+2350",
      icon: <Users />,
      accentColor: 'primary' as const,
      trend: { value: 180.1, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.sales'),
      value: "+12,234",
      icon: <ShoppingCart />,
      accentColor: 'info' as const,
      trend: { value: 19, label: t('dashboard.from_last_month') },
    },
    {
      title: t('dashboard.active_now'),
      value: "+573",
      icon: <Activity />,
      accentColor: 'warning' as const,
      description: t('dashboard.users_on_platform'),
    },
    {
      title: t('dashboard.branches'),
      value: "12", // Mock value
      icon: <Building />,
      accentColor: 'info' as const,
      description: t('dashboard.manage_branches'),
      onClick: () => navigate('/branches'),
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Giả lập lỗi có thể xảy ra
        if (Math.random() > 0.9) { // 10% khả năng lỗi
          throw new Error("Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.");
        }

        // Nếu thành công, gán dữ liệu mẫu
        setStats(mockStats);

      } catch (e: any) {
        setError(e.message || "Đã có lỗi không xác định xảy ra.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]); // Thêm t vào dependency để reload khi đổi ngôn ngữ

  const welcomeMessage = user?.displayName ? t('common.welcome_back', { name: user.displayName }) : t('dashboard.title');

  return (
    <Box display="flex" flexDirection="column" gap="xl">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">{welcomeMessage}</Text>
          <Text color="SECONDARY">{t('dashboard.subtitle')}</Text>
        </Box>
        <Button 
          leftIcon={<Icon><Plus /></Icon>} 
          onClick={() => navigate('/branches/new')}
          size="md"
        >
          Create Branch
        </Button>
      </Box>

      {/* Error State */}
      {error && !isLoading && (
        <Box p="lg" bg="DANGER_LIGHT" radius="md" border="1px solid" borderColor="DANGER" display="flex" alignItems="center" gap="md">
          <Icon color="DANGER"><Activity /></Icon>
          <Box>
            <Text color="DANGER" weight="bold">Tải dữ liệu thất bại</Text>
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

      {/* Recent Activity Section (Placeholder) */}
      <Box 
        css={css`
          background-color: ${COLORS.BACKGROUND_PAPER};
          border: 1px solid ${COLORS.NEUTRAL_BORDER};
          border-radius: ${RADIUS.md};
          padding: ${SPACING.xl};
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Box textAlign="center">
          <Text size="lg" weight="medium" color="SECONDARY">
            Chart & Recent Activity Area
          </Text>
          <Text size="sm" color="TEXT_MUTED">Coming soon...</Text>
        </Box>
      </Box>
    </Box>
  );
};
