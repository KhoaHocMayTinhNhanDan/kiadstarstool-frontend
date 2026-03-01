/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { BarChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/BarChart';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';
import { useI18n } from '@/shared/i18n/useI18n';

interface DashboardChartsProps {
  pageData: any;
  timeRange: 'week' | 'month' | 'year';
  isLoading: boolean;
}

export const DashboardCharts = ({ pageData, timeRange, isLoading }: DashboardChartsProps) => {
  const { t } = useI18n();

  return (
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
      <Box css={css`background-color: ${COLORS.BACKGROUND_PAPER}; border: 1px solid ${COLORS.NEUTRAL_BORDER}; border-radius: ${RADIUS.md}; padding: ${SPACING.xl}; height: 400px; display: flex; flex-direction: column;`}>
        <Box mb="lg"><Text as="h3" size="lg" weight="bold">Doanh thu theo loại hình</Text></Box>
        <Box css={css`flex: 1; min-height: 0; width: 100%; overflow: hidden;`}>
          <PieChart data={pageData?.revenueByTypeData || []} height="100%" isLoading={isLoading} />
        </Box>
      </Box>
    </Box>
  );
};