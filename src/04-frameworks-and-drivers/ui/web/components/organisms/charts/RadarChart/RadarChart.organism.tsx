// src/04-frameworks-and-drivers/ui/web/components/organisms/charts/RadarChart/RadarChart.organism.tsx
/** @jsxImportSource @emotion/react */
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import { Box, Text, LoadingSpinner } from '../../../atoms';
import { COLORS } from '../../../atoms/00-core/tokens-constants';
import * as styles from './RadarChart.organism.styles';

/* ==========================================================================
 * Types
 * ========================================================================== */

export interface RadarSeries {
  key: string;
  name: string;
  color?: string;
  fillOpacity?: number;
}

export interface RadarChartProps {
  data: Record<string, number | string>[];
  angleKey: string;
  series: RadarSeries[];

  width?: string;
  height?: number;

  isLoading?: boolean;
  emptyMessage?: string;

  showLegend?: boolean;
  showGrid?: boolean;
  showAxis?: boolean;
}

/* ==========================================================================
 * Tooltip
 * ========================================================================== */

const CustomTooltip = ({ active, label, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div css={styles.tooltip}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>
        {label}
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {payload.map((item: any, index: number) => (
          <div key={index} css={styles.tooltipItem}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: item.color || COLORS.PRIMARY,
              }}
            />
            <Text size="sm">
              {item.name}: <strong>{item.value}</strong>
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
 * Component
 * ========================================================================== */

export const RadarChart = ({
  data,
  angleKey,
  series,

  width = '100%',
  height = 360,

  isLoading = false,
  emptyMessage = 'Không có dữ liệu',

  showLegend = true,
  showGrid = true,
  showAxis = true,
}: RadarChartProps) => {
  /* ================= Loading ================= */
  if (isLoading) {
    return (
      <Box
        w={width}
        h={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingSpinner size="lg" />
      </Box>
    );
  }

  /* ================= Empty ================= */
  if (!data || data.length === 0) {
    return (
      <Box
        w={width}
        h={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="LIGHT"
        radius="md"
      >
        <Text color="SECONDARY">{emptyMessage}</Text>
      </Box>
    );
  }

  /* ================= Chart ================= */
  return (
    <Box w={width}>
      <div
        css={styles.chartContainer}
        style={{
          width: '100%',
          height: `${height}px`,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
          >
            {showGrid && (
              <PolarGrid stroke={COLORS.NEUTRAL_LIGHT} />
            )}

            {showAxis && (
              <PolarAngleAxis
                dataKey={angleKey}
                tick={{
                  fill: COLORS.SECONDARY,
                  fontSize: 12,
                }}
              />
            )}

            <PolarRadiusAxis tick={false} axisLine={false} />

            {series.map((s) => (
              <Radar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                stroke={s.color || COLORS.PRIMARY}
                fill={s.color || COLORS.PRIMARY}
                fillOpacity={s.fillOpacity ?? 0.6}
              />
            ))}

            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

RadarChart.displayName = 'RadarChart';
export default RadarChart;
