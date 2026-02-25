/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Building,
  ClipboardCheck
} from 'lucide-react';
import { Box } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { StatCard, StatCardSkeleton } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/cards/StatCard';
import { useI18n } from '@/shared/i18n/useI18n';

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

interface DashboardStatsGridProps {
  pageData: any;
  isLoading: boolean;
}

export const DashboardStatsGrid = ({ pageData, isLoading }: DashboardStatsGridProps) => {
  const { t } = useI18n();
  const navigate = useNavigate();

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
      }
    ];
  }, [pageData, t, navigate]);

  return (
    <Box 
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: ${SPACING.lg};
      `}
    >
      {(isLoading || !pageData)
        ? Array.from({ length: 6 }).map((_, index) => <StatCardSkeleton key={index} />)
        : stats.map((stat) => (
            <div 
              key={stat.title} 
              onClick={stat.onClick} 
              style={{ cursor: stat.onClick ? 'pointer' : 'default' }}
              role={stat.onClick ? "button" : undefined}
            >
              <StatCard {...stat} />
            </div>
          ))
      }
    </Box>
  );
};