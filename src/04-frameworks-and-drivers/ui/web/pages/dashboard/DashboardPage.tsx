// src/04-frameworks-and-drivers/ui/web/pages/dashboard/DashboardPage.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity 
} from 'lucide-react';
import { Box, Text } from '../../components/00-atoms';
import { COLORS, SPACING, RADIUS } from '../../components/00-atoms/00-core/tokens-constants';
import { StatsCard } from '../../components/02-organisms/cards/StatsCard';

export const DashboardPage = () => {
  // Dữ liệu mẫu (sau này có thể thay thế bằng API call)
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      trendValue: "+20.1%",
      trendLabel: "from last month",
      trend: "up" as const,
      icon: <DollarSign />
    },
    {
      title: "Subscriptions",
      value: "+2350",
      trendValue: "+180.1%",
      trendLabel: "from last month",
      trend: "up" as const,
      icon: <Users />
    },
    {
      title: "Sales",
      value: "+12,234",
      trendValue: "+19%",
      trendLabel: "from last month",
      trend: "up" as const,
      icon: <ShoppingCart />
    },
    {
      title: "Active Now",
      value: "+573",
      trendValue: "+201",
      trendLabel: "since last hour",
      trend: "up" as const,
      icon: <Activity />
    }
  ];

  return (
    <Box display="flex" flexDirection="column" gap="xl">
      {/* Header */}
      <Box>
        <Text variant="heading-xl" weight="bold">Dashboard</Text>
        <Text color="SECONDARY">Overview of your system performance.</Text>
      </Box>

      {/* Stats Grid */}
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: ${SPACING.lg};
        `}
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
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
