// src/04-frameworks-and-drivers/ui/web/components/organisms/charts/GaugeChart/GaugeChart.organism.tsx
/** @jsxImportSource @emotion/react */
import { useId, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Text, LoadingSpinner } from '../../../atoms';
import { COLORS } from '../../../atoms/00-core/tokens-constants';
import { GAUGE_SIZE_CONFIG } from './GaugeChart.size';
import type { GaugeChartProps, GaugeSegment } from './GaugeChart.types';
import * as styles from './GaugeChart.organism.styles';

/* ========================================================================== */
/* Helpers */
/* ========================================================================== */

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const normalizeSegments = (segments: GaugeSegment[]) => {
  const total = segments.reduce((s, i) => s + Math.max(i.percent, 0), 0) || 1;
  return segments.map((s) => ({
    ...s,
    value: (s.percent / total) * 100,
  }));
};

/* ========================================================================== */
/* Component */
/* ========================================================================== */

export const GaugeChart = ({
  value,
  min = 0,
  max = 100,
  segments = [
    { percent: 20, color: COLORS.SUCCESS },
    { percent: 20, color: COLORS.INFO },
    { percent: 20, color: COLORS.WARNING },
    { percent: 20, color: COLORS.DANGER },
    { percent: 20, color: COLORS.NEUTRAL_DARK },
  ],
  units = '',
  label,
  size = 'md',
  width: customWidth,
  height: customHeight,
  isLoading = false,
  showMinMax = false,
}: GaugeChartProps) => {
  const chartId = useId().replace(/:/g, '');
  const sizeCfg = GAUGE_SIZE_CONFIG[size];

  const height = customHeight ?? sizeCfg.height;
  const width = customWidth ?? '100%';

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

  /* ================= Logic ================= */
  const safeValue = clamp(value, min, max);
  const range = max - min || 1;
  const percent = (safeValue - min) / range;

  const rotationDeg = useMemo(
    () => -90 + percent * 180,
    [percent]
  );

  const pieData = useMemo(
    () => normalizeSegments(segments),
    [segments]
  );

  /* ================= Render ================= */
  return (
    <Box
      w={width}
      css={styles.container}
      role="img"
      aria-label={`Gauge value ${safeValue}${units}`}
    >
      <div css={styles.chartWrapper} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {segments.map(
                (s, i) =>
                  s.gradient && (
                    <linearGradient
                      key={i}
                      id={`gradient-${chartId}-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor={s.gradient.start} />
                      <stop offset="100%" stopColor={s.gradient.end} />
                    </linearGradient>
                  )
              )}
            </defs>

            <Pie
              data={pieData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="75%"
              innerRadius="75%"
              outerRadius="110%"
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-out"
            >
              {pieData.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    segments[i]?.gradient
                      ? `url(#gradient-${chartId}-${i})`
                      : segments[i]?.color ?? COLORS.NEUTRAL
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* ===== NEEDLE ===== */}
        <div
          css={styles.needle(
            rotationDeg,
            COLORS.NEUTRAL_DARK,
            '75%',
            sizeCfg.needle.length,
            sizeCfg.needle.width,
            sizeCfg.needle.knob
          )}
        />

        {/* ===== VALUE ===== */}
        <div css={styles.valueLabel(sizeCfg.value.offset)}>
          <Text size={sizeCfg.value.size} weight="bold">
            {safeValue}
            {units}
          </Text>
          {label && (
            <Text size={sizeCfg.labelSize} color="SECONDARY">
              {label}
            </Text>
          )}
        </div>

        {/* ===== MIN / MAX ===== */}
        {showMinMax && (
          <>
            <div css={styles.minLabel}>
              <Text size={sizeCfg.minMaxSize} color="SECONDARY">
                {min}
              </Text>
            </div>
            <div css={styles.maxLabel}>
              <Text size={sizeCfg.minMaxSize} color="SECONDARY">
                {max}
              </Text>
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

GaugeChart.displayName = 'GaugeChart';
export default GaugeChart;
